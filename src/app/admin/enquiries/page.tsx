import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AdminHeader, AdminPage, StatusPill, EmptyState } from "@/components/admin/ui";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { updateEnquiryStatus } from "../actions";

export const dynamic = "force-dynamic";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function EnquiriesPage() {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
  const rows = data ?? [];

  return (
    <AdminPage>
      <AdminHeader title="Enquiries" subtitle={`${rows.length} total`} />

      {rows.length === 0 ? (
        <EmptyState message="No enquiries yet." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-soft">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-cloud text-left text-xs uppercase tracking-wider text-ink/50">
              <tr>
                <th className="p-3">Received</th>
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Interest</th>
                <th className="p-3">Message</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e: any) => (
                <tr key={e.id} className="border-t border-line align-top">
                  <td className="whitespace-nowrap p-3 text-ink/60">{fmtDate(e.created_at)}</td>
                  <td className="p-3 font-medium">{e.name}</td>
                  <td className="p-3 text-ink/70">
                    <a href={`tel:+91${e.phone}`} className="block hover:text-saffron-deep">
                      {e.phone}
                    </a>
                    <a href={`mailto:${e.email}`} className="block text-xs text-ink/50 hover:text-saffron-deep">
                      {e.email}
                    </a>
                  </td>
                  <td className="p-3 text-ink/70">
                    {e.package_title || e.destination || "—"}
                    {e.travel_date && <span className="block text-xs text-ink/45">{fmtDate(e.travel_date)}</span>}
                    {e.travellers && <span className="block text-xs text-ink/45">{e.travellers} travellers</span>}
                  </td>
                  <td className="max-w-[16rem] p-3 text-xs text-ink/60">{e.message || "—"}</td>
                  <td className="p-3">
                    <div className="flex flex-col items-start gap-1.5">
                      <StatusPill status={e.status} />
                      <StatusSelect
                        id={e.id}
                        current={e.status}
                        options={["new", "contacted", "won", "lost"]}
                        action={updateEnquiryStatus}
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
