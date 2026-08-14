"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { destinations } from "@/data/destinations";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function EnquiryForm({
  defaultDestination = "",
  packageSlug,
  packageTitle,
  tone = "light",
}: {
  defaultDestination?: string;
  packageSlug?: string;
  packageTitle?: string;
  tone?: "light" | "dark";
}) {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { destination: defaultDestination, packageSlug, travellers: "2" },
  });

  async function onSubmit(data: EnquiryInput) {
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, packageTitle }),
      });
      if (res.ok) setDone(true);
    } catch {
      /* handled by the disabled state; user can retry */
    }
  }

  const dark = tone === "dark";
  const fieldBase = cn(
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors",
    dark
      ? "border-white/15 bg-white/10 text-cloud placeholder:text-cloud/50 focus:border-saffron"
      : "border-line bg-white text-ink placeholder:text-ink/40 focus:border-ink"
  );
  const labelBase = cn("text-xs font-semibold", dark ? "text-cloud/70" : "text-ink/60");
  const errBase = "mt-1 text-xs text-red-400";

  if (done) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl p-10 text-center",
          dark ? "bg-white/10 text-cloud" : "bg-white shadow-soft"
        )}
      >
        <CheckCircle2 size={44} className="text-saffron" />
        <h3 className="mt-4 text-h3 font-display">Thank you!</h3>
        <p className={cn("mt-2 max-w-sm text-sm", dark ? "text-cloud/70" : "text-ink/60")}>
          Your enquiry is in. A Gaash travel expert will reach out within a few hours — often much
          sooner on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      {packageTitle && (
        <p className={cn("text-sm", dark ? "text-cloud/70" : "text-ink/60")}>
          Enquiring about <span className="font-semibold text-saffron-deep">{packageTitle}</span>
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelBase} htmlFor="name">
            Full name
          </label>
          <input id="name" className={fieldBase} placeholder="Your name" {...register("name")} />
          {errors.name && <p className={errBase}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelBase} htmlFor="phone">
            Phone
          </label>
          <input id="phone" className={fieldBase} placeholder="+91 …" {...register("phone")} />
          {errors.phone && <p className={errBase}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelBase} htmlFor="email">
            Email
          </label>
          <input id="email" type="email" className={fieldBase} placeholder="you@email.com" {...register("email")} />
          {errors.email && <p className={errBase}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelBase} htmlFor="destination">
            Destination
          </label>
          <select id="destination" className={fieldBase} {...register("destination")}>
            <option value="">Choose…</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.name}>
                {d.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
          {errors.destination && <p className={errBase}>{errors.destination.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelBase} htmlFor="date">
            Preferred date
          </label>
          <input id="date" type="date" className={fieldBase} {...register("date")} />
        </div>
        <div>
          <label className={labelBase} htmlFor="travellers">
            Travellers
          </label>
          <select id="travellers" className={fieldBase} {...register("travellers")}>
            {["1", "2", "3", "4", "5", "6+"].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelBase} htmlFor="message">
          Tell us about your dream trip
        </label>
        <textarea
          id="message"
          rows={3}
          className={fieldBase}
          placeholder="Dates, budget, must-sees, anything…"
          {...register("message")}
        />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={18} /> Send enquiry
          </>
        )}
      </Button>
    </form>
  );
}
