import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { nav, site, certifications, paymentMethods } from "@/data/site";

const socials = [
  { icon: Facebook, ...site.social.facebook, label: "Facebook" },
  { icon: Instagram, ...site.social.instagram, label: "Instagram" },
  { icon: Twitter, ...site.social.twitter, label: "Twitter / X" },
  { icon: Youtube, ...site.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cloud">
      <div className="container grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        {/* Brand + contact */}
        <div className="lg:col-span-4">
          <Logo variant="dark" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cloud/70">{site.description}</p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cloud/80 transition-colors hover:border-saffron hover:text-saffron"
              >
                <Icon size={18} aria-hidden />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-cloud/50">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cloud/75 transition-colors hover:text-saffron">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Offices */}
        <div className="space-y-6 lg:col-span-4">
          {[site.offices.head, site.offices.branch].map((office) => (
            <div key={office.label}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-cloud/50">
                {office.label}
              </h3>
              <p className="mt-3 flex items-start gap-2.5 text-sm text-cloud/75">
                <MapPin size={16} className="mt-0.5 shrink-0 text-saffron" aria-hidden />
                <span>{office.full}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Reach us */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-cloud/50">Reach us</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.phones.map((p) => (
              <li key={p}>
                <a href={`tel:+91${p}`} className="flex items-center gap-2 text-cloud/75 hover:text-saffron">
                  <Phone size={14} className="text-saffron" aria-hidden /> +91 {p}
                </a>
              </li>
            ))}
            {site.emails.map((e) => (
              <li key={e}>
                <a href={`mailto:${e}`} className="flex items-center gap-2 break-all text-cloud/75 hover:text-saffron">
                  <Mail size={14} className="shrink-0 text-saffron" aria-hidden /> {e}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Certifications + payments */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-6 py-7 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-cloud/40">Recognised by</span>
            {certifications.map((c) => (
              <span
                key={c.code}
                title={c.note}
                className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-cloud/80"
              >
                {c.label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-cloud/40">We accept</span>
            {paymentMethods.map((m) => (
              <span
                key={m}
                className="rounded-md bg-white/10 px-2.5 py-1 text-[0.7rem] font-medium text-cloud/80"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-6 text-xs text-cloud/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            Local Kashmiri experts since {site.established} · A{" "}
            <a
              href={site.eventsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cloud/70 underline hover:text-saffron"
            >
              Gaash Events
            </a>{" "}
            company
          </p>
        </div>
      </div>
    </footer>
  );
}
