import { Pool } from "pg";
import { DEFAULT_CONTENT, SiteContent } from "./content-types";

// ── Pool ──────────────────────────────────────────────────────────────────────

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
});

// ── Schema init (idempotent) ──────────────────────────────────────────────────

let initialized = false;

async function initDb(): Promise<void> {
  if (initialized) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS site_content (
      section TEXT PRIMARY KEY,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `);
  // Seed default content for any missing sections
  for (const [section, data] of Object.entries(DEFAULT_CONTENT)) {
    await pool.query(
      `INSERT INTO site_content (section, content)
       VALUES ($1, $2)
       ON CONFLICT (section) DO NOTHING`,
      [section, JSON.stringify(data)]
    );
  }
  initialized = true;
}

// ── Content ──────────────────────────────────────────────────────────────────

export async function getAllContent(): Promise<SiteContent> {
  await initDb();
  const { rows } = await pool.query("SELECT section, content FROM site_content");
  const result: Record<string, unknown> = { ...DEFAULT_CONTENT };
  for (const row of rows) {
    // pg returns JSONB as parsed object already
    result[row.section] = typeof row.content === "string"
      ? JSON.parse(row.content)
      : row.content;
  }
  return result as unknown as SiteContent;
}

export async function saveSection(section: string, content: unknown): Promise<void> {
  await initDb();
  await pool.query(
    `INSERT INTO site_content (section, content, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (section)
     DO UPDATE SET content = $2, updated_at = now()`,
    [section, JSON.stringify(content)]
  );
}

// ── Admin users ───────────────────────────────────────────────────────────────

export async function adminExists(): Promise<boolean> {
  await initDb();
  const { rows } = await pool.query("SELECT COUNT(*) AS count FROM admin_users");
  return Number(rows[0].count) > 0;
}

export async function getAdminByEmail(
  email: string
): Promise<{ id: number; email: string; password_hash: string } | null> {
  await initDb();
  const { rows } = await pool.query(
    "SELECT id, email, password_hash FROM admin_users WHERE email = $1",
    [email]
  );
  return rows[0] ?? null;
}

export async function createAdmin(email: string, passwordHash: string): Promise<void> {
  await initDb();
  await pool.query(
    "INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)",
    [email, passwordHash]
  );
}
