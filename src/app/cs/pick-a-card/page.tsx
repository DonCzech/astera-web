import type { Metadata } from "next";
import PickACardGame from "@/app/pick-a-card/PickACardGame";
import { redirectIfRouteChanged } from "@/lib/route-overrides.server";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Vyber si kartu | Astera Light" },
  description: "Zastav se, nadechni se a vyber intuitivní kartu dne. Krátký vzkaz ti pomůže naladit se na další krok.",
  openGraph: { title: "Vyber si kartu | Astera Light", siteName: SITE_NAME, type: "website", locale: "cs_CZ" },
};

export default async function CsPickACardPage() {
  await redirectIfRouteChanged("/cs/pick-a-card", "cs");
  return <PickACardGame />;
}
