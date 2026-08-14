import type { LucideIcon } from "lucide-react";
import {
  Snowflake,
  CableCar,
  Waves,
  Mountain,
  Bike,
  Compass,
  Flag,
} from "lucide-react";

export type Activity = {
  slug: string;
  title: string;
  icon: LucideIcon;
  where: string;
  season: string;
  blurb: string;
};

export const activities: Activity[] = [
  {
    slug: "skiing",
    title: "Skiing",
    icon: Snowflake,
    where: "Gulmarg",
    season: "Dec – Mar",
    blurb: "Powder runs and one of Asia's highest lift-served ski fields, for first-timers to pros.",
  },
  {
    slug: "gondola-ride",
    title: "Gondola Ride",
    icon: CableCar,
    where: "Gulmarg",
    season: "All year",
    blurb: "Ride the world's second-highest cable car to Apharwat Peak for sweeping Himalayan views.",
  },
  {
    slug: "boat-rafting",
    title: "Boat Rafting",
    icon: Waves,
    where: "Pahalgam · Sonmarg",
    season: "Apr – Sep",
    blurb: "White-water thrills down the cold, clear Lidder and Sindh rivers.",
  },
  {
    slug: "snowboarding",
    title: "Snowboarding",
    icon: Mountain,
    where: "Gulmarg",
    season: "Dec – Mar",
    blurb: "Wide, uncrowded slopes and deep snow — a rising favourite for freeriders.",
  },
  {
    slug: "mountain-biking",
    title: "Mountain Biking",
    icon: Bike,
    where: "Kashmir · Ladakh",
    season: "May – Sep",
    blurb: "Trails through pine forests and high passes, from gentle valleys to Himalayan epics.",
  },
  {
    slug: "atv",
    title: "ATV Rides",
    icon: Compass,
    where: "Gulmarg · Sonmarg",
    season: "Apr – Oct",
    blurb: "Quad-bike across meadows and rugged tracks for an adrenaline-packed hour.",
  },
  {
    slug: "golfing",
    title: "Golfing",
    icon: Flag,
    where: "Srinagar · Gulmarg · Pahalgam",
    season: "Apr – Oct",
    blurb: "Tee off on lush, high-altitude greens framed by snow-dusted peaks.",
  },
];

export const getActivity = (slug: string) => activities.find((a) => a.slug === slug);
