import {
  Snowflake,
  CableCar,
  Waves,
  Mountain,
  Bike,
  Compass,
  Flag,
  Plane,
  PartyPopper,
  Car,
  Hotel,
  Ship,
  ShieldCheck,
  SlidersHorizontal,
  Heart,
  Building2,
  Tent,
  MapPinned,
  Headset,
  PencilRuler,
  BadgeIndianRupee,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/** Named icon registry so DB rows can store an icon by string name. */
export const iconMap: Record<string, LucideIcon> = {
  Snowflake,
  CableCar,
  Waves,
  Mountain,
  Bike,
  Compass,
  Flag,
  Plane,
  PartyPopper,
  Car,
  Hotel,
  Ship,
  ShieldCheck,
  SlidersHorizontal,
  Heart,
  Building2,
  Tent,
  MapPinned,
  Headset,
  PencilRuler,
  BadgeIndianRupee,
  Sparkles,
};

export const iconNames = Object.keys(iconMap);

/** Resolve an icon name to a component, falling back to Sparkles. */
export function getIcon(name?: string | null): LucideIcon {
  return (name && iconMap[name]) || Sparkles;
}
