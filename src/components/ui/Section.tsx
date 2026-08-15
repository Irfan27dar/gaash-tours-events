import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-28", className)}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  // Bright saffron reads on dark; deep gold meets AA contrast on light.
  const eyebrowColor = onDark ? "text-saffron" : "text-saffron-deep";
  const dashColor = onDark ? "bg-saffron" : "bg-saffron-deep";
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className={cn("eyebrow", eyebrowColor)}>
          <span className={cn("h-px w-6", dashColor)} aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-h2">{title}</h2>
      {intro && <p className="mt-4 text-lead text-ink/70">{intro}</p>}
    </Reveal>
  );
}
