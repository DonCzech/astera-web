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
  title: { absolute: "Astera Light | Читання карт, очищення простору та інтуїтивне керівництво" },
  description: "Astera Light пропонує читання карт, очищення просторів, енергетичну роботу та м'яке інтуїтивне керівництво для спокійнішого дому та життя.",
  openGraph: {
    title: "Astera Light | Читання карт, очищення простору та інтуїтивне керівництво",
    description: "Читання карт, очищення просторів, енергетична робота та інтуїтивне керівництво.",
    siteName: SITE_NAME,
    type: "website",
    locale: "uk_UA",
  },
};

export default function UkHomePage() {
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
