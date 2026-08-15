/**
 * Seed the Supabase database from the static content in src/data.
 * Idempotent — upserts on slug so it's safe to re-run.
 *
 *   npm run seed
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

import { destinations } from "../src/data/destinations";
import { packages } from "../src/data/packages";
import { activities } from "../src/data/activities";
import { services } from "../src/data/services";
import { eventTypes } from "../src/data/events";
import { testimonials } from "../src/data/testimonials";

// ── tiny .env.local loader (no dependency) ──────────────────
function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* no .env.local — rely on real env */
  }
}
loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("✖ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

async function upsert(table: string, rows: Record<string, unknown>[], onConflict = "slug") {
  const { error } = await supabase.from(table).upsert(rows, { onConflict });
  if (error) {
    console.error(`✖ ${table}:`, error.message);
    process.exitCode = 1;
  } else {
    console.log(`✓ ${table}: ${rows.length} rows`);
  }
}

async function main() {
  await upsert(
    "destinations",
    destinations.map((d, i) => ({
      slug: d.slug,
      name: d.name,
      region: d.region,
      image: d.image,
      gallery: d.gallery,
      tagline: d.tagline,
      blurb: d.blurb,
      best_time: d.bestTime,
      ideal_days: d.idealDays,
      rating: d.rating,
      from_price: d.fromPrice,
      highlights: d.highlights,
      experiences: d.experiences,
      featured: d.featured,
      sort_order: i,
    }))
  );

  await upsert(
    "packages",
    packages.map((p, i) => ({
      slug: p.slug,
      title: p.title,
      region: p.region,
      route: p.route,
      image: p.image,
      gallery: p.gallery,
      nights: p.nights,
      days: p.days,
      duration_label: p.durationLabel,
      rating: p.rating,
      reviews: p.reviews,
      price: p.price,
      old_price: p.oldPrice,
      discount_label: p.discountLabel,
      tags: p.tags,
      badge: p.badge ?? null,
      type: p.type,
      featured: p.featured,
      bestseller: p.bestseller,
      overview: p.overview,
      highlights: p.highlights,
      itinerary: p.itinerary,
      inclusions: p.inclusions,
      exclusions: p.exclusions,
      sort_order: i,
    }))
  );

  await upsert(
    "activities",
    activities.map((a, i) => ({
      slug: a.slug,
      title: a.title,
      icon: a.icon,
      where_at: a.where,
      season: a.season,
      blurb: a.blurb,
      sort_order: i,
    }))
  );

  await upsert(
    "services",
    services.map((s, i) => ({
      slug: s.slug,
      title: s.title,
      icon: s.icon,
      benefit: s.benefit,
      sort_order: i,
    }))
  );

  await upsert(
    "event_types",
    eventTypes.map((e, i) => ({
      slug: e.slug,
      title: e.title,
      icon: e.icon,
      blurb: e.blurb,
      sort_order: i,
    }))
  );

  await upsert(
    "testimonials",
    testimonials.map((t, i) => ({
      name: t.name,
      location: t.location,
      trip: t.trip,
      rating: t.rating,
      quote: t.quote,
      sort_order: i,
    })),
    "name"
  );

  console.log("\nSeed complete.");
}

main();
