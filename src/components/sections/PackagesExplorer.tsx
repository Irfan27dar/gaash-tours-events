"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { packages, packageRegions, packageTypes } from "@/data/packages";
import { PackageCard } from "@/components/ui/PackageCard";
import { cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "duration";

const sorts: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "duration", label: "Duration" },
];

export function PackagesExplorer({ initialRegion = "All" }: { initialRegion?: string }) {
  const [region, setRegion] = useState(initialRegion);
  const [type, setType] = useState("All");
  const [sort, setSort] = useState<Sort>("featured");

  const shown = useMemo(() => {
    let list = packages.filter(
      (p) => (region === "All" || p.region === region) && (type === "All" || p.type === type)
    );
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "duration":
          return a.days - b.days;
        default:
          return Number(b.bestseller) - Number(a.bestseller) || b.rating - a.rating;
      }
    });
    return list;
  }, [region, type, sort]);

  return (
    <>
      <div className="sticky top-16 z-30 -mx-5 border-y border-line bg-cloud/90 px-5 py-4 backdrop-blur-md lg:top-20">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <FilterRow label="Region" active={region} setActive={setRegion} options={["All", ...packageRegions]} />
          <FilterRow label="Type" active={type} setActive={setType} options={["All", ...packageTypes]} />
          <label className="ml-auto flex items-center gap-2 text-sm">
            <SlidersHorizontal size={15} className="text-ink/50" aria-hidden />
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-lg border border-line bg-white px-3 py-1.5 font-medium text-ink outline-none focus:border-ink"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink/55">
        {shown.length} {shown.length === 1 ? "trip" : "trips"}
      </p>

      <motion.div layout className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((pkg) => (
            <motion.div
              key={pkg.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <PackageCard pkg={pkg} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && (
        <p className="py-16 text-center text-ink/50">No trips match those filters yet — try widening your search.</p>
      )}
    </>
  );
}

function FilterRow({
  label,
  active,
  setActive,
  options,
}: {
  label: string;
  active: string;
  setActive: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink/40">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => setActive(o)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-300",
              active === o
                ? "border-ink bg-ink text-cloud"
                : "border-line bg-white text-ink/70 hover:border-ink/40"
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
