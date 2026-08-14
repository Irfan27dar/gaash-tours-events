"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { img } from "@/lib/images";
import { TripSearch } from "./TripSearch";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ink">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={img("hero")}
          alt="A shikara glides across Dal Lake in Srinagar, Kashmir, framed by the Himalayas"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />

      <div className="container relative flex min-h-[100svh] flex-col justify-center pb-40 pt-28">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.span
            variants={item}
            className="eyebrow text-saffron"
          >
            <span className="h-px w-8 bg-saffron" aria-hidden />
            {site.tagline} · Since {site.established}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-display font-display font-semibold text-cloud"
          >
            Discover Kashmir, <br className="hidden sm:block" />
            the way it&apos;s meant to be
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lead text-cloud/85">
            Tailor-made journeys across Kashmir, Ladakh, Rajasthan &amp; beyond — crafted by
            award-winning local experts who know every hidden valley.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Plan My Trip
            </Button>
            <Button href="/packages" size="lg" variant="light">
              Browse Packages
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Trip-search / enquiry bar */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container pb-8">
          <TripSearch />
        </div>
      </div>
    </section>
  );
}
