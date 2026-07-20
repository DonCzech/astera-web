/**
 * Jednorázová migrace: doplní sekci `oracle` pole `image` a `mobileImage`
 * ve všech jazycích, aby šel obrázek měnit v editoru.
 *
 * Jazykové řádky se od opravy per-language obsahu nemergují s defaulty v kódu,
 * takže nové pole je potřeba do dat zapsat explicitně. Nastavuje se dosavadní
 * napevno zadrátovaná cesta, takže vizuálně se nic nemění — jen se to stane
 * editovatelným a pro každý jazyk zvlášť.
 *
 * Spuštění:  node scripts/add-oracle-image.mjs          (jen vypíše)
 *            node scripts/add-oracle-image.mjs --apply  (zapíše)
 */
import pg from "pg";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const APPLY = process.argv.includes("--apply");
const DEFAULT_IMAGE = "/images/oracle-video-thumb.jpg";

const env = readFileSync(join(__dir, "../.env.local"), "utf8");
const dbUrl = env.match(/DATABASE_URL="?([^"\n]+)"?/)?.[1]?.trim();
if (!dbUrl) {
  console.error("DATABASE_URL chybí v .env.local");
  process.exit(1);
}
const pool = new pg.Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

/** Doplní chybějící klíče, existující hodnoty nechá být. */
function withImageFields(oracle) {
  const next = { ...oracle };
  let changed = false;
  if (!next.image) { next.image = DEFAULT_IMAGE; changed = true; }
  if (next.mobileImage === undefined) { next.mobileImage = ""; changed = true; }
  return { next, changed };
}

async function main() {
  const cs = await pool.query("SELECT content FROM site_content WHERE section = 'oracle'");
  const langs = await pool.query(
    "SELECT lang, content FROM site_content_i18n WHERE section = 'oracle' AND lang IN ('en','ua')"
  );

  const targets = [
    { lang: "cs", content: cs.rows[0]?.content },
    ...langs.rows.map(r => ({ lang: r.lang, content: r.content })),
  ].filter(t => t.content);

  for (const { lang, content } of targets) {
    const { next, changed } = withImageFields(content);
    console.log(
      `${lang}: image=${next.image} mobileImage="${next.mobileImage}" ${changed ? "→ doplněno" : "(už bylo)"}`
    );
    if (!changed || !APPLY) continue;

    if (lang === "cs") {
      await pool.query(
        "UPDATE site_content SET content = $1, updated_at = now() WHERE section = 'oracle'",
        [JSON.stringify(next)]
      );
    } else {
      await pool.query(
        "UPDATE site_content_i18n SET content = $1, updated_at = now() WHERE section = 'oracle' AND lang = $2",
        [JSON.stringify(next), lang]
      );
    }
  }

  console.log(APPLY ? "\nZAPSÁNO." : "\nDRY RUN — spusť s --apply.");
  await pool.end();
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
