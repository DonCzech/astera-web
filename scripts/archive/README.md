# Archivované skripty — NESPOUŠTĚT

Tyto skripty zapisují **napevno zadrátovaný** obsah (včetně cest k obrázkům jako
`/images/astera-pick-card.png`) přímo do `site_content_i18n` přes `ON CONFLICT DO UPDATE`.

Spuštěním přepíšou vše, co admin nahrál v Live Editoru.

**20. 7. 2026 v 11:37** takto `seed-i18n-pages.mjs` smazal anglické a ukrajinské
obrázky v sekcích `about`, `manifest` a `pages` a nahradil je defaulty z kódu.

Příponu `.DISABLED` neodstraňuj. Obsah se edituje výhradně přes `/admin` Live Editor,
kde je zápis vždy jen do jednoho jazyka.
