"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

export function StatusSelect({
  id,
  current,
  options,
  action,
}: {
  id: string;
  current: string;
  options: string[];
  action: (id: string, status: string) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [value, setValue] = useState(current);
  const [pending, start] = useTransition();

  return (
    <span className="inline-flex items-center gap-2">
      <select
        value={value}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value;
          setValue(next);
          start(async () => {
            const res = await action(id, next);
            if (!res.ok) setValue(current);
          });
        }}
        className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-medium capitalize outline-none focus:border-ink"
      >
        {options.map((o) => (
          <option key={o} value={o} className="capitalize">
            {o}
          </option>
        ))}
      </select>
      {pending && <Loader2 size={14} className="animate-spin text-ink/40" />}
    </span>
  );
}
