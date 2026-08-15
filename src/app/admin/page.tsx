import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AdminHeader, AdminPage, StatCard, StatusPill, EmptyState } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = createSupabaseServerClient();

  const [enq, newEnq, bookings, paidBookings, packages, recent] = await Promise.all([
    supabase.from("enquiries").select("id", { count: "exact", head: true }),
    supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("bookings").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("amount").eq("status", "paid"),
    supabase.from("packages").select("id", { count: "exact", head: true }),
    supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const revenue = (paidBookings.data ?? []).reduce((s, b: { amount: number }) => s + (b.amount ?? 0), 0);

  return (
    <AdminPage>
      <AdminHeader title="Dashboard" subtitle="Your Gaash Tours & Events at a glance" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Enquiries" value={enq.count ?? 0} hint={`${newEnq.count ?? 0} new`} />
        <StatCard label="Bookings" value={bookings.count ?? 0} hint={`${paidBookings.data?.length ?? 0} paid`} />
        <StatCard label="Revenue (paid)" value={`₹${revenue.toLocaleString("en-IN")}`} />
        <StatCard label="Packages" value={packages.count ?? 0} hint="live on site" />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Recent enquiries</h2>
          <Link href="/admin/enquiries" className="text-sm font-semibold text-saffron-deep hover:underline">
            View all →
          </Link>
        </div>

        {recent.data && recent.data.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
            <table className="w-full text-sm">
              <thead className="bg-cloud text-left text-xs uppercase tracking-wider text-ink/60">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Destination</th>
                  <th className="hidden p-3 sm:table-cell">Contact</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.data.map((e: any) => (
                  <tr key={e.id} className="border-t border-line">
                    <td className="p-3 font-medium">{e.name}</td>
                    <td className="p-3 text-ink/70">{e.destination ?? "—"}</td>
                    <td className="hidden p-3 text-ink/70 sm:table-cell">{e.phone}</td>
                    <td className="p-3">
                      <StatusPill status={e.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState message="No enquiries yet — they'll appear here as they come in." />
        )}
      </div>
    </AdminPage>
  );
}
