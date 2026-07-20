import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getContentForRouteLang, getEffectiveRouteSlug } from "@/lib/route-overrides.server";
import { resolveRouteRedirect } from "@/lib/route-overrides";
import { localizePath, resolveLocalizedPageSlug } from "@/lib/i18n";
import { renderRouteAliasTarget } from "@/components/RouteAliasRenderer";
import DynamicPageClient from "@/app/[slug]/DynamicPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const content = await getContentForRouteLang("ua");
    const { effectiveSlug } = getEffectiveRouteSlug(content, `/ua/${slug}`);
    const pages = (content.pages ?? []) as Array<{ slug: string; title?: string; description?: string }>;
    const candidates = resolveLocalizedPageSlug(effectiveSlug, "ua");
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
  const requestedPath = `/ua/${slug}`;
  const content = await getContentForRouteLang("ua");
  const destination = resolveRouteRedirect(content.routeRedirects, requestedPath);
  if (destination) redirect(destination);

  const { aliasTarget, effectiveSlug } = getEffectiveRouteSlug(content, requestedPath);
  if (aliasTarget) {
    const staticPage = renderRouteAliasTarget(aliasTarget);
    if (staticPage) return staticPage;
    return <DynamicPageClient params={Promise.resolve({ slug: effectiveSlug })} />;
  }

  const corrected = localizePath(`/${slug}`, "ua");
  if (corrected !== `/ua/${slug}`) redirect(corrected);

  return <DynamicPageClient params={params} />;
}
