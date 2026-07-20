/**
 * Jednorázová oprava: nahradí v EN/UA obrázky, které jsou zadrátované defaulty
 * z kódu (/images/*.png), aktuální českou fotkou — desktop i mobilní pole.
 *
 * Nejde o dědění za běhu. Je to jednorázová kopie dat: každý jazyk pak vlastní
 * svoji hodnotu a dá se kdykoli přepsat v editoru, aniž by to sáhlo na ostatní.
 *
 * Spuštění:  node scripts/fix-lang-image-defaults.mjs          (jen vypíše)
 *            node scripts/fix-lang-image-defaults.mjs --apply  (zapíše)
 */
import pg from "pg";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const APPLY = process.argv.includes("--apply");

const env = readFileSync(join(__dir, "../.env.local"), "utf8");
const dbUrl = env.match(/DATABASE_URL="?([^"\n]+)"?/)?.[1]?.trim();
if (!dbUrl) {
  console.error("DATABASE_URL chybí v .env.local");
  process.exit(1);
}
const pool = new pg.Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

const isCodeDefault = v => typeof v === "string" && v.startsWith("/images/");
const isRealUpload = v =>
  typeof v === "string" && (v.includes("astera-upload-") || v.startsWith("/uploads/"));

/** Projde strom a na každé shodě zavolá fn(rodič, klíč, hodnota, cesta). */
function walk(node, path, fn) {
  if (node == null || typeof node !== "object") return;
  const entries = Array.isArray(node)
    ? node.map((v, i) => [i, v])
    : Object.entries(node);
  for (const [key, value] of entries) {
    const at = Array.isArray(node) ? `${path}[${key}]` : path ? `${path}.${key}` : String(key);
    if (typeof value === "string") fn(node, key, value, at);
    else walk(value, at, fn);
  }
}

/** Najde v `cs` hodnotu na stejné cestě jako v jazykové mutaci. */
function valueAtPath(root, path) {
  const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let node = root;
  for (const part of parts) {
    if (node == null || typeof node !== "object") return undefined;
    node = node[part];
  }
  return node;
}

async function main() {
  const csRows = await pool.query("SELECT section, content FROM site_content");
  const cs = Object.fromEntries(csRows.rows.map(r => [r.section, r.content]));

  const langRows = await pool.query(
    "SELECT section, lang, content FROM site_content_i18n WHERE lang IN ('en','ua')"
  );

  // Záloha vždy, i při dry-runu — ať je z čeho vrátit.
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backup = join(__dir, `../zaloha-obsahu-${stamp}.json`);
  writeFileSync(backup, JSON.stringify({ cs: csRows.rows, i18n: langRows.rows }, null, 1));
  console.log(`záloha: ${backup}\n`);

  let fixed = 0;
  let unfixable = 0;

  for (const row of langRows.rows) {
    const content = row.content;
    const csSection = cs[row.section];
    if (!csSection) continue;

    const changes = [];
    walk(content, "", (parent, key, value, at) => {
      if (!isCodeDefault(value)) return;
      const csValue = valueAtPath(csSection, at);
      if (!isRealUpload(csValue)) {
        unfixable++;
        console.log(`  ⊘ ${row.section} [${row.lang}] ${at}\n      ${value} — čeština tam má taky default, nechávám`);
        return;
      }
      changes.push([at, value, csValue]);
      parent[key] = csValue;
    });

    if (changes.length === 0) continue;
    fixed += changes.length;
    console.log(`${row.section} [${row.lang}] — ${changes.length} oprav`);
    changes.forEach(([at, from, to]) =>
      console.log(`  ✓ ${at}\n      ${from}\n      → ${to.replace(/^https:\/\/[^/]+\//, "")}`)
    );

    if (APPLY) {
      await pool.query(
        `UPDATE site_content_i18n SET content = $1, updated_at = now()
         WHERE section = $2 AND lang = $3`,
        [JSON.stringify(content), row.section, row.lang]
      );
    }
  }

  // Mrtvé jazyky ze starého kódu (lang 'uk' se nikde nečte).
  const dead = await pool.query(
    "SELECT section, lang FROM site_content_i18n WHERE lang NOT IN ('cs','en','ua')"
  );
  if (dead.rows.length > 0) {
    console.log(`\nmrtvé jazykové řádky: ${dead.rows.map(r => `${r.section}/${r.lang}`).join(", ")}`);
    if (APPLY) {
      await pool.query("DELETE FROM site_content_i18n WHERE lang NOT IN ('cs','en','ua')");
    }
  }

  console.log(
    `\n=== opraveno ${fixed} slotů, ${unfixable} nešlo (chybí i v češtině) ===` +
      (APPLY ? "\nZAPSÁNO do databáze." : "\nDRY RUN — nic se nezapsalo. Spusť s --apply.")
  );
  await pool.end();
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
