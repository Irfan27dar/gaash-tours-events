import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle, User } from "lucide-react";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact & Plan Your Trip",
  description:
    "Talk to a Gaash travel expert. Offices in Srinagar and Kolkata, on WhatsApp, phone and email — we reply within hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="We'd love to hear from you"
        title="Plan your trip with a local expert"
        intro="Tell us your dates and dreams — we'll craft a tailor-made itinerary, free of charge."
        image="dal-lake"
        crumbs={[{ label: "Contact" }]}
      />

      <section className="bg-cloud py-16 lg:py-24">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Details */}
          <div className="space-y-8">
            <Reveal className="rounded-2xl bg-white p-6 shadow-soft">
              <div className="flex flex-wrap gap-3">
                <a
                  href={site.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <a
                  href={`tel:+91${site.phones[0]}`}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cloud"
                >
                  <Phone size={18} /> Call now
                </a>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {site.phones.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <Phone size={16} className="text-saffron-deep" aria-hidden />
                    <a href={`tel:+91${p}`} className="hover:text-saffron-deep">
                      +91 {p}
                    </a>
                  </li>
                ))}
                {site.emails.map((e) => (
                  <li key={e} className="flex items-center gap-3">
                    <Mail size={16} className="text-saffron-deep" aria-hidden />
                    <a href={`mailto:${e}`} className="break-all hover:text-saffron-deep">
                      {e}
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-3">
                  <Clock size={16} className="text-saffron-deep" aria-hidden />
                  Open daily {site.hours}
                </li>
              </ul>
            </Reveal>

            {[site.offices.head, site.offices.branch].map((office) => (
              <Reveal key={office.label} className="rounded-2xl bg-white p-6 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <MapPin size={18} className="text-saffron-deep" aria-hidden /> {office.label}
                </h2>
                <p className="mt-2 text-sm text-ink/70">{office.full}</p>
                {"head" in office && office.head && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-ink/70">
                    <User size={15} className="text-saffron-deep" aria-hidden /> {office.head} ·{" "}
                    <a href={`tel:+91${office.phone}`} className="hover:text-saffron-deep">
                      +91 {office.phone}
                    </a>
                  </p>
                )}
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(office.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-saffron-deep hover:underline"
                >
                  View on map →
                </a>
              </Reveal>
            ))}
          </div>

          {/* Form */}
          <Reveal delay={0.1} className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
            <h2 className="text-h3 font-display">Send an enquiry</h2>
            <p className="mt-1 text-sm text-ink/60">
              A travel expert will get back to you within a few hours.
            </p>
            <div className="mt-6">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
