import type { Metadata } from "next";
import SluzbyPage from "@/app/sluzby/SluzbyPage";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Services | Astera Light" },
  description: "Card readings, space cleansing, amulets, mediumship and energetic work — individual services by Astera Light.",
  openGraph: {
    title: "Services | Astera Light",
    description: "Individual spiritual services: card readings, space cleansing, energetic work.",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_GB",
  },
};

export default function EnSluzbyPage() {
  return <SluzbyPage />;
}
