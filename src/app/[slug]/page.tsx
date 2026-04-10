"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import { useContent } from "@/context/ContentContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockRenderer from "@/components/BlockRenderer";

export default function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { content } = useContent();
  const page = (content.pages || []).find(p => p.slug === slug);

  if (!page) return notFound();

  return (
    <>
      <Header />
      <main style={{ paddingTop: "120px", minHeight: "60vh" }}>
        <BlockRenderer blocks={page.blocks} />
      </main>
      <Footer />
    </>
  );
}
