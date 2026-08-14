"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Loader2, LogIn, AlertTriangle } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button } from "@/components/ui/Button";
import symbol from "../../../../public/brand/logo-symbol.png";

export default function AdminLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      router.replace(params.get("next") || "/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-cloud px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-lift">
        <div className="flex flex-col items-center text-center">
          <Image src={symbol} alt="Gaash" width={56} height={56} />
          <h1 className="mt-4 text-h3 font-display">Admin sign in</h1>
          <p className="mt-1 text-sm text-ink/55">Gaash Tours &amp; Events control panel</p>
        </div>

        {!isSupabaseConfigured ? (
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
            <p>
              Supabase isn&apos;t configured yet. Add your keys to <code>.env.local</code> and
              restart the server to enable admin sign-in.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <div>
              <label htmlFor="email" className="text-xs font-semibold text-ink/60">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-cloud px-4 py-3 text-sm outline-none focus:border-ink"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-semibold text-ink/60">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-cloud px-4 py-3 text-sm outline-none focus:border-ink"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" size="lg" disabled={loading} className="w-full">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
              Sign in
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
