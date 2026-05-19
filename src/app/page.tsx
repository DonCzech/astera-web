import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeServices from "@/components/HomeServices";
import Newsletter from "@/components/Newsletter";
import AboutAstera from "@/components/AboutAstera";
import ManifestCards from "@/components/ManifestCards";
import PickACard from "@/components/PickACard";
import MonthlyOracle from "@/components/MonthlyOracle";
import Footer from "@/components/Footer";
import { absoluteUrl, PUBLIC_ROUTES, SITE_NAME } from "@/lib/seo";

const route = PUBLIC_ROUTES.find((item) => item.path === "/")!;

export const metadata: Metadata = {
  title: { absolute: route.title },
  description: route.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: route.title,
    description: route.description,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    type: "website",
    locale: "cs_CZ",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HomeServices />
        <AboutAstera />
        <Newsletter />
        <ManifestCards />
        <PickACard />
        <MonthlyOracle />
      </main>
      <Footer />
    </>
  );
}
