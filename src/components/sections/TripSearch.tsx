"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { motion } from "framer-motion";
import { destinations } from "@/data/destinations";
import { Button } from "@/components/ui/Button";

export function TripSearch() {
  const router = useRouter();
  const [region, setRegion] = useState("");
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState("2");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (region) params.set("region", region);
    if (date) params.set("date", date);
    if (travellers) params.set("travellers", travellers);
    router.push(`/contact?${params.toString()}`);
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 gap-2 rounded-2xl bg-cloud/95 p-3 shadow-lift ring-1 ring-white/40 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-center"
    >
      <Field icon={<MapPin size={18} />} label="Destination">
        <select
          aria-label="Destination"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-ink outline-none"
        >
          <option value="">Where to?</option>
          {destinations.map((d) => (
            <option key={d.slug} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </Field>

      <Field icon={<Calendar size={18} />} label="When">
        <input
          type="date"
          aria-label="Travel date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-ink outline-none"
        />
      </Field>

      <Field icon={<Users size={18} />} label="Travellers">
        <select
          aria-label="Number of travellers"
          value={travellers}
          onChange={(e) => setTravellers(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-ink outline-none"
        >
          {["1", "2", "3", "4", "5", "6+"].map((n) => (
            <option key={n} value={n}>
              {n} {n === "1" ? "traveller" : "travellers"}
            </option>
          ))}
        </select>
      </Field>

      <Button type="submit" size="lg" className="w-full lg:w-auto">
        <Search size={18} /> Search
      </Button>
    </motion.form>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-ink/[0.03]">
      <span className="text-saffron-deep" aria-hidden>
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-ink/50">{label}</span>
        {children}
      </span>
    </label>
  );
}
