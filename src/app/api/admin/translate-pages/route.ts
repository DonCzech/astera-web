import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { getAllContent, saveI18nSection } from "@/lib/db";
import { Lang } from "@/lib/i18n";
import { CustomPage, PageBlock } from "@/lib/content-types";

const LANG_NAMES: Record<Lang, string> = {
  cs: "Czech",
  en: "English",
  ua: "Ukrainian",
};

async function translateText(text: string, targetLang: Lang): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set in environment");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Translate the following text from Czech to ${LANG_NAMES[targetLang]}. Return ONLY the translated text with no explanation, no quotes, no formatting.\n\n${text}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text?.trim() ?? text;
}

async function translateBlock(block: PageBlock, targetLang: Lang): Promise<PageBlock> {
  const result = { ...block };
  if (block.content) result.content = await translateText(block.content, targetLang);
  if (block.subtitle) result.subtitle = await translateText(block.subtitle, targetLang);
  if (block.ctaText) result.ctaText = await translateText(block.ctaText, targetLang);
  if (block.alt) result.alt = await translateText(block.alt, targetLang);
  if (block.body) result.body = await translateText(block.body, targetLang);
  return result;
}

async function translatePage(page: CustomPage, targetLang: Lang): Promise<CustomPage> {
  const translatedBlocks = await Promise.all(
    page.blocks.map(b => translateBlock(b, targetLang))
  );
  const translatedTitle = await translateText(page.title, targetLang);
  return { ...page, title: translatedTitle, blocks: translatedBlocks };
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { targetLang, slug } = await request.json() as { targetLang: Lang; slug?: string };

  if (targetLang === "cs") {
    return Response.json({ error: "Cannot translate to Czech (source language)" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not set. Add it to .env.local and restart the server." },
      { status: 503 }
    );
  }

  try {
    const csContent = await getAllContent();
    const pages = csContent.pages ?? [];

    const pagesToTranslate = slug
      ? pages.filter(p => p.slug === slug)
      : pages;

    if (pagesToTranslate.length === 0) {
      return Response.json({ error: "No pages found" }, { status: 404 });
    }

    const translatedPages = await Promise.all(
      pagesToTranslate.map(p => translatePage(p, targetLang))
    );

    // Merge into the existing EN/UA pages array (replace matching slugs, keep others)
    const existingLangPages = (csContent.pages ?? []).map(p => {
      const translated = translatedPages.find(t => t.slug === p.slug);
      return translated ?? p;
    });

    await saveI18nSection("pages", targetLang, existingLangPages);

    return Response.json({ ok: true, translated: translatedPages.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}
