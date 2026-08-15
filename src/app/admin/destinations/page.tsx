import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { imageKeys } from "@/lib/images";
import { AdminHeader, AdminPage } from "@/components/admin/ui";
import { ContentManager, type Field } from "@/components/admin/ContentManager";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "slug", label: "Slug (URL id)", type: "text" },
  { key: "region", label: "Region", type: "text" },
  { key: "image", label: "Cover image", type: "select", options: imageKeys },
  { key: "tagline", label: "Tagline", type: "text" },
  { key: "from_price", label: "From price (₹)", type: "number" },
  { key: "best_time", label: "Best time", type: "text" },
  { key: "ideal_days", label: "Ideal duration", type: "text" },
  { key: "featured", label: "Featured on homepage", type: "boolean" },
  { key: "rating", label: "Rating", type: "number" },
  { key: "blurb", label: "Description", type: "textarea", colSpan: 2 },
];

export default async function AdminDestinations() {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("destinations").select("*").order("sort_order");

  return (
    <AdminPage>
      <AdminHeader
        title="Destinations"
        subtitle="Highlights, gallery & experiences keep their existing values; edit the key fields here."
      />
      <ContentManager
        table="destinations"
        fields={fields}
        rows={data ?? []}
        newDefaults={{
          name: "New destination",
          slug: "",
          region: "Kashmir",
          image: "hero",
          tagline: "",
          from_price: 0,
          best_time: "",
          ideal_days: "",
          featured: false,
          rating: 4.8,
          blurb: "",
          published: true,
        }}
        itemLabel="Destination"
      />
    </AdminPage>
  );
}
