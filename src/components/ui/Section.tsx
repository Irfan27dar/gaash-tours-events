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
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="eyebrow text-saffron-deep">
          <span className="h-px w-6 bg-saffron-deep" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-h2">{title}</h2>
      {intro && <p className="mt-4 text-lead text-ink/70">{intro}</p>}
    </Reveal>
  );
}
