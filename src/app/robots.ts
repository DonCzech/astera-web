import type { MetadataRoute } from "next";

const BASE = "https://asteralight.cz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
