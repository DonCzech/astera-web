import type { Metadata } from "next";
import { getAllContent } from "@/lib/db";
import SeoLandingPage from "@/components/SeoLandingPage";
import { absoluteUrl, findSeoPage, SEO_PAGES, SITE_NAME, SITE_URL } from "@/lib/seo";
import DynamicPageClient from "./DynamicPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seoPage = findSeoPage(slug);

  if (seoPage) {
    const url = absoluteUrl(`/${slug}`);
    return {
      title: { absolute: seoPage.title },
      description: seoPage.description,
      alternates: {
        canonical: url,
        languages: {
          "cs-CZ": url,
          "x-default": url,
        },
      },
      openGraph: {
        title: seoPage.title,
        description: seoPage.description,
        type: "website",
        url,
        siteName: SITE_NAME,
        locale: "cs_CZ",
      },
      twitter: { card: "summary_large_image", title: seoPage.title, description: seoPage.description },
    };
  }

  try {
    const content = await getAllContent();
    const pages = (content.pages ?? []) as Array<{ slug: string; title?: string; description?: string }>;
    const page = pages.find((p) => p.slug === slug);

    if (!page) return {};

    const title = page.title || "Astera Light";
    const description = page.description || "Astera Light - výklad karet, očista prostoru a intuitivní vedení.";
    const url = `${SITE_URL}/${slug}`;

    return {
      title: { absolute: title },
      description,
      alternates: {
        canonical: url,
        languages: {
          "cs-CZ": url,
          "x-default": url,
        },
      },
      openGraph: {
        title,
        description,
        type: "website",
        url,
        siteName: SITE_NAME,
        locale: "cs_CZ",
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
  const { slug } = await params;
  const seoPage = findSeoPage(slug);
  if (seoPage) return <SeoLandingPage page={seoPage} />;

  return <DynamicPageClient params={params} />;
}

export function generateStaticParams() {
  return SEO_PAGES.map((page) => ({ slug: page.slug }));
}
