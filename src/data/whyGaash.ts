import type { LucideIcon } from "lucide-react";
import { MapPinned, Headset, PencilRuler, BadgeIndianRupee, Ship } from "lucide-react";

export type ValueProp = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export const valueProps: ValueProp[] = [
  {
    title: "Local Kashmiri experts",
    body: "Born-and-raised guides who know the valley's hidden corners, not just the postcards.",
    icon: MapPinned,
  },
  {
    title: "Tailor-made itineraries",
    body: "No cookie-cutter tours — we build the trip around your pace, budget and people.",
    icon: PencilRuler,
  },
  {
    title: "Best-price promise",
    body: "Direct local operations mean fair, transparent pricing with no middlemen.",
    icon: BadgeIndianRupee,
  },
  {
    title: "24/7 on-trip support",
    body: "One call away for the whole journey — changes, questions or a last-minute plan.",
    icon: Headset,
  },
  {
    title: "Houseboat & handpicked stays",
    body: "Every hotel and heritage houseboat is personally vetted for comfort and warmth.",
    icon: Ship,
  },
];
