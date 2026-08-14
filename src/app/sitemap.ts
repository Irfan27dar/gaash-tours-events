import type { MetadataRoute } from "next";
import { packages } from "@/data/packages";
import { destinations } from "@/data/destinations";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaashtoursandevent.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/destinations", "/packages", "/activities", "/events", "/services", "/about", "/contact"].map(
    (p) => ({ url: `${siteUrl}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })
  );

  const pkgRoutes = packages.map((p) => ({
    url: `${siteUrl}/packages/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const destRoutes = destinations.map((d) => ({
    url: `${siteUrl}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...pkgRoutes, ...destRoutes];
}
