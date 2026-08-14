"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, Star } from "lucide-react";
import { updatePackage } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

type Pkg = {
  id: string;
  title: string;
  region: string;
  price: number;
  old_price: number;
  badge: string | null;
  featured: boolean;
  bestseller: boolean;
  published: boolean;
};

const badges = ["", "Bestseller", "Popular", "New"];

export function PackageEditRow({ pkg }: { pkg: Pkg }) {
  const [price, setPrice] = useState(pkg.price);
  const [oldPrice, setOldPrice] = useState(pkg.old_price);
  const [badge, setBadge] = useState(pkg.badge ?? "");
  const [featured, setFeatured] = useState(pkg.featured);
  const [bestseller, setBestseller] = useState(pkg.bestseller);
  const [published, setPublished] = useState(pkg.published);
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();

  function save() {
    setSaved(false);
    start(async () => {
      const res = await updatePackage(pkg.id, {
        price,
        old_price: oldPrice,
        badge: badge || null,
        featured,
        bestseller,
        published,
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    });
  }

  return (
    <tr className="border-t border-line align-middle">
      <td className="p-3">
        <p className="font-medium">{pkg.title}</p>
        <p className="text-xs text-ink/50">{pkg.region}</p>
      </td>
      <td className="p-3">
        <label className="flex items-center gap-1 text-sm">
          <span className="text-ink/40">₹</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-24 rounded-lg border border-line px-2 py-1.5 outline-none focus:border-ink"
          />
        </label>
      </td>
      <td className="p-3">
        <label className="flex items-center gap-1 text-sm">
          <span className="text-ink/40">₹</span>
          <input
            type="number"
            value={oldPrice}
            onChange={(e) => setOldPrice(Number(e.target.value))}
            className="w-24 rounded-lg border border-line px-2 py-1.5 text-ink/60 outline-none focus:border-ink"
          />
        </label>
      </td>
      <td className="p-3">
        <select
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          className="rounded-lg border border-line px-2 py-1.5 text-sm outline-none focus:border-ink"
        >
          {badges.map((b) => (
            <option key={b} value={b}>
              {b || "—"}
            </option>
          ))}
        </select>
      </td>
      <td className="p-3">
        <div className="flex flex-wrap gap-1.5">
          <Toggle active={featured} onClick={() => setFeatured((v) => !v)} label="Featured" />
          <Toggle active={bestseller} onClick={() => setBestseller((v) => !v)} label="Bestseller" icon />
          <Toggle active={published} onClick={() => setPublished((v) => !v)} label="Live" />
        </div>
      </td>
      <td className="p-3">
        <button
          onClick={save}
          disabled={pending}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors",
            saved ? "bg-green-600 text-white" : "bg-ink text-cloud hover:bg-ink-soft"
          )}
        >
          {pending ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : null}
          {saved ? "Saved" : "Save"}
        </button>
      </td>
    </tr>
  );
}

function Toggle({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
        active ? "border-saffron bg-saffron text-ink" : "border-line bg-white text-ink/50"
      )}
    >
      {icon && <Star size={11} className={active ? "fill-ink" : ""} />}
      {label}
    </button>
  );
}
