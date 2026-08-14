import type { ImageKey } from "@/lib/images";

export type Destination = {
  slug: string;
  name: string;
  region: string;
  image: ImageKey;
  gallery: ImageKey[];
  tagline: string;
  blurb: string;
  bestTime: string;
  idealDays: string;
  rating: number;
  fromPrice: number; // placeholder ₹ — client to confirm
  highlights: string[];
  experiences: string[];
  featured: boolean;
};

export const destinations: Destination[] = [
  {
    slug: "kashmir",
    name: "Kashmir",
    region: "Jammu & Kashmir",
    image: "dal-lake",
    gallery: ["dal-lake", "gulmarg", "pahalgam", "sonmarg"],
    tagline: "Paradise on Earth",
    blurb:
      "Shikaras on Dal Lake, meadows in Gulmarg, the pine valleys of Pahalgam and Sonmarg — the Kashmir every traveller pictures, guided by people who call it home.",
    bestTime: "Mar–Oct (blooms & meadows) · Dec–Feb (snow)",
    idealDays: "5–7 days",
    rating: 4.9,
    fromPrice: 21999,
    highlights: ["Dal Lake & houseboats", "Gulmarg Gondola", "Betaab & Aru valleys", "Mughal gardens"],
    experiences: ["Shikara ride at sunset", "Skiing in Gulmarg", "Houseboat stay", "Lidder river rafting"],
    featured: true,
  },
  {
    slug: "ladakh",
    name: "Ladakh",
    region: "UT of Ladakh",
    image: "ladakh",
    gallery: ["ladakh"],
    tagline: "Land of high passes",
    blurb:
      "High-desert monasteries, hairpin passes and the surreal blue of Pangong Tso. A raw, cinematic Himalaya for travellers who want the road less taken.",
    bestTime: "May–Sep",
    idealDays: "6–8 days",
    rating: 4.9,
    fromPrice: 34999,
    highlights: ["Pangong Tso", "Nubra Valley & Khardung La", "Leh monasteries", "Magnetic Hill"],
    experiences: ["Camp beside Pangong", "Bactrian camel ride, Nubra", "Monastery mornings", "Bike the passes"],
    featured: true,
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    region: "North-West India",
    image: "rajasthan",
    gallery: ["rajasthan"],
    tagline: "Kings, camels & colour",
    blurb:
      "Lake palaces in Udaipur, the pink city of Jaipur, golden forts and desert dunes — a royal heritage trail through India's most theatrical state.",
    bestTime: "Oct–Mar",
    idealDays: "8–12 days",
    rating: 4.8,
    fromPrice: 28999,
    highlights: ["Udaipur lake palaces", "Jaipur forts & bazaars", "Jaisalmer desert dunes", "Jodhpur blue city"],
    experiences: ["Sunset camel safari", "Heritage haveli stays", "Boat ride on Lake Pichola", "Folk music & dance"],
    featured: true,
  },
  {
    slug: "himachal",
    name: "Himachal",
    region: "Himachal Pradesh",
    image: "himachal",
    gallery: ["himachal"],
    tagline: "The mountain escape",
    blurb:
      "Deodar forests, apple valleys and snow-fed rivers around Manali, Shimla and Kasol — the Himalayas at an easy, breathe-out pace.",
    bestTime: "Mar–Jun · Oct–Feb (snow)",
    idealDays: "6–8 days",
    rating: 4.8,
    fromPrice: 18999,
    highlights: ["Manali & Solang Valley", "Rohtang / Atal Tunnel", "Kasol & Parvati Valley", "Shimla ridge"],
    experiences: ["Paragliding at Solang", "Riverside camping", "Snow point day-trip", "Apple-orchard walks"],
    featured: true,
  },
  {
    slug: "amritsar",
    name: "Amritsar",
    region: "Punjab",
    image: "amritsar",
    gallery: ["amritsar"],
    tagline: "The golden glow",
    blurb:
      "The Golden Temple at first light, the fervour of the Wagah border, and Punjab's legendary food — a soulful, sensory short break.",
    bestTime: "Oct–Mar",
    idealDays: "2–3 days",
    rating: 4.8,
    fromPrice: 9999,
    highlights: ["Golden Temple (Harmandir Sahib)", "Wagah border ceremony", "Jallianwala Bagh", "Punjabi cuisine"],
    experiences: ["Dawn darshan & langar", "Old-city food walk", "Beating Retreat ceremony", "Partition Museum"],
    featured: true,
  },
  {
    slug: "hidden-gems",
    name: "Hidden Gems",
    region: "Off-beat Kashmir",
    image: "doodhpathri",
    gallery: ["doodhpathri"],
    tagline: "Beyond the postcards",
    blurb:
      "Doodhpathri's milky meadows, Gurez, Yusmarg and Bangus — the quiet valleys locals save for themselves. Perfect for slow, crowd-free days.",
    bestTime: "May–Sep",
    idealDays: "1–3 days",
    rating: 4.7,
    fromPrice: 6999,
    highlights: ["Doodhpathri meadows", "Gurez Valley", "Yusmarg pastures", "Bangus Valley"],
    experiences: ["Meadow picnics", "Riverside walks", "Village homestays", "Photography days"],
    featured: true,
  },
];

export const featuredDestinations = destinations.filter((d) => d.featured);
export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
