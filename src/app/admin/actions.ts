"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Update an enquiry's status (new | contacted | won | lost). */
export async function updateEnquiryStatus(id: string, status: string) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
  return { ok: true };
}

/** Update a booking's status (pending | paid | cancelled | refunded). */
export async function updateBookingStatus(id: string, status: string) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
  return { ok: true };
}

export type PackagePatch = {
  price?: number;
  old_price?: number;
  discount_label?: string;
  badge?: string | null;
  featured?: boolean;
  bestseller?: boolean;
  published?: boolean;
};

/** Update editable fields on a package (price, flags, badge). */
export async function updatePackage(id: string, patch: PackagePatch) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("packages").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  revalidatePath("/");
  return { ok: true };
}
