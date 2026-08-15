"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Subtle route-change fade/slide. Keyed on pathname so it re-runs per navigation.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.main
      id="main-content"
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
