# Gaash Tours & Events — Booking Platform

A modern, animated booking platform for **Gaash Tours And Events Pvt. Ltd.**, a Kashmir-based
travel agency. Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion.

Content is sourced from the live site **gaashtoursandevent.com**; design/motion is elevated from
the reference build.

## Status

**Phase 1 — Homepage + foundation (in review).**

- ✅ Design system, tokens, fonts, logo processing (transparent, symbol-only, favicons)
- ✅ Homepage with the full improved hierarchy + animations
- ✅ Content data layer (destinations, packages, activities, services, events, testimonials)
- ✅ Enquiry API (validates + logs), Contact page, SEO (metadata, sitemap, robots, JSON-LD)
- ⏳ Public detail pages (destinations, packages, activities, events, services, about)
- ⏳ Booking flow → Razorpay payments
- ⏳ Supabase database + auth-protected admin panel

See `DESIGN.md` for the design system and `CREDITS.md` for image licensing.

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
