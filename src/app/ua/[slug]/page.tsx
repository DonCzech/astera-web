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
    const content = await getAllContentForLang("ua");
    const pages = (content.pages ?? []) as Array<{ slug: string; title?: string; description?: string }>;
    const candidates = resolveLocalizedPageSlug(slug, "ua");
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

export default async function UkDynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const corrected = localizePath(`/${slug}`, "ua");
  if (corrected !== `/ua/${slug}`) redirect(corrected);

  return <DynamicPageClient params={params} />;
}
