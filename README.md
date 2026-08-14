# Gaash Tours & Events — Booking Platform

A modern, animated booking platform for **Gaash Tours And Events Pvt. Ltd.**, a Kashmir-based
travel agency. Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion.

Content is sourced from the live site **gaashtoursandevent.com**; design/motion is elevated from
the reference build.

## Status

- ✅ Design system, tokens, fonts, logo processing (transparent, symbol-only, favicons)
- ✅ Homepage with the full improved hierarchy + animations
- ✅ All public pages (destinations + detail, packages + detail with itineraries, activities, events, services, about, contact)
- ✅ SEO (metadata, sitemap, robots, organization + tour JSON-LD)
- ✅ Supabase database (schema + RLS + seed), enquiry persistence, auth-protected **admin panel**
- ⏳ Booking flow → Razorpay payments

See `DESIGN.md` for the design system and `CREDITS.md` for image licensing.

## Supabase setup (database + admin)

The site runs without Supabase (content falls back to `src/data`). To enable lead capture and the admin panel:

1. Create a project at [supabase.com](https://supabase.com). Copy the URL, `anon` key, and `service_role` key into `.env.local` (see `.env.example`).
2. Run the schema: paste `supabase/migrations/0001_init.sql` into the Supabase **SQL editor** and run it (or `supabase db push`).
3. Seed the content: `npm run seed` (loads the 14 packages, destinations, etc.).
4. Create an admin user: Supabase dashboard → **Authentication → Users → Add user** (email + password). That account signs in at `/admin`.
5. Restart `npm run dev`. Visit **/admin**.

The admin panel: dashboard (KPIs + recent enquiries), Enquiries (with status), Bookings, and Packages (edit price/badge/featured/bestseller/published — live on the site instantly).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in as phases land
npm run dev                  # http://localhost:3700
```

Scripts: `dev` · `build` · `start` · `lint` · `format`.

## Architecture

```
src/
  app/            App Router routes, layout, API, SEO (sitemap/robots)
  components/
    layout/       Header, Footer, WhatsApp float, page transition
    sections/     Homepage + contact sections
    ui/           Design-system primitives (Button, Badge, cards, Reveal…)
  data/           Single source of truth for all business content (*.ts)
  lib/            utils, image registry, enquiry schema
public/
  images/         Optimized destination photography
  brand/          Logo variants
```

**All business content lives in `src/data/*.ts`** — edit there, not in components. Prices are
**placeholders** flagged for the client to confirm (and will be editable in the admin panel).

## Environment

All keys live in `.env.local` (never committed). See `.env.example`:
Supabase (Phase 2), Razorpay (Phase 3), Resend (email). None are required to run Phase 1.

## Deployment

Target: **Vercel**. `npm run build` passes clean (16 routes).
