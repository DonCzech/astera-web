import type { Metadata } from "next";
import PickACardGame from "@/app/pick-a-card/PickACardGame";
import { redirectIfRouteChanged } from "@/lib/route-overrides.server";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Обрати карту | Astera Light" },
  description: "Оберіть інтуїтивну карту дня. Коротке послання допоможе вам налаштуватися на наступний крок і власний внутрішній голос.",
  openGraph: {
    title: "Обрати карту | Astera Light",
    description: "Оберіть інтуїтивну карту дня.",
    siteName: SITE_NAME,
    type: "website",
    locale: "uk_UA",
  },
};

export default async function UkPickACardPage() {
  await redirectIfRouteChanged("/ua/pick-a-card", "ua");
  return <PickACardGame />;
}
