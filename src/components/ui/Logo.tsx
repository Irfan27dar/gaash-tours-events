import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import symbol from "../../../public/brand/logo-symbol.png";
import markGold from "../../../public/brand/logo-mark-gold.png";

/**
 * Brand mark (symbol only).
 * - variant "light": full black-circle logo, for light backgrounds.
 * - variant "dark": gold glyph only, for ink/dark backgrounds.
 */
export function Logo({
  variant = "light",
  withWordmark = true,
  className,
  size = 44,
}: {
  variant?: "light" | "dark";
  withWordmark?: boolean;
  className?: string;
  size?: number;
}) {
  const src = variant === "dark" ? markGold : symbol;
  const textColor = variant === "dark" ? "text-cloud" : "text-ink";

  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label={`${site.name} — home`}>
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        priority
        className="transition-transform duration-500 ease-smooth group-hover:rotate-[8deg]"
      />
      {withWordmark && (
        <span className={cn("flex flex-col leading-none", textColor)}>
          <span className="font-display text-lg font-bold tracking-tight">Gaash</span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] opacity-70">
            Tours &amp; Events
          </span>
        </span>
      )}
    </Link>
  );
}
