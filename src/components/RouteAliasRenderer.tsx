import PickACardGame from "@/app/pick-a-card/PickACardGame";
import SluzbyPage from "@/app/sluzby/SluzbyPage";
import { LOCALIZED_ROUTES } from "@/lib/i18n";
import { slugFromRoutePath } from "@/lib/route-overrides";

function routeIdFromPath(path: string) {
  const slug = slugFromRoutePath(path);
  return LOCALIZED_ROUTES.find(route =>
    Object.values(route.slugs).includes(slug as never)
  )?.id;
}

export function renderRouteAliasTarget(path: string) {
  const routeId = routeIdFromPath(path);

  if (routeId === "pick-a-card") return <PickACardGame />;
  if (routeId === "services") return <SluzbyPage />;

  return null;
}
