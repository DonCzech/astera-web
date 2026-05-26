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
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Astera Light | výklad karet, očista prostoru a intuitivní vedení" },
  description: "Astera Light nabízí výklady karet, očistu prostor, energetickou práci a jemné intuitivní vedení pro klidnější domov i život.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "Astera Light | výklad karet, očista prostoru a intuitivní vedení",
    description: "Výklady karet, očista prostor, energetická práce a intuitivní vedení.",
    siteName: SITE_NAME,
    type: "website",
    locale: "cs_CZ",
  },
};

export default function CsHomePage() {
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
