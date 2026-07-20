/**
 * Úklid Vercel Blobu: najde uploady, na které nevede odkaz z databáze,
 * stáhne je do zaloha-fotek/ a teprve pak je smaže.
 *
 * Stažení je součástí mazání — bez lokální kopie skript nic neodstraní.
 *
 * Spuštění:  node scripts/cleanup-orphan-blobs.mjs          (jen vypíše)
 *            node scripts/cleanup-orphan-blobs.mjs --apply  (stáhne + smaže)
 */
import pg from "pg";
import { list, del } from "@vercel/blob";
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const APPLY = process.argv.includes("--apply");

const env = readFileSync(join(__dir, "../.env.local"), "utf8");
const pick = k => env.match(new RegExp(`${k}="?([^"\n]+)"?`))?.[1]?.trim();
const dbUrl = pick("DATABASE_URL");
const token = pick("BLOB_READ_WRITE_TOKEN");
if (!dbUrl || !token) {
  console.error("DATABASE_URL nebo BLOB_READ_WRITE_TOKEN chybí v .env.local");
  process.exit(1);
}

const backupDir = join(__dir, "../zaloha-fotek");
const pool = new pg.Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

async function main() {
  // 1. Co databáze skutečně používá — napříč všemi jazyky.
  const a = await pool.query("SELECT content::text c FROM site_content");
  const b = await pool.query("SELECT content::text c FROM site_content_i18n");
  const referenced = new Set(
    [...a.rows, ...b.rows]
      .map(r => r.c)
      .join(" ")
      .match(/astera-upload-\d+-[a-z0-9]+/g) ?? []
  );
  await pool.end();

  // 2. Všechno v úložišti, včetně -480w/-828w variant.
  let cursor;
  const blobs = [];
  do {
    const page = await list({ token, cursor, limit: 1000 });
    blobs.push(...page.blobs);
    cursor = page.cursor;
  } while (cursor);

  // 3. Osiřelé = základ i všechny jeho varianty, na které nikdo neodkazuje.
  const orphans = blobs.filter(blob => {
    const base = blob.pathname.match(/^(astera-upload-\d+-[a-z0-9]+?)(-\d+w)?\.\w+$/)?.[1];
    return base && !referenced.has(base);
  });

  const bytes = orphans.reduce((sum, o) => sum + o.size, 0);
  console.log(`v úložišti: ${blobs.length} souborů`);
  console.log(`používá se: ${referenced.size} uploadů`);
  console.log(`osiřelých:  ${orphans.length} souborů (${(bytes / 1024 / 1024).toFixed(1)} MB)\n`);

  if (!APPLY) {
    console.log("DRY RUN — nic se nestáhlo ani nesmazalo. Spusť s --apply.");
    return;
  }

  // 4. Stáhnout PŘED mazáním. Když stažení selže, soubor v úložišti zůstane.
  mkdirSync(backupDir, { recursive: true });
  const saved = [];
  for (const blob of orphans) {
    const target = join(backupDir, blob.pathname);
    if (existsSync(target)) { saved.push(blob); continue; }
    const res = await fetch(blob.url);
    if (!res.ok) {
      console.log(`  ✗ nestáhlo se, nechávám v úložišti: ${blob.pathname}`);
      continue;
    }
    writeFileSync(target, Buffer.from(await res.arrayBuffer()));
    saved.push(blob);
  }
  console.log(`staženo do ${backupDir}: ${saved.length} souborů`);

  // 5. Smazat jen to, co je bezpečně na disku.
  for (let i = 0; i < saved.length; i += 50) {
    await del(saved.slice(i, i + 50).map(blob => blob.url), { token });
  }
  console.log(`smazáno z úložiště: ${saved.length} souborů`);
  console.log(`\nVrácení zpět: soubory jsou v ${backupDir}, dají se nahrát znovu přes editor.`);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
