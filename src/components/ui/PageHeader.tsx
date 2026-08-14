import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { img, type ImageKey } from "@/lib/images";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
  image = "hero",
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: ImageKey;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <header className="relative flex min-h-[46svh] items-end overflow-hidden bg-ink pt-16">
      <Image
        src={img(image)}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
      <div className="container relative pb-12 pt-20">
        <Reveal>
          <nav className="flex items-center gap-1.5 text-xs text-cloud/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-saffron">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight size={12} aria-hidden />
                {c.href ? (
                  <Link href={c.href} className="hover:text-saffron">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-cloud/90">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          {eyebrow && <span className="eyebrow mt-4 block text-saffron">{eyebrow}</span>}
          <h1 className="mt-2 max-w-3xl text-h1 font-display text-cloud">{title}</h1>
          {intro && <p className="mt-4 max-w-xl text-lead text-cloud/80">{intro}</p>}
        </Reveal>
      </div>
    </header>
  );
}
