"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  CalendarCheck,
  Package,
  MapPin,
  Compass,
  Sparkles,
  PartyPopper,
  Quote,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/destinations", label: "Destinations", icon: MapPin },
  { href: "/admin/activities", label: "Activities", icon: Compass },
  { href: "/admin/services", label: "Services", icon: Sparkles },
  { href: "/admin/events", label: "Events", icon: PartyPopper },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
];

export function AdminNav({ email }: { email?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-white/10 bg-ink text-cloud lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between p-5 lg:block">
        <div>
          <p className="font-display text-xl font-bold text-saffron">Gaash</p>
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-cloud/50">Admin</p>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:mt-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {links.map((l) => {
          const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-saffron text-ink" : "text-cloud/70 hover:bg-white/5 hover:text-cloud"
              )}
            >
              <l.icon size={18} aria-hidden />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden border-t border-white/10 p-4 lg:block">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-2 py-2 text-sm text-cloud/60 hover:text-cloud"
        >
          <ExternalLink size={16} /> View site
        </Link>
        {email && <p className="truncate px-2 pt-2 text-xs text-cloud/40">{email}</p>}
        <button
          onClick={signOut}
          className="mt-2 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm text-cloud/70 hover:bg-white/5 hover:text-cloud"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>

      <button
        onClick={signOut}
        className="flex items-center gap-2 px-5 py-3 text-sm text-cloud/70 lg:hidden"
      >
        <LogOut size={16} /> Sign out
      </button>
    </aside>
  );
}
