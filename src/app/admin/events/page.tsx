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
  { key: "blurb", label: "Description", type: "textarea", colSpan: 2 },
];

export default async function AdminEvents() {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("event_types").select("*").order("sort_order");

  return (
    <AdminPage>
      <AdminHeader title="Events" subtitle="Event types shown on the homepage band and /events." />
      <ContentManager
        table="event_types"
        fields={fields}
        rows={data ?? []}
        newDefaults={{ title: "New event type", slug: "", icon: "PartyPopper", blurb: "", published: true }}
        itemLabel="Event type"
      />
    </AdminPage>
  );
}
