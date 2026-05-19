import type { Metadata } from "next";
import { absoluteUrl, PUBLIC_ROUTES, SITE_NAME } from "@/lib/seo";
import SluzbyPage from "./SluzbyPage";

const route = PUBLIC_ROUTES.find((item) => item.path === "/sluzby")!;

export const metadata: Metadata = {
  title: { absolute: route.title },
  description: route.description,
  alternates: { canonical: absoluteUrl("/sluzby") },
  openGraph: {
    title: route.title,
    description: route.description,
    url: absoluteUrl("/sluzby"),
    siteName: SITE_NAME,
    type: "website",
    locale: "cs_CZ",
  },
};

export default function ServicesPage() {
  return <SluzbyPage />;
}
