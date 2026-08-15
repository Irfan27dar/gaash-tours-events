import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AdminHeader, AdminPage, StatusPill, EmptyState } from "@/components/admin/ui";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { updateBookingStatus } from "../actions";

export const dynamic = "force-dynamic";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function BookingsPage() {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
  const rows = data ?? [];

  return (
    <AdminPage>
      <AdminHeader title="Bookings" subtitle={`${rows.length} total`} />

      {rows.length === 0 ? (
        <EmptyState message="No bookings yet — they'll appear here once the payment flow is live." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-soft">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-cloud text-left text-xs uppercase tracking-wider text-ink/60">
              <tr>
                <th className="p-3">Ref</th>
                <th className="p-3">Booked</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Trip</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b: any) => (
                <tr key={b.id} className="border-t border-line align-top">
                  <td className="whitespace-nowrap p-3 font-mono text-xs font-semibold">{b.reference}</td>
                  <td className="whitespace-nowrap p-3 text-ink/60">{fmtDate(b.created_at)}</td>
                  <td className="p-3">
                    <span className="font-medium">{b.customer_name}</span>
                    <span className="block text-xs text-ink/60">{b.phone}</span>
                  </td>
                  <td className="p-3 text-ink/70">
                    {b.package_title || "—"}
                    {b.travel_date && <span className="block text-xs text-ink/60">{fmtDate(b.travel_date)}</span>}
                  </td>
                  <td className="whitespace-nowrap p-3 font-semibold">₹{(b.amount ?? 0).toLocaleString("en-IN")}</td>
                  <td className="p-3">
                    <div className="flex flex-col items-start gap-1.5">
                      <StatusPill status={b.status} />
                      <StatusSelect
                        id={b.id}
                        current={b.status}
                        options={["pending", "paid", "cancelled", "refunded"]}
                        action={updateBookingStatus}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminPage>
  );
}
