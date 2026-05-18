import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/db";

const BASE = "https://asteralight.cz";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: BASE,          lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  let dynamicEntries: MetadataRoute.Sitemap = [];
  try {
    const content = await getAllContent();
    const pages = (content.pages ?? []) as Array<{ slug: string }>;
    dynamicEntries = pages.map((page) => ({
      url: `${BASE}/${page.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB unavailable — return static only
  }

  return [...staticEntries, ...dynamicEntries];
}
