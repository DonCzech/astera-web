import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeServices from "@/components/HomeServices";
import Newsletter from "@/components/Newsletter";
import AboutAstera from "@/components/AboutAstera";
import ManifestCards from "@/components/ManifestCards";
import PickACard from "@/components/PickACard";
import MonthlyOracle from "@/components/MonthlyOracle";
import Footer from "@/components/Footer";

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
