import type { Metadata } from "next";
import EditablePage from "@/components/EditablePage";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "About Astera Light | Card reading & space cleansing" },
  description: "Learn about Astera Light — an intuitive guide for calm, energy and space harmony.",
  openGraph: {
    title: "About Astera Light",
    description: "Intuitive guide for calm, energy and the harmony of your space.",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_GB",
  },
};

export default function EnAboutPage() {
  return <EditablePage slug="about" />;
}
