export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "Shoaib Beigh",
    role: "Founder & CEO",
    initials: "SB",
    bio: "A born-and-raised Kashmiri who started Gaash in 2014 to show travellers the valley he loves — the right way.",
  },
  {
    name: "Sovan Adhikari",
    role: "Branch Head — Kolkata",
    initials: "SA",
    bio: "Leads our eastern operations, making Gaash journeys effortless for travellers across West Bengal and beyond.",
  },
  {
    name: "Nargis Fatima",
    role: "Guest Relations",
    initials: "NF",
    bio: "Your first point of contact — she listens closely and turns your ideas into a trip that fits.",
  },
];

export const story = [
  {
    year: "2014",
    title: "Born in Srinagar",
    body: "Gaash began on the banks of the Dal Lake with one belief: travellers deserve the real Kashmir, shown by the people who live it.",
  },
  {
    year: "Today",
    title: "Two offices, one promise",
    body: "From Srinagar to a branch in Kolkata, we craft tailor-made journeys across Kashmir, Ladakh, Rajasthan, Himachal and Amritsar — with 24/7 care.",
  },
  {
    year: "Beyond",
    title: "Journeys & celebrations",
    body: "Our events division stages destination weddings and offsites in the same landscapes we love, end to end.",
  },
];
