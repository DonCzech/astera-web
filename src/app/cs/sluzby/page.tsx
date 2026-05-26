import type { Metadata } from "next";
import SluzbyPage from "@/app/sluzby/SluzbyPage";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Služby | Astera Light" },
  description: "Výklady karet, očista prostoru, amulety, mediumní výklady a energetická práce — individuální služby Astery Light.",
  openGraph: { title: "Služby | Astera Light", siteName: SITE_NAME, type: "website", locale: "cs_CZ" },
};

export default function CsSluzbyPage() {
  return <SluzbyPage />;
}
