import { isSupabaseConfigured } from "./supabase/config";
import { createSupabasePublicClient } from "./supabase/public";
import {
  packages as staticPackages,
  packageRegions as staticRegions,
  packageTypes as staticTypes,
  type TourPackage,
} from "@/data/packages";
import { destinations as staticDestinations, type Destination } from "@/data/destinations";
import { activities as staticActivities, type Activity } from "@/data/activities";
import { services as staticServices, type Service } from "@/data/services";
import { eventTypes as staticEventTypes, type EventType } from "@/data/events";
import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";
import type { ImageKey } from "./images";

/**
 * Content-access layer. When Supabase is configured, packages come from the DB
 * (so admin price/flag edits are live); otherwise we fall back to the static
 * seed in src/data. Public pages call these instead of importing data directly.
 */

type PackageRow = {
  slug: string;
  title: string;
  region: string;
  route: string | null;
  image: string;
  gallery: string[] | null;
  nights: number | null;
  days: number | null;
  duration_label: string | null;
  rating: number | null;
  reviews: number | null;
  price: number;
  old_price: number;
  discount_label: string | null;
  tags: string[] | null;
  badge: string | null;
  type: string | null;
  featured: boolean;
  bestseller: boolean;
  overview: string | null;
  highlights: string[] | null;
  itinerary: { day: number; title: string; detail: string }[] | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  sort_order: number | null;
};

function rowToPackage(r: PackageRow): TourPackage {
  return {
    slug: r.slug,
    title: r.title,
    region: r.region,
    route: r.route ?? "",
    image: (r.image as ImageKey) ?? "hero",
    gallery: (r.gallery ?? []) as ImageKey[],
    nights: r.nights ?? 0,
    days: r.days ?? 0,
    durationLabel: r.duration_label ?? "",
    rating: Number(r.rating ?? 4.8),
    reviews: r.reviews ?? 0,
    price: r.price,
    oldPrice: r.old_price,
    discountLabel: r.discount_label ?? "",
    tags: r.tags ?? [],
    badge: (r.badge as TourPackage["badge"]) ?? undefined,
    type: r.type ?? "",
    featured: r.featured,
    bestseller: r.bestseller,
    overview: r.overview ?? "",
    highlights: r.highlights ?? [],
    itinerary: r.itinerary ?? [],
    inclusions: r.inclusions ?? [],
    exclusions: r.exclusions ?? [],
  };
}

export async function getPackages(): Promise<TourPackage[]> {
  if (!isSupabaseConfigured) return staticPackages;
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return staticPackages;
    return (data as PackageRow[]).map(rowToPackage);
  } catch {
    return staticPackages;
  }
}

export async function getPackage(slug: string): Promise<TourPackage | undefined> {
  const all = await getPackages();
  return all.find((p) => p.slug === slug);
}

export async function getFeaturedPackages(): Promise<TourPackage[]> {
  return (await getPackages()).filter((p) => p.featured);
}

export async function getBestsellerPackage(): Promise<TourPackage> {
  const all = await getPackages();
  return all.find((p) => p.bestseller) ?? all[0];
}

export async function getPackageFilters() {
  if (!isSupabaseConfigured) return { regions: staticRegions, types: staticTypes };
  const all = await getPackages();
  return {
    regions: Array.from(new Set(all.map((p) => p.region))),
    types: Array.from(new Set(all.map((p) => p.type))),
  };
}

// ── Destinations ─────────────────────────────────────────────
type DestinationRow = {
  slug: string; name: string; region: string; image: string; gallery: string[] | null;
  tagline: string | null; blurb: string | null; best_time: string | null; ideal_days: string | null;
  rating: number | null; from_price: number | null; highlights: string[] | null;
  experiences: string[] | null; featured: boolean;
};
function rowToDestination(r: DestinationRow): Destination {
  return {
    slug: r.slug, name: r.name, region: r.region, image: (r.image as ImageKey) ?? "hero",
    gallery: (r.gallery ?? []) as ImageKey[], tagline: r.tagline ?? "", blurb: r.blurb ?? "",
    bestTime: r.best_time ?? "", idealDays: r.ideal_days ?? "", rating: Number(r.rating ?? 4.8),
    fromPrice: r.from_price ?? 0, highlights: r.highlights ?? [], experiences: r.experiences ?? [],
    featured: r.featured,
  };
}
export async function getDestinations(): Promise<Destination[]> {
  if (!isSupabaseConfigured) return staticDestinations;
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase.from("destinations").select("*").eq("published", true).order("sort_order");
    if (error || !data?.length) return staticDestinations;
    return (data as DestinationRow[]).map(rowToDestination);
  } catch { return staticDestinations; }
}
export async function getFeaturedDestinations(): Promise<Destination[]> {
  return (await getDestinations()).filter((d) => d.featured);
}
export async function getDestination(slug: string): Promise<Destination | undefined> {
  return (await getDestinations()).find((d) => d.slug === slug);
}

// ── Activities ───────────────────────────────────────────────
type ActivityRow = { slug: string; title: string; icon: string | null; where_at: string | null; season: string | null; blurb: string | null };
export async function getActivities(): Promise<Activity[]> {
  if (!isSupabaseConfigured) return staticActivities;
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase.from("activities").select("*").eq("published", true).order("sort_order");
    if (error || !data?.length) return staticActivities;
    return (data as ActivityRow[]).map((r) => ({
      slug: r.slug, title: r.title, icon: r.icon ?? "Sparkles",
      where: r.where_at ?? "", season: r.season ?? "", blurb: r.blurb ?? "",
    }));
  } catch { return staticActivities; }
}

// ── Services ─────────────────────────────────────────────────
type ServiceRow = { slug: string; title: string; icon: string | null; benefit: string | null };
export async function getServices(): Promise<Service[]> {
  if (!isSupabaseConfigured) return staticServices;
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase.from("services").select("*").eq("published", true).order("sort_order");
    if (error || !data?.length) return staticServices;
    return (data as ServiceRow[]).map((r) => ({
      slug: r.slug, title: r.title, icon: r.icon ?? "Sparkles", benefit: r.benefit ?? "", formValue: r.title,
    }));
  } catch { return staticServices; }
}

// ── Event types ──────────────────────────────────────────────
type EventTypeRow = { slug: string; title: string; icon: string | null; blurb: string | null };
export async function getEventTypes(): Promise<EventType[]> {
  if (!isSupabaseConfigured) return staticEventTypes;
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase.from("event_types").select("*").eq("published", true).order("sort_order");
    if (error || !data?.length) return staticEventTypes;
    return (data as EventTypeRow[]).map((r) => ({ slug: r.slug, title: r.title, icon: r.icon ?? "Sparkles", blurb: r.blurb ?? "" }));
  } catch { return staticEventTypes; }
}

// ── Testimonials ─────────────────────────────────────────────
type TestimonialRow = { name: string; location: string | null; trip: string | null; rating: number; quote: string };
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) return staticTestimonials;
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase.from("testimonials").select("*").eq("published", true).order("sort_order");
    if (error || !data?.length) return staticTestimonials;
    return (data as TestimonialRow[]).map((r) => ({
      name: r.name, location: r.location ?? "", trip: r.trip ?? "", rating: r.rating, quote: r.quote,
    }));
  } catch { return staticTestimonials; }
}
