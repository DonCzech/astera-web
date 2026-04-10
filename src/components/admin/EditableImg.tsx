"use client";
import { useRef, useState } from "react";
import { useContent } from "@/context/ContentContext";
import { SiteContent } from "@/lib/content-types";

function getPath(obj: any, path: string): string {
  return String(path.split(".").reduce((o: any, k: string) => o?.[k], obj) ?? "");
}

function setPath(obj: any, path: string, val: string): any {
  const parts = path.split(".");
  if (parts.length === 1) return { ...obj, [path]: val };
  const [k, i, p] = parts;
  const arr = [...(obj[k] as any[])];
  arr[+i] = { ...arr[+i], [p]: val };
  return { ...obj, [k]: arr };
}

interface Props {
  section: keyof SiteContent;
  field: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function EditableImg({ section, field, alt, style, className }: Props) {
  const { content, admin, updateSection } = useContent();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const src = localPreview ?? getPath(content[section], field);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Immediate local preview
    const reader = new FileReader();
    reader.onload = ev => {
      if (ev.target?.result) setLocalPreview(ev.target.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      updateSection(section, setPath(content[section], field, data.url));
      setLocalPreview(null); // clear local preview, use real URL
    }
    e.target.value = "";
  }

  // Non-admin: render plain img
  if (!admin.isAdmin) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} style={style} className={className} />;
  }

  // Admin mode: wrap with hover overlay
  // Preserve all layout-affecting styles on the wrapper
  const wrapStyle: React.CSSProperties = {
    ...style,
    position: style?.position === "absolute" || style?.position === "fixed"
      ? style.position
      : "relative",
    cursor: "pointer",
  };

  return (
    <div
      style={wrapStyle}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => fileRef.current?.click()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          display: "block",
          width: "100%",
          height: style?.height || "auto",
          borderRadius: style?.borderRadius,
          objectFit: (style as any)?.objectFit,
          objectPosition: (style as any)?.objectPosition,
        }}
      />

      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered ? "rgba(0,0,0,0.52)" : "transparent",
          borderRadius: style?.borderRadius,
          transition: "background 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {hovered && (
          <>
            {uploading ? (
              <div style={{ color: "#fff", fontSize: 13, fontFamily: "'Poppins', sans-serif", background: "rgba(0,0,0,0.5)", padding: "8px 14px", borderRadius: 8 }}>
                Nahrávám…
              </div>
            ) : (
              <>
                <div style={{ fontSize: 32 }}>📷</div>
                <div style={{ color: "#fff", fontSize: 13, fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Změnit obrázek</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "'Poppins', sans-serif" }}>klikni pro výběr souboru</div>
              </>
            )}
          </>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </div>
  );
}
