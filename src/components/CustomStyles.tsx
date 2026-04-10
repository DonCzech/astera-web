"use client";
import { useContent } from "@/context/ContentContext";

export default function CustomStyles() {
  const { content } = useContent();
  const css = content.siteSettings?.customCss || "";
  const accent = content.siteSettings?.accentColor || "#40accd";

  return (
    <style dangerouslySetInnerHTML={{ __html: `
      :root { --accent: ${accent}; }
      .btn-primary { background: ${accent} !important; }
      ${css}
    `}} />
  );
}
