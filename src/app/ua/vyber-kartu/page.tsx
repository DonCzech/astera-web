import PickACardGame from "@/app/pick-a-card/PickACardGame";
import { redirectIfRouteChanged } from "@/lib/route-overrides.server";
import { metadata } from "../pick-a-card/page";

export { metadata };

export default async function UkPickACardLocalizedPage() {
  await redirectIfRouteChanged("/ua/vyber-kartu", "ua");
  return <PickACardGame />;
}
