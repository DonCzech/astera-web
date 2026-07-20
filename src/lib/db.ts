import { unstable_cache } from "next/cache";
import { Pool } from "pg";
import { DEFAULT_CONTENT, SiteContent } from "./content-types";
import { Lang, getDefaultContent } from "./i18n";
import { getPgSslConfig } from "./pg-config";

// ── Pool ──────────────────────────────────────────────────────────────────────

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: getPgSslConfig(process.env.DATABASE_URL),
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

/**
 * Every language owns its content outright — its own texts AND its own images
 * (desktop and mobile alike). Nothing is inherited at read time: whatever sits
 * in `site_content_i18n` for that language is exactly what renders.
 *
 * Code-level defaults (`getDefaultContent`) are a *seed*, never a fallback.
 * Merging them in at read time was what silently resurrected stale images: a
 * language whose row lacked a key fell through to a hardcoded `/images/*.png`
 * instead of showing what the admin had uploaded.
 *
 * A language row that has never existed is materialised once, from the Czech
 * content, so the editor starts from a real page rather than a code snapshot.
 * After that the row is authoritative and the languages never touch again.
 */
export async function getAllContentForLang(lang: Lang): Promise<SiteContent> {
  await initDb();
  if (lang === "cs") return getAllContent();

  const { rows } = await pool.query(
    "SELECT section, content FROM site_content_i18n WHERE lang = $1",
    [lang]
  );

  const result: Record<string, unknown> = {};
  for (const row of rows) {
    result[row.section] = typeof row.content === "string" ? JSON.parse(row.content) : row.content;
  }

  // First run for this language: seed the missing sections from CS and persist
  // them, so this branch is taken at most once per section per language.
  const allSections = Object.keys(DEFAULT_CONTENT);
  const missing = allSections.filter(section => !(section in result));
  if (missing.length > 0) {
    const cs = (await getAllContent()) as unknown as Record<string, unknown>;
    const langDefaults = getDefaultContent(lang) as unknown as Record<string, unknown>;
    for (const section of missing) {
      // Prefer CS (real, admin-maintained content) and only fall back to the
      // per-language code defaults for sections CS itself has never had.
      const seed = section in cs ? cs[section] : langDefaults[section];
      result[section] = seed;
      await seedI18nSection(section, lang, seed);
    }
  }

  return result as unknown as SiteContent;
}

/** Write a language row only if it does not exist yet — never overwrites admin edits. */
async function seedI18nSection(section: string, lang: Lang, content: unknown): Promise<void> {
  await pool.query(
    `INSERT INTO site_content_i18n (section, lang, content, updated_at)
     VALUES ($1, $2, $3, now())
     ON CONFLICT (section, lang) DO NOTHING`,
    [section, lang, JSON.stringify(content)]
  );
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
  // DEFAULT_CONTENT only fills sections that have no row at all (initDb seeds
  // them, so in practice never). A stored section is used verbatim — merging
  // defaults key-by-key is what used to bring hardcoded /images/*.png back to
  // life whenever a saved object was missing a field.
  const result: Record<string, unknown> = { ...DEFAULT_CONTENT };
  for (const row of rows) {
    // pg returns JSONB as parsed object already
    result[row.section] = typeof row.content === "string"
      ? JSON.parse(row.content)
      : row.content;
  }
  return result as unknown as SiteContent;
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
