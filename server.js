'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;
const SESSION_COOKIE = 'smokweed_admin';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_ATTEMPT_LIMIT = 8;
const MAX_BODY_BYTES = 16 * 1024;
const ALLOWED_FILES = new Set([
  'index.html',
  'admin.html',
  'links.html',
  'styles.css',
  'script.js',
  'age-gate.js',
  '5929041987099103049.jpg',
  'favicon.svg',
  'robots.txt'
]);
const sessions = new Map();
const loginAttempts = new Map();
let settings;

const adminPassword = process.env.ADMIN_PASSWORD;
if (!adminPassword || adminPassword.length < 16) {
  console.error('Set ADMIN_PASSWORD to a unique value of at least 16 characters before starting the server.');
  process.exit(1);
}

const supabaseUrlValue = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrlValue || !supabaseServiceRoleKey) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY as private server environment variables.');
  process.exit(1);
}

let supabaseUrl;
try {
  supabaseUrl = new URL(supabaseUrlValue);
  if (supabaseUrl.protocol !== 'https:' || supabaseUrl.username || supabaseUrl.password) {
    throw new Error('SUPABASE_URL must be a public HTTPS project URL.');
  }
} catch (error) {
  console.error('SUPABASE_URL is invalid.', error);
  process.exit(1);
}

const passwordDigest = (value) => crypto.createHash('sha256').update(value).digest();
const expectedPasswordDigest = passwordDigest(adminPassword);

const jsonResponse = (res, statusCode, payload, extraHeaders = {}) => {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    ...extraHeaders
  });
  res.end(body);
};

const getCookie = (req, name) => {
  const cookieHeader = req.headers.cookie || '';
  for (const part of cookieHeader.split(';')) {
    const separator = part.indexOf('=');
    if (separator < 0) continue;
    if (part.slice(0, separator).trim() === name) {
      return part.slice(separator + 1).trim();
    }
  }
  return '';
};

const getSession = (req) => {
  const token = getCookie(req, SESSION_COOKIE);
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }
  session.expiresAt = Date.now() + SESSION_TTL_MS;
  return { token, session };
};

const cookieOptions = (req, maxAge) => {
  const secure = req.headers['x-forwarded-proto'] === 'https' || Boolean(req.socket.encrypted);
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
};

const sessionCookie = (req, token) => {
  const secure = req.headers['x-forwarded-proto'] === 'https' || Boolean(req.socket.encrypted);
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}${secure ? '; Secure' : ''}`;
};

const hasSameOrigin = (req) => {
  const origin = req.headers.origin;
  if (!origin || !req.headers.host) return false;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
};

const readJsonBody = async (req) => {
  if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) {
    const error = new Error('Content-Type must be application/json.');
    error.statusCode = 415;
    throw error;
  }
  const chunks = [];
  let totalBytes = 0;
  for await (const chunk of req) {
    totalBytes += chunk.length;
    if (totalBytes > MAX_BODY_BYTES) {
      const error = new Error('Request body too large.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    const error = new Error('Invalid JSON request body.');
    error.statusCode = 400;
    throw error;
  }
};

const validateLink = (value, allowedHosts, required) => {
  if (typeof value !== 'string') return null;
  const link = value.trim();
  if (!link && !required) return '';
  if (!link || link.length > 2048) return null;
  try {
    const url = new URL(link);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    if (!allowedHosts.has(url.hostname.toLowerCase())) return null;
    return url.href;
  } catch {
    return null;
  }
};

const supabaseRequest = async (search, options = {}) => {
  const endpoint = new URL(`/rest/v1/site_settings${search}`, supabaseUrl);
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers
    },
    signal: AbortSignal.timeout(10000)
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${details.slice(0, 500)}`);
  }
  if (response.status === 204) return null;
  const responseText = await response.text();
  return responseText ? JSON.parse(responseText) : null;
};

const validateStoredSettings = (row) => {
  const telegramLink = validateLink(row.telegram_link, new Set(['t.me', 'telegram.me']), true);
  const whatsappLink = validateLink(row.whatsapp_link, new Set(['wa.me', 'api.whatsapp.com', 'chat.whatsapp.com']), false);
  if (telegramLink === null || whatsappLink === null) {
    throw new Error('Saved contact links in Supabase are invalid.');
  }
  return { telegramLink, whatsappLink };
};

const loadSettings = async () => {
  const query = new URLSearchParams({
    id: 'eq.main',
    select: 'telegram_link,whatsapp_link'
  });
  const rows = await supabaseRequest(`?${query.toString()}`);
  if (Array.isArray(rows) && rows.length > 0) {
    return validateStoredSettings(rows[0]);
  }

  const initialSettings = {
    telegramLink: validateLink(process.env.TELEGRAM_LINK || 'https://t.me/+RD5taYiIM3M2YmU5', new Set(['t.me', 'telegram.me']), true),
    whatsappLink: validateLink(process.env.WHATSAPP_LINK || '', new Set(['wa.me', 'api.whatsapp.com', 'chat.whatsapp.com']), false)
  };
  if (initialSettings.telegramLink === null || initialSettings.whatsappLink === null) {
    throw new Error('TELEGRAM_LINK or WHATSAPP_LINK is invalid. Use an allowed public HTTPS URL.');
  }
  await saveSettings(initialSettings);
  return initialSettings;
};

const saveSettings = async (nextSettings) => {
  await supabaseRequest('?on_conflict=id', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({
      id: 'main',
      telegram_link: nextSettings.telegramLink,
      whatsapp_link: nextSettings.whatsappLink,
      updated_at: new Date().toISOString()
    })
  });
};

const isRateLimited = (key) => {
  const now = Date.now();
  const attempt = loginAttempts.get(key);
  if (!attempt || now - attempt.startedAt >= LOGIN_WINDOW_MS) {
    loginAttempts.set(key, { startedAt: now, count: 0 });
    return false;
  }
  return attempt.count >= LOGIN_ATTEMPT_LIMIT;
};

const recordFailedLogin = (key) => {
  const now = Date.now();
  const attempt = loginAttempts.get(key);
  if (!attempt || now - attempt.startedAt >= LOGIN_WINDOW_MS) {
    loginAttempts.set(key, { startedAt: now, count: 1 });
  } else {
    attempt.count += 1;
  }
};

const clearLoginAttempts = (key) => loginAttempts.delete(key);

const serveFile = async (req, res, pathname) => {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    jsonResponse(res, 400, { error: 'Invalid path.' });
    return;
  }
  const requestedName = decodedPath === '/' ? 'index.html' : decodedPath.replace(/^\/+/, '');
  if (!ALLOWED_FILES.has(requestedName)) {
    jsonResponse(res, 404, { error: 'Not found.' });
    return;
  }
  const filePath = path.resolve(ROOT, requestedName);
  if (!filePath.startsWith(`${ROOT}${path.sep}`)) {
    jsonResponse(res, 404, { error: 'Not found.' });
    return;
  }
  try {
    const content = await fs.readFile(filePath);
    const extension = path.extname(filePath);
    const contentType = extension === '.html' ? 'text/html; charset=utf-8'
      : extension === '.css' ? 'text/css; charset=utf-8'
        : extension === '.js' ? 'text/javascript; charset=utf-8'
          : extension === '.jpg' ? 'image/jpeg'
            : extension === '.svg' ? 'image/svg+xml'
          : 'text/plain; charset=utf-8';
    res.writeHead(200, {
      'Cache-Control': 'no-cache',
      'Content-Type': contentType,
      'Content-Length': content.length
    });
    if (req.method === 'HEAD') res.end();
    else res.end(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      jsonResponse(res, 404, { error: 'Not found.' });
      return;
    }
    throw error;
  }
};

const handleRequest = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  if (pathname === '/api/config' && req.method === 'GET') {
    jsonResponse(res, 200, settings);
    return;
  }

  if (pathname === '/site-config.js' && req.method === 'GET') {
    const body = `window.SITE_CONFIG = ${JSON.stringify(settings).replace(/</g, '\\u003c')};\n`;
    res.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': 'text/javascript; charset=utf-8',
      'Content-Length': Buffer.byteLength(body)
    });
    res.end(body);
    return;
  }

  if (pathname === '/api/admin/session' && req.method === 'GET') {
    const session = getSession(req);
    jsonResponse(res, 200, session ? { authenticated: true, ...settings } : { authenticated: false });
    return;
  }

  if (pathname === '/api/admin/login' && req.method === 'POST') {
    if (!hasSameOrigin(req)) {
      jsonResponse(res, 403, { error: 'Invalid request origin.' });
      return;
    }
    const key = req.socket.remoteAddress || 'unknown';
    if (isRateLimited(key)) {
      jsonResponse(res, 429, { error: 'Too many sign-in attempts.' });
      return;
    }
    const body = await readJsonBody(req);
    const submittedDigest = passwordDigest(typeof body.password === 'string' ? body.password : '');
    if (!crypto.timingSafeEqual(submittedDigest, expectedPasswordDigest)) {
      recordFailedLogin(key);
      jsonResponse(res, 401, { error: 'Invalid credentials.' });
      return;
    }
    clearLoginAttempts(key);
    const token = crypto.randomBytes(32).toString('base64url');
    sessions.set(token, { expiresAt: Date.now() + SESSION_TTL_MS });
    jsonResponse(res, 200, { authenticated: true, ...settings }, { 'Set-Cookie': sessionCookie(req, token) });
    return;
  }

  if (pathname === '/api/admin/logout' && req.method === 'POST') {
    if (!hasSameOrigin(req)) {
      jsonResponse(res, 403, { error: 'Invalid request origin.' });
      return;
    }
    const session = getSession(req);
    if (session) sessions.delete(session.token);
    jsonResponse(res, 200, { authenticated: false }, { 'Set-Cookie': cookieOptions(req, 0) });
    return;
  }

  if (pathname === '/api/admin/settings' && req.method === 'PUT') {
    if (!hasSameOrigin(req)) {
      jsonResponse(res, 403, { error: 'Invalid request origin.' });
      return;
    }
    if (!getSession(req)) {
      jsonResponse(res, 401, { error: 'Authentication required.' });
      return;
    }
    const body = await readJsonBody(req);
    const telegramLink = validateLink(body.telegramLink, new Set(['t.me', 'telegram.me']), true);
    const whatsappLink = validateLink(body.whatsappLink, new Set(['wa.me', 'api.whatsapp.com', 'chat.whatsapp.com']), false);
    if (telegramLink === null || whatsappLink === null) {
      jsonResponse(res, 400, { error: 'Provide a valid Telegram URL and an optional valid WhatsApp URL.' });
      return;
    }
    const nextSettings = { telegramLink, whatsappLink };
    try {
      await saveSettings(nextSettings);
      settings = nextSettings;
    } catch (error) {
      console.error('Could not persist contact links to Supabase.', error);
      jsonResponse(res, 503, { error: 'Persistent settings storage is temporarily unavailable.' });
      return;
    }
    jsonResponse(res, 200, { saved: true });
    return;
  }

  if (pathname.startsWith('/api/')) {
    jsonResponse(res, 404, { error: 'Not found.' });
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    jsonResponse(res, 405, { error: 'Method not allowed.' }, { Allow: 'GET, HEAD' });
    return;
  }

  await serveFile(req, res, pathname);
};

const server = http.createServer((req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  handleRequest(req, res).catch((error) => {
    console.error('Request failed.', error);
    if (!res.headersSent) jsonResponse(res, error.statusCode || 500, { error: error.statusCode ? error.message : 'Internal server error.' });
    else res.destroy(error);
  });
});

loadSettings()
  .then((loadedSettings) => {
    settings = loadedSettings;
    server.listen(PORT, '0.0.0.0', () => console.log(`Smokweed Marseille server listening on port ${PORT}.`));
  })
  .catch((error) => {
    console.error('Server configuration failed.', error);
    process.exitCode = 1;
  });


