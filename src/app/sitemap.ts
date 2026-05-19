import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/db";
import { absoluteUrl, PUBLIC_ROUTES, SEO_PAGES, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  const addEntry = (entry: MetadataRoute.Sitemap[number]) => {
    const key = entry.url.replace(/\/$/, "");
    const current = entries.get(key);
    if (!current || (entry.priority ?? 0) > (current.priority ?? 0)) {
      entries.set(key, entry);
    }
  };

  for (const route of PUBLIC_ROUTES) {
    const url = absoluteUrl(route.path);
    addEntry({
      url,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          "cs-CZ": url,
          "x-default": url,
        },
      },
    });
  }

  for (const page of SEO_PAGES) {
    const url = absoluteUrl(`/${page.slug}`);
    addEntry({
      url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: page.priority,
      alternates: {
        languages: {
          "cs-CZ": url,
          "x-default": url,
        },
      },
    });
  }

  try {
    const content = await getAllContent();
    const pages = (content.pages ?? []) as Array<{ slug: string }>;
    const redirectedSlugs = new Set(["e-shop", "shop"]);
    for (const page of pages) {
      const slug = page.slug?.replace(/^\/+|\/+$/g, "");
      if (!slug || slug.startsWith("admin") || slug.startsWith("api") || redirectedSlugs.has(slug)) continue;
      const url = `${SITE_URL}/${slug}`;
      addEntry({
        url,
        lastModified: now,
        changeFrequency: "weekly",
        priority: slug === "about" || slug === "sluzby" ? 0.82 : 0.72,
        alternates: {
          languages: {
            "cs-CZ": url,
            "x-default": url,
          },
        },
      });
    }
  } catch {
    // DB unavailable - return static SEO routes only.
  }

  return [...entries.values()].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}
