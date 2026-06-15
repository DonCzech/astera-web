import { unstable_cache } from "next/cache";
import { Pool } from "pg";
import { DEFAULT_CONTENT, SiteContent } from "./content-types";
import { Lang, getDefaultContent } from "./i18n";

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

    CREATE TABLE IF NOT EXISTS site_content_i18n (
      section TEXT NOT NULL,
      lang    TEXT NOT NULL,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now(),
      PRIMARY KEY (section, lang)
    );

    CREATE TABLE IF NOT EXISTS wheel_leads (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      segment_label TEXT NOT NULL,
      coupon TEXT DEFAULT '',
      is_win BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now()
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

// Sections that are not language-specific and should always mirror CS DB content
// when no explicit EN/UA version has been saved yet.
const CS_FALLBACK_SECTIONS = ["pages", "siteSettings"] as const;

export async function getAllContentForLang(lang: Lang): Promise<SiteContent> {
  await initDb();
  if (lang === "cs") return getAllContent();
  const defaults = getDefaultContent(lang);
  const { rows } = await pool.query(
    "SELECT section, content FROM site_content_i18n WHERE lang = $1",
    [lang]
  );
  const result: Record<string, unknown> = { ...defaults };
  const savedSections = new Set<string>();
  for (const row of rows) {
    savedSections.add(row.section);
    const stored = typeof row.content === "string" ? JSON.parse(row.content) : row.content;
    const def = result[row.section];
    result[row.section] = isPlainObject(def) && isPlainObject(stored)
      ? { ...def, ...stored }
      : stored;
  }
  // For sections with no EN/UA version saved yet, fall back to CS DB content.
  // This ensures custom pages (konzultace, kniha, etc.) and site settings are
  // always available even before the admin explicitly translates them.
  const missing = CS_FALLBACK_SECTIONS.filter(s => !savedSections.has(s));
  if (missing.length > 0) {
    const cs = await getAllContent();
    const csAny = cs as unknown as Record<string, unknown>;
    for (const section of missing) {
      result[section] = csAny[section];
    }
  }
  return result as unknown as SiteContent;
}

export async function saveI18nSection(section: string, lang: Lang, content: unknown): Promise<void> {
  await initDb();
  await pool.query(
    `INSERT INTO site_content_i18n (section, lang, content, updated_at)
     VALUES ($1, $2, $3, now())
     ON CONFLICT (section, lang)
     DO UPDATE SET content = $3, updated_at = now()`,
    [section, lang, JSON.stringify(content)]
  );
}

export async function getAllContent(): Promise<SiteContent> {
  await initDb();
  const { rows } = await pool.query("SELECT section, content FROM site_content");
  const result: Record<string, unknown> = { ...DEFAULT_CONTENT };
  for (const row of rows) {
    // pg returns JSONB as parsed object already
    const stored = typeof row.content === "string"
      ? JSON.parse(row.content)
      : row.content;
    const defaults = result[row.section];
    result[row.section] = isPlainObject(defaults) && isPlainObject(stored)
      ? { ...defaults, ...stored }
      : stored;
  }
  return result as unknown as SiteContent;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export const CONTENT_CACHE_TAG = "site-content";

export const getCachedContent = unstable_cache(
  () => getAllContent(),
  ["site-content-cs"],
  { tags: [CONTENT_CACHE_TAG], revalidate: 3600 }
);

export const getCachedContentForLang = unstable_cache(
  (lang: Lang) => getAllContentForLang(lang),
  ["site-content-lang"],
  { tags: [CONTENT_CACHE_TAG], revalidate: 3600 }
);

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

// ── Wheel of fortune ──────────────────────────────────────────────────────────

export async function saveWheelLead(email: string, segmentLabel: string, coupon: string, isWin: boolean): Promise<void> {
  await initDb();
  await pool.query(
    "INSERT INTO wheel_leads (email, segment_label, coupon, is_win) VALUES ($1, $2, $3, $4)",
    [email, segmentLabel, coupon, isWin]
  );
}

export async function getWheelLeads(): Promise<{ id: number; email: string; segment_label: string; coupon: string; is_win: boolean; created_at: string }[]> {
  await initDb();
  const { rows } = await pool.query(
    "SELECT id, email, segment_label, coupon, is_win, created_at FROM wheel_leads ORDER BY created_at DESC LIMIT 500"
  );
  return rows;
}
