import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating,
  reviews,
  className,
  size = 14,
}: {
  rating: number;
  reviews?: number;
  className?: string;
  size?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)}>
      <Star size={size} className="fill-saffron text-saffron" aria-hidden />
      <span className="font-semibold">{rating.toFixed(1)}</span>
      {reviews !== undefined && <span className="opacity-60">({reviews})</span>}
      <span className="sr-only">out of 5{reviews !== undefined ? `, ${reviews} reviews` : ""}</span>
    </span>
  );
}
