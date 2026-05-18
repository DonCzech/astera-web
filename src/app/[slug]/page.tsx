import type { Metadata } from "next";
import { getAllContent } from "@/lib/db";
import DynamicPageClient from "./DynamicPageClient";

const BASE = "https://asteralight.cz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const content = await getAllContent();
    const pages = (content.pages ?? []) as Array<{ slug: string; title?: string; description?: string }>;
    const page = pages.find((p) => p.slug === slug);

    if (!page) return {};

    const title = page.title || "Astera-Light";
    const description = page.description || "Astera-Light — Oracle expert, author and spiritual intuitive.";
    const url = `${BASE}/${slug}`;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        type: "website",
        url,
        siteName: "Astera-Light",
      },
      twitter: { card: "summary_large_image", title, description },
    };
  } catch {
    return {};
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <DynamicPageClient params={params} />;
}
