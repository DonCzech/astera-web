import type { Metadata } from "next";
import { getAllContentForLang } from "@/lib/db";
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
    const page = pages.find((p) => p.slug === slug);
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
  return <DynamicPageClient params={params} />;
}
