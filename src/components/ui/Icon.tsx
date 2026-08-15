import type { LucideProps } from "lucide-react";
import { getIcon } from "@/lib/icons";

/** Renders a lucide icon by its string name (falls back to Sparkles). */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = getIcon(name);
  return <Cmp {...props} />;
}
