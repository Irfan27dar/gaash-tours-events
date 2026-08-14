// Statically imported images so Next.js generates optimized sources + blur
// placeholders automatically. Reference by key everywhere in the app.
import type { StaticImageData } from "next/image";

import hero from "../../public/images/hero.jpg";
import dalLake from "../../public/images/dal-lake.jpg";
import gulmarg from "../../public/images/gulmarg.jpg";
import pahalgam from "../../public/images/pahalgam.jpg";
import sonmarg from "../../public/images/sonmarg.jpg";
import ladakh from "../../public/images/ladakh.jpg";
import rajasthan from "../../public/images/rajasthan.jpg";
import himachal from "../../public/images/himachal.jpg";
import amritsar from "../../public/images/amritsar.jpg";
import vaishnoDevi from "../../public/images/vaishno-devi.jpg";
import doodhpathri from "../../public/images/doodhpathri.jpg";
import experiences from "../../public/images/experiences.jpg";

export const images = {
  hero,
  "dal-lake": dalLake,
  gulmarg,
  pahalgam,
  sonmarg,
  ladakh,
  rajasthan,
  himachal,
  amritsar,
  "vaishno-devi": vaishnoDevi,
  doodhpathri,
  experiences,
} satisfies Record<string, StaticImageData>;

export type ImageKey = keyof typeof images;

export const img = (key: ImageKey): StaticImageData => images[key];
