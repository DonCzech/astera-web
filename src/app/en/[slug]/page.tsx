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
    const content = await getContentForRouteLang("en");
    const { effectiveSlug } = getEffectiveRouteSlug(content, `/en/${slug}`);
    const pages = (content.pages ?? []) as Array<{ slug: string; title?: string; description?: string }>;
    const candidates = resolveLocalizedPageSlug(effectiveSlug, "en");
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
  const requestedPath = `/en/${slug}`;
  const content = await getContentForRouteLang("en");
  const destination = resolveRouteRedirect(content.routeRedirects, requestedPath);
  if (destination) redirect(destination);

  const { aliasTarget, effectiveSlug } = getEffectiveRouteSlug(content, requestedPath);
  if (aliasTarget) {
    const staticPage = renderRouteAliasTarget(aliasTarget);
    if (staticPage) return staticPage;
    return <DynamicPageClient params={Promise.resolve({ slug: effectiveSlug })} />;
  }

  const corrected = localizePath(`/${slug}`, "en");
  if (corrected !== `/en/${slug}`) redirect(corrected);

  return <DynamicPageClient params={params} />;
}
