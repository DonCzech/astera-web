import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { getAllContent, saveSection, getAllContentForLang, saveI18nSection, CONTENT_CACHE_TAG } from "@/lib/db";
import { Lang } from "@/lib/i18n";

// The editor reads through this route and must always see committed state —
// a cached response here is how stale images came back minutes after upload.
export const dynamic = "force-dynamic";

function parseLang(value: string | null): Lang {
  if (value === "en" || value === "ua") return value;
  return "cs";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lang = parseLang(url.searchParams.get("lang"));
  const content = lang === "cs" ? await getAllContent() : await getAllContentForLang(lang);
  return Response.json(content);
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { section, content, lang: rawLang } = body;
  if (!section || content === undefined) {
    return Response.json({ error: "section and content required" }, { status: 400 });
  }
  const lang = parseLang(rawLang ?? null);
  if (lang === "cs") {
    await saveSection(section, content);
  } else {
    await saveI18nSection(section, lang, content);
  }
  revalidateTag(CONTENT_CACHE_TAG, { expire: 0 });
  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
