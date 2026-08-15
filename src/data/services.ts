// Icons stored as lucide NAMES (see getIcon).
export type Service = {
  slug: string;
  title: string;
  icon: string;
  benefit: string;
  formValue: string;
};

export const services: Service[] = [
  {
    slug: "flight-booking",
    title: "Flight Booking",
    icon: "Plane",
    benefit: "Best fares on domestic & international flights, ticketed in minutes.",
    formValue: "Flight Booking",
  },
  {
    slug: "event-planning",
    title: "Event Planning",
    icon: "PartyPopper",
    benefit: "Weddings, corporate offsites and celebrations, produced end to end.",
    formValue: "Event Planning",
  },
  {
    slug: "vehicle-rental",
    title: "Vehicle Rental & Fleet",
    icon: "Car",
    benefit: "Clean cars, SUVs and coaches with trusted local drivers.",
    formValue: "Vehicle Rental",
  },
  {
    slug: "hotel-booking",
    title: "Hotel Booking",
    icon: "Hotel",
    benefit: "Handpicked hotels and resorts, personally vetted by our team.",
    formValue: "Hotel Booking",
  },
  {
    slug: "houseboat-stay",
    title: "Houseboat Stay",
    icon: "Ship",
    benefit: "Heritage Dal Lake houseboats — the most iconic night in Kashmir.",
    formValue: "Houseboat Stay",
  },
  {
    slug: "travel-insurance",
    title: "Travel Insurance",
    icon: "ShieldCheck",
    benefit: "Peace of mind on every trip, arranged alongside your booking.",
    formValue: "Travel Insurance",
  },
  {
    slug: "customize-package",
    title: "Customise Package",
    icon: "SlidersHorizontal",
    benefit: "Tell us your pace, budget and people — we build the trip around you.",
    formValue: "Custom Package",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
