import { isSupabaseConfigured } from "./supabase/config";
import { createSupabasePublicClient } from "./supabase/public";
import {
  packages as staticPackages,
  packageRegions as staticRegions,
  packageTypes as staticTypes,
  type TourPackage,
} from "@/data/packages";
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
