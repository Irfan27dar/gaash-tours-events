import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { iconNames } from "@/lib/icons";
import { AdminHeader, AdminPage } from "@/components/admin/ui";
import { ContentManager, type Field } from "@/components/admin/ContentManager";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "slug", label: "Slug (URL id)", type: "text" },
  { key: "icon", label: "Icon", type: "select", options: iconNames },
  { key: "benefit", label: "Benefit", type: "textarea", colSpan: 2 },
];

export default async function AdminServices() {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("services").select("*").order("sort_order");

  return (
    <AdminPage>
      <AdminHeader title="Services" subtitle="Services shown on the homepage and /services." />
      <ContentManager
        table="services"
        fields={fields}
        rows={data ?? []}
        newDefaults={{ title: "New service", slug: "", icon: "Sparkles", benefit: "", published: true }}
        itemLabel="Service"
      />
    </AdminPage>
  );
}
