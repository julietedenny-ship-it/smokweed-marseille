create table if not exists public.site_settings (
  id text primary key check (id = 'main'),
  telegram_link text not null,
  whatsapp_link text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

revoke all on table public.site_settings from anon, authenticated;
grant all on table public.site_settings to service_role;
