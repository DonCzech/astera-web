import type { Metadata } from "next";
import PickACardGame from "./PickACardGame";
import { redirectIfRouteChanged } from "@/lib/route-overrides.server";
import { absoluteUrl, PUBLIC_ROUTES, SITE_NAME } from "@/lib/seo";

const route = PUBLIC_ROUTES.find((item) => item.path === "/pick-a-card")!;

export const metadata: Metadata = {
  title: { absolute: route.title },
  description: route.description,
  alternates: { canonical: absoluteUrl("/pick-a-card") },
  openGraph: {
    title: route.title,
    description: route.description,
    url: absoluteUrl("/pick-a-card"),
    siteName: SITE_NAME,
    type: "website",
    locale: "cs_CZ",
  },
};

export default async function PickACardPage() {
  await redirectIfRouteChanged("/pick-a-card", "cs");
  return <PickACardGame />;
}
