import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AdminHeader, AdminPage, EmptyState } from "@/components/admin/ui";
import { PackageEditRow } from "@/components/admin/PackageEditRow";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("packages")
    .select("id,title,region,price,old_price,badge,featured,bestseller,published")
    .order("sort_order", { ascending: true });
  const rows = data ?? [];

  return (
    <AdminPage>
      <AdminHeader
        title="Packages"
        subtitle="Edit prices and flags — changes go live on the site immediately."
      />

      {rows.length === 0 ? (
        <EmptyState message="No packages found. Run `npm run seed` to load the initial catalog." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-soft">
          <table className="w-full min-w-[860px] text-sm">
            <thead className="bg-cloud text-left text-xs uppercase tracking-wider text-ink/60">
              <tr>
                <th className="p-3">Package</th>
                <th className="p-3">Price</th>
                <th className="p-3">Was</th>
                <th className="p-3">Badge</th>
                <th className="p-3">Flags</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p: any) => (
                <PackageEditRow key={p.id} pkg={p} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminPage>
  );
}
