"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { TourPackage } from "@/data/packages";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PackageCard } from "@/components/ui/PackageCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function PopularPackages({ packages }: { packages: TourPackage[] }) {
  const filters = ["All", ...Array.from(new Set(packages.map((p) => p.region)))];
  const [active, setActive] = useState<string>("All");

  const shown = useMemo(() => {
    const list = active === "All" ? packages : packages.filter((p) => p.region === active);
    // Bestsellers/featured first, then cap the homepage grid at 6.
    return [...list].sort((a, b) => Number(b.bestseller) - Number(a.bestseller)).slice(0, 6);
  }, [active, packages]);

  return (
    <Section id="packages" className="bg-white">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Real trips, real value"
          title="Popular packages"
          intro="Curated itineraries with transparent pricing — filter by region to find your journey."
        />
        <Button href="/packages" variant="outline">
          View all packages
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              active === f
                ? "border-ink bg-ink text-cloud"
                : "border-line bg-cloud text-ink/70 hover:border-ink/40"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((pkg) => (
            <motion.div
              key={pkg.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <PackageCard pkg={pkg} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
