import { redirect } from "next/navigation";
import type { Lang } from "./i18n";
import { getAllContent, getAllContentForLang } from "./db";
import { resolveRouteAliasTarget, resolveRouteRedirect, slugFromRoutePath } from "./route-overrides";
import type { SiteContent } from "./content-types";

export async function getContentForRouteLang(lang: Lang): Promise<SiteContent> {
  return lang === "cs" ? getAllContent() : getAllContentForLang(lang);
}

export async function redirectIfRouteChanged(path: string, lang: Lang) {
  const content = await getContentForRouteLang(lang);
  const destination = resolveRouteRedirect(content.routeRedirects, path);
  if (destination) redirect(destination);
}

export function getEffectiveRouteSlug(content: SiteContent, requestedPath: string) {
  const aliasTarget = resolveRouteAliasTarget(content.routeRedirects, requestedPath);
  return {
    aliasTarget,
    effectiveSlug: slugFromRoutePath(aliasTarget || requestedPath),
  };
}
