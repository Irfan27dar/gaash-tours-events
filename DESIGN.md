# Gaash Tours & Events — Design System

The visual language for the Gaash platform: an elegant, photography-forward, luxury-travel
aesthetic — calm ivory canvas, an ink base for nav/footer, and a single warm saffron accent.

## Brand palette

> The `brand-guidelines.pdf` referenced in the brief was not supplied. This palette is derived
> from the supplied logo (yellow plane-in-black-circle "G") and the established brand, plus a
> deep-evergreen secondary added for luxury-travel depth. Swap in exact values if guidelines arrive.

| Token         | Hex       | Role                                   |
| ------------- | --------- | -------------------------------------- |
| `saffron`     | `#FFD200` | Primary accent — CTAs, badges, highlights |
| `saffron-deep`| `#E8B400` | Accent text on light (AA contrast)     |
| `ink`         | `#141414` | Base — nav, footer, dark sections, text |
| `cloud`       | `#F7F7F5` | Canvas / page background               |
| `cloud-deep`  | `#EFEEE9` | Alternate section background           |
| `pine`        | `#123A2E` | Secondary — the Events band            |

All tokens live in `tailwind.config.ts` and are mirrored as CSS variables in `globals.css`.

## Typography

Self-hosted via `next/font` (no layout shift):

- **Display / headings:** Playfair Display (elegant editorial serif)
- **Body / UI:** Inter

Type scale (`tailwind.config.ts` → `fontSize`): `display`, `h1`–`h3`, `lead`. Headings use
tight tracking and `text-wrap: balance`; body uses generous line-height and `text-wrap: pretty`.

## Motion (Framer Motion)

- Hero: parallax on the background image; headline + CTAs stagger-fade up on load.
- Scroll reveals: `Reveal` / `RevealGroup` (`components/ui/Reveal.tsx`) fade + rise, staggered for grids.
- Hover: cards lift with a shadow bloom and image zoom (`group-hover:scale-105`).
- Page transitions: `PageTransition` fades routes on navigation.
- Loading: branded logo pulse (`app/loading.tsx`).
- **`prefers-reduced-motion` is respected** globally (CSS) and per-component (`useReducedMotion`).
- Only `transform` / `opacity` are animated (60fps; no layout thrash).

## Logo usage

- `public/brand/logo-symbol.png` — full mark (black circle + gold glyph), for **light** backgrounds.
- `public/brand/logo-mark-gold.png` — gold glyph only, for **dark/ink** backgrounds.
- `public/brand/logo-mark-cloud.png` — ivory glyph only (monochrome option).
- Favicons: `src/app/icon.png` + `apple-icon.png` (Next.js conventions).

## Layout tokens

- Container max-width `1240px`, radius scale up to `3xl` (2rem), soft/lift/glow shadows.
- Standard section rhythm: `py-16 sm:py-20 lg:py-28`.
