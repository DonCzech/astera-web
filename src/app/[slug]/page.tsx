"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import { useContent } from "@/context/ContentContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockRenderer from "@/components/BlockRenderer";

export default function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { content, contentLoaded, admin } = useContent();

  // Wait for content to load from API before deciding 404
  // (server-side render has DEFAULT_CONTENT with empty pages)
  if (!contentLoaded) {
    return (
      <>
        <Header />
        <main style={{ paddingTop: "102px", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "#9ca3af", fontFamily: "'Poppins',sans-serif", fontSize: 16 }}>Načítám…</div>
        </main>
        <Footer />
      </>
    );
  }

  const page = (content.pages || []).find(p => p.slug === slug);
  if (!page) return notFound();

  return (
    <>
      <Header />
      <main style={{ paddingTop: admin.isAdmin ? "128px" : "102px", minHeight: "60vh" }}>
        <BlockRenderer blocks={page.blocks} />
      </main>
      <Footer />
    </>
  );
}
