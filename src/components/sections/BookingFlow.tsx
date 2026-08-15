"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, ShieldCheck, Clock, Users, Lock, AlertTriangle } from "lucide-react";
import { bookingSchema, type BookingInput } from "@/lib/booking";
import { img, type ImageKey } from "@/lib/images";
import { inr, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const DEPOSIT_PERCENT = 20;

type PkgLite = {
  slug: string;
  title: string;
  image: ImageKey;
  route: string;
  durationLabel: string;
  price: number;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export function BookingFlow({ pkg }: { pkg: PkgLite }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { packageSlug: pkg.slug, travellers: 2, paymentOption: "full" },
  });

  const travellers = Number(watch("travellers")) || 1;
  const paymentOption = watch("paymentOption");
  const total = pkg.price * travellers;
  const deposit = Math.round((total * DEPOSIT_PERCENT) / 100);
  const payNow = paymentOption === "deposit" ? deposit : total;
  const balance = paymentOption === "deposit" ? total - deposit : 0;

  const fieldCls =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ink";
  const errCls = "mt-1 text-xs text-red-500";

  async function onSubmit(data: BookingInput) {
    setServerError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setServerError(json.error || "Could not start the booking. Please try again.");
        return;
      }

      const { order, bookingId, customer } = json;

      // Mock mode — no real gateway. Simulate a successful payment.
      if (order.mock) {
        await finishBooking(bookingId, order.orderId, `mock_pay_${Date.now()}`, "");
        return;
      }

      // Real Razorpay checkout.
      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) {
        setServerError("Couldn't load the payment window. Check your connection and retry.");
        return;
      }
      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: Math.round(order.amount * 100),
        currency: order.currency,
        name: "Gaash Tours & Events",
        description: pkg.title,
        prefill: { name: customer.name, email: customer.email, contact: customer.phone },
        theme: { color: "#FFD200" },
        handler: (r: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) =>
          finishBooking(bookingId, r.razorpay_order_id, r.razorpay_payment_id, r.razorpay_signature),
      });
      rzp.open();
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  async function finishBooking(bookingId: string, orderId: string, paymentId: string, signature: string) {
    const res = await fetch("/api/bookings/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, orderId, paymentId, signature }),
    });
    const json = await res.json();
    if (res.ok && json.ok) {
      router.push(`/booking/${json.bookingId}`);
    } else {
      setServerError("Payment could not be verified. If you were charged, contact us with your details.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="order-2 lg:order-1" noValidate>
        <input type="hidden" {...register("packageSlug")} />

        <h2 className="text-h3 font-display">Your details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="bf-name" className="text-xs font-semibold text-ink/60">Full name</label>
            <input id="bf-name" className={fieldCls} placeholder="Your name" {...register("name")} />
            {errors.name && <p className={errCls}>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="bf-email" className="text-xs font-semibold text-ink/60">Email</label>
            <input id="bf-email" type="email" className={fieldCls} placeholder="you@email.com" {...register("email")} />
            {errors.email && <p className={errCls}>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="bf-phone" className="text-xs font-semibold text-ink/60">Phone</label>
            <input id="bf-phone" className={fieldCls} placeholder="+91 …" {...register("phone")} />
            {errors.phone && <p className={errCls}>{errors.phone.message}</p>}
          </div>
          <div>
            <label htmlFor="bf-date" className="text-xs font-semibold text-ink/60">Travel date</label>
            <input id="bf-date" type="date" className={fieldCls} {...register("travelDate")} />
          </div>
          <div>
            <label htmlFor="bf-travellers" className="text-xs font-semibold text-ink/60">Travellers</label>
            <input id="bf-travellers" type="number" min={1} max={30} className={fieldCls} {...register("travellers")} />
            {errors.travellers && <p className={errCls}>{errors.travellers.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="bf-notes" className="text-xs font-semibold text-ink/60">Notes (optional)</label>
            <textarea id="bf-notes" rows={2} className={fieldCls} placeholder="Anything we should know?" {...register("notes")} />
          </div>
        </div>

        <h2 className="mt-8 text-h3 font-display">Payment</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <PayOption
            label="Pay in full"
            desc="Confirm your seat instantly"
            amount={inr(total)}
            checked={paymentOption === "full"}
            value="full"
            register={register}
          />
          <PayOption
            label={`Pay ${DEPOSIT_PERCENT}% deposit`}
            desc="Reserve now, balance later"
            amount={inr(deposit)}
            checked={paymentOption === "deposit"}
            value="deposit"
            register={register}
          />
        </div>

        {serverError && (
          <p className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            <AlertTriangle size={16} /> {serverError}
          </p>
        )}

        <Button type="submit" size="lg" disabled={isSubmitting} className="mt-6 w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Processing…
            </>
          ) : (
            <>
              <Lock size={16} /> Pay {inr(payNow)} &amp; book
            </>
          )}
        </Button>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink/60">
          <ShieldCheck size={14} /> Secure checkout. Your details are encrypted.
        </p>
      </form>

      {/* Summary */}
      <aside className="order-1 h-fit rounded-2xl border border-line bg-white p-6 shadow-soft lg:order-2 lg:sticky lg:top-24">
        <div className="flex gap-4">
          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
            <Image src={img(pkg.image)} alt={pkg.title} fill sizes="96px" placeholder="blur" className="object-cover" />
          </div>
          <div>
            <h3 className="font-display font-semibold leading-tight">{pkg.title}</h3>
            <p className="mt-1 text-xs text-ink/60">{pkg.route}</p>
          </div>
        </div>

        <ul className="mt-4 space-y-2 border-y border-line py-4 text-sm text-ink/70">
          <li className="flex items-center gap-2">
            <Clock size={15} className="text-saffron-deep" /> {pkg.durationLabel}
          </li>
          <li className="flex items-center gap-2">
            <Users size={15} className="text-saffron-deep" /> {travellers} traveller{travellers > 1 ? "s" : ""}
          </li>
        </ul>

        <dl className="mt-4 space-y-2 text-sm">
          <Row label={`${inr(pkg.price)} × ${travellers}`} value={inr(total)} />
          {paymentOption === "deposit" && (
            <>
              <Row label={`Deposit (${DEPOSIT_PERCENT}%)`} value={inr(deposit)} strong />
              <Row label="Balance later" value={inr(balance)} muted />
            </>
          )}
          <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
            <dt className="font-semibold">Pay now</dt>
            <dd className="text-xl font-display font-bold text-ink">{inr(payNow)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-[0.7rem] italic text-ink/60">
          Indicative pricing — a travel expert confirms the final quote after booking.
        </p>
      </aside>
    </div>
  );
}

function Row({ label, value, strong, muted }: { label: string; value: string; strong?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={cn("text-ink/60", muted && "text-ink/60")}>{label}</dt>
      <dd className={cn(strong ? "font-semibold" : "", muted && "text-ink/60")}>{value}</dd>
    </div>
  );
}

function PayOption({
  label,
  desc,
  amount,
  checked,
  value,
  register,
}: {
  label: string;
  desc: string;
  amount: string;
  checked: boolean;
  value: string;
  register: ReturnType<typeof useForm<BookingInput>>["register"];
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer flex-col rounded-xl border p-4 transition-colors",
        checked ? "border-ink bg-ink/[0.03]" : "border-line hover:border-ink/30"
      )}
    >
      <span className="flex items-center justify-between">
        <span className="font-semibold">{label}</span>
        <input type="radio" value={value} className="accent-ink" {...register("paymentOption")} />
      </span>
      <span className="mt-0.5 text-xs text-ink/60">{desc}</span>
      <span className="mt-2 text-lg font-display font-bold">{amount}</span>
    </label>
  );
}
