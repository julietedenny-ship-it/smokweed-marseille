# Smokweed Munich

Multilingual website built with HTML, CSS, and JavaScript, served by a small Node.js service. The service also provides a password-protected admin API for public Telegram and WhatsApp links.

## Free deployment architecture

The Render Blueprint uses a free Web Service and stores contact settings in Supabase. No Render persistent disk is required. Free hosting tiers have usage and availability limits that can change; check current provider terms.

## Prepare Supabase once

1. Create a Supabase project and save its database password privately.
2. In the Supabase project, open **SQL Editor**, create a new query, paste the contents of `supabase-schema.sql`, and run it.
3. In Supabase, open **Project Settings > API Keys**. Copy the **service_role** key (not the `anon`/publishable key). Keep it secret.
4. Copy the project's HTTPS **Project URL** from the same settings area.

The table has Row Level Security enabled and grants access only to the server's `service_role`. Never put the service-role key in a browser, source file, or Git repository.

## Deploy on Render

1. Commit and push all project files, including `render.yaml` and `supabase-schema.sql`, to the connected Git repository.
2. In Render, create a Blueprint from that repository and confirm the free Web Service `smokweed-munich-admin`.
3. Set the Blueprint's private environment variables when prompted, or later in the service's **Environment** page:
   - `ADMIN_PASSWORD`: a unique password with at least 16 characters.
   - `SUPABASE_URL`: the Supabase HTTPS Project URL.
   - `SUPABASE_SERVICE_ROLE_KEY`: the private Supabase service-role key.
4. Save changes and deploy. The service checks Supabase during startup and seeds the settings table from `TELEGRAM_LINK` and `WHATSAPP_LINK` if it is empty.
5. Open the service URL ending in `.onrender.com`, then visit `/admin.html` to sign in and save the links.

The Render service's filesystem is ephemeral, but settings are stored in Supabase and survive service restarts. The admin password and Supabase key are not exposed to visitors. Admin sessions are held in server memory and expire after eight hours; a Render restart signs out active sessions.

## Local development

Use Node.js 20 or later. Set `ADMIN_PASSWORD`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` in the local shell before `npm start`. For a local database table, run `supabase-schema.sql` in the Supabase SQL Editor. Do not commit local secrets.

## Admin security notes

- The admin API validates same-origin requests, limits failed sign-in attempts, and uses an HTTP-only, same-site session cookie.
- Only HTTPS links to Telegram (`t.me` or `telegram.me`) and WhatsApp (`wa.me`, `api.whatsapp.com`, or `chat.whatsapp.com`) can be saved.
- The public contact links are necessarily visible to site visitors. Never use secrets or private tokens as contact URLs.
- The server generates `site-config.js` from the saved public links. The Supabase service-role key never leaves the server.

## SEO

Once the production domain is assigned, create a sitemap for that domain, reference it in `robots.txt`, and submit it to the search engines.
