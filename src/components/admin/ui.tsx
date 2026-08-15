import { cn } from "@/lib/utils";

export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-display font-bold text-ink">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-ink/60">{subtitle}</p>}
    </div>
  );
}

export function AdminPage({ children }: { children: React.ReactNode }) {
  return <div className="p-5 lg:p-8">{children}</div>;
}

export function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">{label}</p>
      <p className="mt-2 text-3xl font-display font-bold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink/60">{hint}</p>}
    </div>
  );
}

const statusStyles: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  won: "bg-green-100 text-green-700",
  lost: "bg-gray-200 text-gray-600",
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
  refunded: "bg-gray-200 text-gray-600",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold capitalize", statusStyles[status] ?? "bg-gray-100 text-gray-600")}>
      {status}
    </span>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center text-ink/60">
      {message}
    </div>
  );
}
