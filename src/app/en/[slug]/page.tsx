import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAllContentForLang } from "@/lib/db";
import { localizePath, resolveLocalizedPageSlug } from "@/lib/i18n";
import DynamicPageClient from "@/app/[slug]/DynamicPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const content = await getAllContentForLang("en");
    const pages = (content.pages ?? []) as Array<{ slug: string; title?: string; description?: string }>;
    const candidates = resolveLocalizedPageSlug(slug, "en");
    const page = pages.find((p) => candidates.includes(p.slug));
    if (!page) return {};
    return {
      title: { absolute: page.title || "Astera Light" },
      description: page.description || "",
    };
  } catch {
    return {};
  }
}

export default async function EnDynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const corrected = localizePath(`/${slug}`, "en");
  if (corrected !== `/en/${slug}`) redirect(corrected);

  return <DynamicPageClient params={params} />;
}
