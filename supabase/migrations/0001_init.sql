-- ─────────────────────────────────────────────────────────────
-- Gaash Tours & Events — initial schema
-- Run in the Supabase SQL editor (or `supabase db push`).
-- ─────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- Auto-update updated_at on every row change.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ── Content: destinations ────────────────────────────────────
create table if not exists public.destinations (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null,
  region       text not null,
  image        text not null,           -- ImageKey
  gallery      text[] not null default '{}',
  tagline      text,
  blurb        text,
  best_time    text,
  ideal_days   text,
  rating       numeric(2,1) default 4.8,
  from_price   integer default 0,       -- placeholder ₹
  highlights   text[] not null default '{}',
  experiences  text[] not null default '{}',
  featured     boolean not null default false,
  published    boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── Content: packages ────────────────────────────────────────
create table if not exists public.packages (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  title          text not null,
  region         text not null,
  route          text,
  image          text not null,
  gallery        text[] not null default '{}',
  nights         integer default 0,
  days           integer default 0,
  duration_label text,
  rating         numeric(2,1) default 4.8,
  reviews        integer default 0,
  price          integer not null default 0,   -- placeholder ₹
  old_price      integer not null default 0,
  discount_label text,
  tags           text[] not null default '{}',
  badge          text,
  type           text,
  featured       boolean not null default false,
  bestseller     boolean not null default false,
  published      boolean not null default true,
  overview       text,
  highlights     text[] not null default '{}',
  itinerary      jsonb not null default '[]',   -- [{day,title,detail}]
  inclusions     text[] not null default '{}',
  exclusions     text[] not null default '{}',
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ── Content: activities ──────────────────────────────────────
create table if not exists public.activities (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  title      text not null,
  icon       text,                       -- lucide icon name
  where_at   text,
  season     text,
  blurb      text,
  published  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Content: services ────────────────────────────────────────
create table if not exists public.services (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  title      text not null,
  icon       text,
  benefit    text,
  published  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Content: event types ─────────────────────────────────────
create table if not exists public.event_types (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  title      text not null,
  icon       text,
  blurb      text,
  published  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Content: testimonials ────────────────────────────────────
create table if not exists public.testimonials (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  location   text,
  trip       text,
  rating     integer not null default 5,
  quote      text not null,
  published  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Leads: enquiries ─────────────────────────────────────────
create table if not exists public.enquiries (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  phone         text not null,
  destination   text,
  travellers    text,
  travel_date   date,
  package_slug  text,
  package_title text,
  message       text,
  status        text not null default 'new',  -- new | contacted | won | lost
  created_at    timestamptz not null default now()
);

-- ── Bookings ─────────────────────────────────────────────────
create table if not exists public.bookings (
  id             uuid primary key default gen_random_uuid(),
  reference      text unique not null default ('GB-' || upper(substr(gen_random_uuid()::text,1,8))),
  package_slug   text,
  package_title  text,
  customer_name  text not null,
  email          text not null,
  phone          text not null,
  travel_date    date,
  travellers     integer default 1,
  amount         integer not null default 0,     -- ₹ total
  deposit        integer not null default 0,
  currency       text not null default 'INR',
  status         text not null default 'pending', -- pending | paid | cancelled | refunded
  payment_provider text,                          -- razorpay | ...
  payment_id     text,
  payment_order_id text,
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ── updated_at triggers ──────────────────────────────────────
do $$
declare t text;
begin
  foreach t in array array['destinations','packages','activities','services','event_types','testimonials','bookings']
  loop
    execute format('drop trigger if exists set_updated_at on public.%I;', t);
    execute format('create trigger set_updated_at before update on public.%I
                    for each row execute function public.set_updated_at();', t);
  end loop;
end $$;

-- ── Row Level Security ───────────────────────────────────────
alter table public.destinations  enable row level security;
alter table public.packages      enable row level security;
alter table public.activities    enable row level security;
alter table public.services      enable row level security;
alter table public.event_types   enable row level security;
alter table public.testimonials  enable row level security;
alter table public.enquiries     enable row level security;
alter table public.bookings      enable row level security;

-- Public can READ published content.
do $$
declare t text;
begin
  foreach t in array array['destinations','packages','activities','services','event_types','testimonials']
  loop
    execute format('drop policy if exists "public read published" on public.%I;', t);
    execute format('create policy "public read published" on public.%I
                    for select using (published = true);', t);
    -- Authenticated (admin) full access.
    execute format('drop policy if exists "admin all" on public.%I;', t);
    execute format('create policy "admin all" on public.%I
                    for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- Anyone may create an enquiry / booking; only admins may read/update.
drop policy if exists "anon create enquiry" on public.enquiries;
create policy "anon create enquiry" on public.enquiries for insert with check (true);
drop policy if exists "admin read enquiries" on public.enquiries;
create policy "admin read enquiries" on public.enquiries for select to authenticated using (true);
drop policy if exists "admin update enquiries" on public.enquiries;
create policy "admin update enquiries" on public.enquiries for update to authenticated using (true) with check (true);

drop policy if exists "anon create booking" on public.bookings;
create policy "anon create booking" on public.bookings for insert with check (true);
drop policy if exists "admin manage bookings" on public.bookings;
create policy "admin manage bookings" on public.bookings for all to authenticated using (true) with check (true);
