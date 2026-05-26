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
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Astera Light | Card reading, space cleansing & intuitive guidance" },
  description: "Astera Light offers card readings, space cleansing, energetic work and gentle intuitive guidance for a calmer home and life.",
  openGraph: {
    title: "Astera Light | Card reading, space cleansing & intuitive guidance",
    description: "Card readings, space cleansing, energetic work and intuitive guidance for a calmer home and life.",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_GB",
  },
};

export default function EnHomePage() {
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
