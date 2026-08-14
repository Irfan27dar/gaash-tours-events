import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Stars } from "./Stars";
import type { Destination } from "@/data/destinations";

export function DestinationCard({
  destination,
  className,
  size = "md",
}: {
  destination: Destination;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={cn(
        "group relative flex overflow-hidden rounded-2xl shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift",
        size === "lg" ? "min-h-[26rem]" : "min-h-[20rem]",
        className
      )}
    >
      <Image
        src={img(destination.image)}
        alt={destination.name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        placeholder="blur"
        className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />

      <div className="relative mt-auto w-full p-6 text-cloud">
        <span className="eyebrow text-saffron">{destination.tagline}</span>
        <div className="mt-1.5 flex items-center justify-between gap-3">
          <h3 className="text-2xl font-display font-semibold">{destination.name}</h3>
          <Stars rating={destination.rating} className="text-cloud" />
        </div>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-cloud/80 line-clamp-2">
          {destination.blurb}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron">
          Explore {destination.name}
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
