"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Tables that admins may manage through the generic content manager.
const ALLOWED = new Set([
  "destinations",
  "activities",
  "services",
  "event_types",
  "testimonials",
]);

// Public paths to revalidate when a given table changes.
function pathsFor(table: string): string[] {
  const map: Record<string, string[]> = {
    destinations: ["/", "/destinations"],
    activities: ["/", "/activities"],
    services: ["/", "/services"],
    event_types: ["/", "/events"],
    testimonials: ["/"],
  };
  return map[table] ?? ["/"];
}

function guard(table: string) {
  if (!ALLOWED.has(table)) throw new Error("Table not allowed");
}

function revalidate(table: string) {
  pathsFor(table).forEach((p) => revalidatePath(p));
  revalidatePath(`/admin/${table === "event_types" ? "events" : table}`);
}

export async function updateContent(table: string, id: string, patch: Record<string, unknown>) {
  guard(table);
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from(table).update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidate(table);
  return { ok: true };
}

export async function createContent(table: string, values: Record<string, unknown>) {
  guard(table);
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from(table).insert(values).select("id").single();
  if (error) return { ok: false, error: error.message };
  revalidate(table);
  return { ok: true, id: data.id as string };
}

export async function deleteContent(table: string, id: string) {
  guard(table);
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidate(table);
  return { ok: true };
}
