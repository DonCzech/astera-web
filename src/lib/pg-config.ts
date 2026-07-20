export function getPgSslConfig(connectionString?: string) {
  if (process.env.PGSSLMODE === "disable") return false;
  if (process.env.PGSSLMODE === "require") return { rejectUnauthorized: false };
  if (!connectionString) return false;

  const normalized = connectionString.toLowerCase();
  if (normalized.includes("sslmode=disable")) return false;
  if (normalized.includes("sslmode=require")) return { rejectUnauthorized: false };
  if (normalized.includes("neon.tech") || normalized.includes("supabase.co")) {
    return { rejectUnauthorized: false };
  }

  return false;
}
