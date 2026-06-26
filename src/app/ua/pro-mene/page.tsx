import type { Metadata } from "next";
import EditablePage from "@/components/EditablePage";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Про Astera Light | Читання карт і очищення простору" },
  description: "Дізнайтеся більше про Astera Light — інтуїтивну провідницю для спокою, енергії та гармонії простору.",
  openGraph: {
    title: "Про Astera Light",
    description: "Інтуїтивна провідниця для спокою, енергії та гармонії простору.",
    siteName: SITE_NAME,
    type: "website",
    locale: "uk_UA",
  },
};

export default function UkAboutLocalizedPage() {
  return <EditablePage slug="pro-mene" />;
}
