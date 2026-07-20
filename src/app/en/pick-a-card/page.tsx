import type { Metadata } from "next";
import PickACardGame from "@/app/pick-a-card/PickACardGame";
import { redirectIfRouteChanged } from "@/lib/route-overrides.server";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Pick a card | Astera Light" },
  description: "Choose an intuitive card of the day. A short message will help you tune into your next step and your own inner voice.",
  openGraph: {
    title: "Pick a card | Astera Light",
    description: "Choose an intuitive card of the day.",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_GB",
  },
};

export default async function EnPickACardPage() {
  await redirectIfRouteChanged("/en/pick-a-card", "en");
  return <PickACardGame />;
}
