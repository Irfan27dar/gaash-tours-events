import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { PageTransition } from "@/components/layout/PageTransition";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaashtoursandevent.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.headline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Kashmir tour packages",
    "Ladakh tour",
    "Rajasthan tour",
    "Himachal packages",
    "Srinagar travel agency",
    "Gaash Tours",
    "houseboat stay Kashmir",
  ],
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.headline}`,
    description: site.description,
    url: siteUrl,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.headline}`,
    description: site.description,
  },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: "#141414",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.legalName,
    url: siteUrl,
    description: site.description,
    telephone: `+91${site.phones[0]}`,
    email: site.emails[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.offices.head.line,
      addressLocality: "Srinagar",
      addressRegion: "Jammu & Kashmir",
      postalCode: site.offices.head.pin,
      addressCountry: "IN",
    },
    sameAs: [
      site.social.facebook.href,
      site.social.instagram.href,
      site.social.twitter.href,
      site.social.youtube.href,
    ],
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
