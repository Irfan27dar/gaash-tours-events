export type Testimonial = {
  name: string;
  location: string;
  trip: string;
  rating: number;
  quote: string;
};

// Reuses the real praise themes from the live site, attributed to named travellers.
export const testimonials: Testimonial[] = [
  {
    name: "Rahul Tewatia",
    location: "Faridabad",
    trip: "Kashmir & Ladakh",
    rating: 5,
    quote:
      "Genuinely the best journey of my life. Every detail was handled — the team showed us the real beauty of Kashmir, including off-beat locations we'd never have found alone.",
  },
  {
    name: "Anjali Menon",
    location: "Delhi",
    trip: "Honeymoon in Kashmir",
    rating: 5,
    quote:
      "A well-organised, adventurous trip — truly heaven on earth. The accommodations were top-notch and the guides were incredibly knowledgeable.",
  },
  {
    name: "Sachin H. Patel",
    location: "Gujarat",
    trip: "Rajasthan",
    rating: 5,
    quote:
      "Extraordinary service by Gaash. Warm, professional and always a step ahead. The heritage stays and the desert night were unforgettable.",
  },
  {
    name: "Sovan Adhikari",
    location: "Kolkata",
    trip: "Leh Ladakh",
    rating: 5,
    quote:
      "Seamless from the first call to the airport drop. Knowledgeable local experts who clearly love what they do — highly recommended.",
  },
  {
    name: "Priya Nair",
    location: "Bengaluru",
    trip: "Himachal",
    rating: 5,
    quote:
      "Beautifully planned and paced. Nothing felt rushed, the hotels were lovely, and support was a message away throughout.",
  },
];
