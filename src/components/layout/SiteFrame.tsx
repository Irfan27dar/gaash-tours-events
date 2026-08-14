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
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
