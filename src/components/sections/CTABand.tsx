import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { EnquiryForm } from "./EnquiryForm";

export function CTABand() {
  return (
    <section id="enquire" className="bg-ink text-cloud">
      <div className="container grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <Reveal>
          <span className="eyebrow text-saffron">Ready when you are</span>
          <h2 className="mt-3 text-h1 font-display">Ready to plan your journey?</h2>
          <p className="mt-4 max-w-md text-lead text-cloud/75">
            Tell us a little about your trip and a local expert will build a tailor-made itinerary,
            free of charge. No obligation, no pressure — just good advice.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.whatsapp.href} size="lg" className="bg-[#25D366] text-white hover:shadow-glow">
              <MessageCircle size={18} /> WhatsApp us
            </Button>
            <Button href={`tel:+91${site.phones[0]}`} size="lg" variant="light">
              <Phone size={18} /> +91 {site.phones[0]}
            </Button>
          </div>

          <p className="mt-6 text-sm text-cloud/50">
            Open daily {site.hours} · Offices in Srinagar &amp; Kolkata
          </p>
        </Reveal>

        <Reveal delay={0.1} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <EnquiryForm tone="dark" />
        </Reveal>
      </div>
    </section>
  );
}
