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
  { key: "where_at", label: "Where", type: "text" },
  { key: "season", label: "Season", type: "text" },
  { key: "blurb", label: "Description", type: "textarea", colSpan: 2 },
];

export default async function AdminActivities() {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("activities").select("*").order("sort_order");

  return (
    <AdminPage>
      <AdminHeader title="Activities" subtitle="Experiences shown on the homepage and /activities." />
      <ContentManager
        table="activities"
        fields={fields}
        rows={data ?? []}
        newDefaults={{ title: "New activity", slug: "", icon: "Sparkles", where_at: "", season: "", blurb: "", published: true }}
        itemLabel="Activity"
      />
    </AdminPage>
  );
}
