// ─────────────────────────────────────────────────────────────
// Single source of truth for company-wide business details.
// Content sourced from the live site gaashtoursandevent.com.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Gaash Tours & Events",
  legalName: "Gaash Tours And Events Pvt. Ltd.",
  tagline: "Trusted Travel Agency",
  headline: "Discover Kashmir, the way it's meant to be",
  established: 2014,
  url: "https://gaashtoursandevent.com",
  eventsUrl: "https://gaashevent.com",
  description:
    "Kashmir-based travel agency connecting travellers with award-winning local experts who craft personalised, unforgettable journeys across Kashmir, Ladakh, Rajasthan, Himachal and beyond.",

  offices: {
    head: {
      label: "Head Office — Srinagar",
      line: "Rambagh, Srinagar",
      region: "Jammu & Kashmir",
      pin: "190009",
      full: "Rambagh, Srinagar, Jammu and Kashmir 190009",
      mapsQuery: "Rambagh, Srinagar, Jammu and Kashmir 190009",
    },
    branch: {
      label: "Branch Office — Kolkata",
      line: "322 New Jessore Road (South), Madhyamgram",
      region: "Kolkata, West Bengal",
      pin: "700129",
      full: "322 New Jessore Road (South), Madhyamgram, Kolkata, West Bengal 700129",
      mapsQuery: "322 New Jessore Road South, Madhyamgram, Kolkata 700129",
      head: "Sovan Adhikari",
      phone: "7003763619",
      email: "kolkata@gaashtoursandevent.com",
    },
  },

  hours: "10:00 AM – 7:00 PM",
  phones: ["7006249328", "6006908012", "9018304626"],
  emails: ["info@gaashtoursandevent.com", "support@gaashtoursandevent.com"],

  whatsapp: {
    number: "917006249328",
    href: "https://wa.me/917006249328",
  },

  social: {
    facebook: { href: "https://facebook.com/gaashtoursandevent", handle: "@gaashtoursandevent" },
    instagram: { href: "https://instagram.com/gaashtoursandevents", handle: "@gaashtoursandevents" },
    twitter: { href: "https://x.com/gaashtours", handle: "@gaashtours" },
    youtube: { href: "https://youtube.com/@GaashToursAndEvents", handle: "@GaashToursAndEvents" },
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Activities", href: "/activities" },
  { label: "Events", href: "/events" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const stats = [
  { value: 4.9, suffix: "★", label: "Average traveller rating", decimals: 1 },
  { value: 5000, suffix: "+", label: "Travellers served" },
  { value: 2014, prefix: "Since ", label: "Local Kashmiri experts", raw: true },
  { value: 24, suffix: "/7", label: "On-trip support" },
] as const;

// Partner / certification badges displayed in the trust strip.
export const certifications = [
  { code: "JK", label: "J&K Tourism", note: "Registered" },
  { code: "TOAI", label: "TOAI", note: "Tour Operators Assn. of India" },
  { code: "ABTO", label: "ABTO", note: "Assn. of Buddhist Tour Operators" },
] as const;

// Payment methods displayed in the footer.
export const paymentMethods = [
  "Visa",
  "Mastercard",
  "Amex",
  "Maestro",
  "Discover",
  "Apple Pay",
  "Google Pay",
  "PayPal",
] as const;
