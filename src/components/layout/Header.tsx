"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Transparent over hero on the homepage; solid elsewhere or after scroll.
  const solid = scrolled || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth",
        solid
          ? "border-b border-line bg-cloud/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between lg:h-20">
        <Logo variant={solid ? "light" : "dark"} />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-underline text-sm font-medium transition-colors",
                  solid ? "text-ink/80 hover:text-ink" : "text-white/90 hover:text-white",
                  active && (solid ? "text-ink" : "text-white")
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:+91${site.phones[0]}`}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium",
              solid ? "text-ink/80 hover:text-ink" : "text-white/90 hover:text-white"
            )}
          >
            <Phone size={16} aria-hidden />
            <span>+91 {site.phones[0]}</span>
          </a>
          <Button href="/contact" size="sm" variant={solid ? "primary" : "light"}>
            Plan My Trip
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full",
              solid ? "text-ink" : "text-white"
            )}
          >
            <MessageCircle size={20} aria-hidden />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full",
              solid ? "text-ink" : "text-white"
            )}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden"
          >
            <div className="container border-t border-line bg-cloud pb-6 pt-2">
              <nav className="flex flex-col" aria-label="Mobile">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b border-line py-3.5 text-base font-medium text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-5 flex flex-col gap-3">
                <Button href="/contact" size="lg" className="w-full">
                  Plan My Trip
                </Button>
                <Button href={`tel:+91${site.phones[0]}`} size="lg" variant="outline" className="w-full">
                  <Phone size={18} /> Call +91 {site.phones[0]}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
