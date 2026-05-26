import type { Metadata } from "next";
import SluzbyPage from "@/app/sluzby/SluzbyPage";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Послуги | Astera Light" },
  description: "Читання карт, очищення простору, амулети, медіумічні читання та енергетична робота — індивідуальні послуги від Astera Light.",
  openGraph: {
    title: "Послуги | Astera Light",
    description: "Індивідуальні духовні послуги: читання карт, очищення простору, енергетична робота.",
    siteName: SITE_NAME,
    type: "website",
    locale: "uk_UA",
  },
};

export default function UkSluzbyPage() {
  return <SluzbyPage />;
}
