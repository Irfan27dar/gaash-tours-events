import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AdminHeader, AdminPage } from "@/components/admin/ui";
import { ContentManager, type Field } from "@/components/admin/ContentManager";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "location", label: "Location", type: "text" },
  { key: "trip", label: "Trip", type: "text" },
  { key: "rating", label: "Rating (1–5)", type: "number" },
  { key: "quote", label: "Quote", type: "textarea", colSpan: 2 },
];

export default async function AdminTestimonials() {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("testimonials").select("*").order("sort_order");

  return (
    <AdminPage>
      <AdminHeader title="Testimonials" subtitle="Reviews shown on the homepage carousel." />
      <ContentManager
        table="testimonials"
        fields={fields}
        rows={data ?? []}
        newDefaults={{ name: "New traveller", location: "", trip: "", rating: 5, quote: "", published: true }}
        itemLabel="Testimonial"
      />
    </AdminPage>
  );
}
