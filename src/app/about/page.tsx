import type { Metadata } from "next";
import EditablePage from "@/components/EditablePage";
import { absoluteUrl, PUBLIC_ROUTES, SITE_NAME } from "@/lib/seo";

const route = PUBLIC_ROUTES.find((item) => item.path === "/about")!;

export const metadata: Metadata = {
  title: { absolute: route.title },
  description: route.description,
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: route.title,
    description: route.description,
    url: absoluteUrl("/about"),
    siteName: SITE_NAME,
    type: "website",
    locale: "cs_CZ",
  },
};

export default function AboutPage() {
  return <EditablePage slug="about" />;
}
