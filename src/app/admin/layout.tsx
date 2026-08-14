import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Forces dynamic rendering (auth cookies).
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // When Supabase is unconfigured, or no session, render children bare
  // (the login page / setup notice). Middleware guarantees only /admin/login
  // is reachable while unauthenticated.
  let email: string | undefined;
  if (isSupabaseConfigured) {
    try {
      const supabase = createSupabaseServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      email = user?.email ?? undefined;
      if (!user) return <>{children}</>;
    } catch {
      return <>{children}</>;
    }
  } else {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-cloud lg:flex">
      <AdminNav email={email} />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
