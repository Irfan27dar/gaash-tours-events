import type { LucideIcon } from "lucide-react";
import { Heart, Building2, PartyPopper, Tent } from "lucide-react";

// The events division — promoted on the homepage and /events (gaashevent.com).
export const eventsIntro = {
  eyebrow: "Gaash Events",
  title: "Celebrations, staged in paradise",
  body: "From destination weddings on Dal Lake to corporate offsites in the mountains, our events division plans and produces the whole occasion — venue, décor, logistics and hospitality.",
  ctaHref: "https://gaashevent.com",
  ctaLabel: "Visit Gaash Events",
};

export type EventType = {
  slug: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
};

export const eventTypes: EventType[] = [
  {
    slug: "destination-weddings",
    title: "Destination Weddings",
    icon: Heart,
    blurb: "Houseboat mandaps, garden ceremonies and mountain backdrops, planned end to end.",
  },
  {
    slug: "corporate-offsites",
    title: "Corporate Offsites",
    icon: Building2,
    blurb: "Team retreats and conferences with logistics, stays and activities handled.",
  },
  {
    slug: "celebrations",
    title: "Private Celebrations",
    icon: PartyPopper,
    blurb: "Anniversaries, birthdays and reunions turned into unforgettable getaways.",
  },
  {
    slug: "camps-experiences",
    title: "Camps & Experiences",
    icon: Tent,
    blurb: "Curated group experiences — luxury camps, adventure meets and cultural evenings.",
  },
];
