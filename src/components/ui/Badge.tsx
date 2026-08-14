import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badge = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
  {
    variants: {
      tone: {
        saffron: "bg-saffron text-ink",
        ink: "bg-ink text-cloud",
        glass: "bg-white/85 text-ink backdrop-blur-sm shadow-soft",
        pine: "bg-pine text-cloud",
        outline: "border border-ink/15 text-ink/80",
      },
    },
    defaultVariants: { tone: "saffron" },
  }
);

export function Badge({
  className,
  tone,
  children,
}: VariantProps<typeof badge> & { className?: string; children: React.ReactNode }) {
  return <span className={cn(badge({ tone }), className)}>{children}</span>;
}
