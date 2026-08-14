"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="bg-saffron">
      <div className="container flex flex-col items-center gap-6 py-14 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-saffron">
          <Mail size={26} aria-hidden />
        </span>
        <div>
          <h2 className="text-h2 font-display text-ink">Travel inspiration, now and then</h2>
          <p className="mx-auto mt-2 max-w-md text-ink/70">
            Seasonal offers, new itineraries and Kashmir stories — no spam, unsubscribe anytime.
          </p>
        </div>

        {done ? (
          <p className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cloud">
            <Check size={18} className="text-saffron" /> You&apos;re subscribed — welcome aboard!
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@email.com"
              className="h-14 flex-1 rounded-full border border-ink/15 bg-cloud px-5 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-ink"
            />
            <Button type="submit" size="lg" variant="ink">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
