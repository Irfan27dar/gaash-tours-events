"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { createContent, updateContent, deleteContent } from "@/app/admin/content-actions";
import { cn } from "@/lib/utils";

export type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "boolean";
  options?: string[];
  placeholder?: string;
  colSpan?: 1 | 2;
};

type Row = Record<string, unknown> & { id: string; published?: boolean };

export function ContentManager({
  table,
  fields,
  rows: initialRows,
  newDefaults,
  itemLabel,
}: {
  table: string;
  fields: Field[];
  rows: Row[];
  newDefaults: Record<string, unknown>;
  itemLabel: string;
}) {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [adding, start] = useTransition();

  function addNew() {
    const defaults = { ...newDefaults };
    // Unique slug placeholder for tables that use one.
    if ("slug" in defaults) defaults.slug = `new-${itemLabel.toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString(36)}`;
    start(async () => {
      const res = await createContent(table, defaults);
      if (res.ok && res.id) setRows((r) => [{ id: res.id, ...defaults } as Row, ...r]);
    });
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={addNew}
          disabled={adding}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cloud hover:bg-ink-soft"
        >
          {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Add {itemLabel}
        </button>
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <ContentRow
            key={row.id}
            table={table}
            fields={fields}
            row={row}
            onDelete={() => setRows((r) => r.filter((x) => x.id !== row.id))}
          />
        ))}
        {rows.length === 0 && (
          <p className="rounded-2xl border border-dashed border-line bg-white p-10 text-center text-ink/50">
            No {itemLabel.toLowerCase()}s yet — add one above.
          </p>
        )}
      </div>
    </div>
  );
}

function ContentRow({
  table,
  fields,
  row,
  onDelete,
}: {
  table: string;
  fields: Field[];
  row: Row;
  onDelete: () => void;
}) {
  const [values, setValues] = useState<Row>(row);
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();
  const [deleting, startDelete] = useTransition();
  const published = values.published !== false;

  function set(key: string, val: unknown) {
    setValues((v) => ({ ...v, [key]: val }));
    setSaved(false);
  }

  function save() {
    const patch: Record<string, unknown> = {};
    fields.forEach(
      (f) =>
        (patch[f.key] =
          values[f.key] ?? (f.type === "number" ? 0 : f.type === "boolean" ? false : ""))
    );
    patch.published = published;
    start(async () => {
      const res = await updateContent(table, values.id, patch);
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    });
  }

  function remove() {
    if (!confirm("Delete this item? This can't be undone.")) return;
    startDelete(async () => {
      const res = await deleteContent(table, values.id);
      if (res.ok) onDelete();
    });
  }

  const input =
    "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-ink";

  return (
    <div className={cn("rounded-2xl border border-line bg-white p-5 shadow-soft", !published && "opacity-70")}>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className={f.colSpan === 2 || f.type === "textarea" ? "sm:col-span-2" : ""}>
            <label className="text-xs font-semibold text-ink/55">{f.label}</label>
            {f.type === "boolean" ? (
              <label className="mt-1 flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-ink"
                  checked={Boolean(values[f.key])}
                  onChange={(e) => set(f.key, e.target.checked)}
                />
                {Boolean(values[f.key]) ? "Yes" : "No"}
              </label>
            ) : f.type === "textarea" ? (
              <textarea
                rows={2}
                className={input}
                placeholder={f.placeholder}
                value={String(values[f.key] ?? "")}
                onChange={(e) => set(f.key, e.target.value)}
              />
            ) : f.type === "select" ? (
              <select className={input} value={String(values[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)}>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type === "number" ? "number" : "text"}
                className={input}
                placeholder={f.placeholder}
                value={String(values[f.key] ?? "")}
                onChange={(e) => set(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <button
          onClick={() => set("published", !published)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
            published ? "border-green-300 bg-green-50 text-green-700" : "border-line bg-cloud text-ink/50"
          )}
        >
          {published ? <Eye size={13} /> : <EyeOff size={13} />} {published ? "Live" : "Hidden"}
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={remove}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} Delete
          </button>
          <button
            onClick={save}
            disabled={pending}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors",
              saved ? "bg-green-600 text-white" : "bg-ink text-cloud hover:bg-ink-soft"
            )}
          >
            {pending ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : null}
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
