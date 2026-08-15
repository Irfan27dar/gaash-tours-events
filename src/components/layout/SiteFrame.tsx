"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { PageTransition } from "./PageTransition";

/** Public site chrome — hidden on /admin so the panel stands alone. */
export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cloud"
      >
        Skip to content
      </a>
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
