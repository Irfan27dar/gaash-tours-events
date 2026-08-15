/**
 * Verify the Supabase connection + report row counts per table.
 *   npm run check-db
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* ignore */
  }
}
loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("✖ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });
const tables = [
  "destinations",
  "packages",
  "activities",
  "services",
  "event_types",
  "testimonials",
  "enquiries",
  "bookings",
];

async function main() {
  console.log(`Connected to ${url}\n`);
  let missing = false;
  for (const t of tables) {
    const { count, error } = await supabase.from(t).select("*", { count: "exact", head: true });
    if (error) {
      console.log(`  ✖ ${t.padEnd(14)} ${error.message}`);
      missing = true;
    } else {
      console.log(`  ✓ ${t.padEnd(14)} ${count ?? 0} rows`);
    }
  }
  if (missing) {
    console.log("\nSome tables are missing — run the migration SQL first (supabase/migrations/0001_init.sql).");
    process.exit(1);
  }
  console.log("\nAll tables present. If content counts are 0, run `npm run seed`.");
}

main();
