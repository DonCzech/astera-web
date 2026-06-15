"use client";
import { useState } from "react";
import { OPTIMIZED_IMAGE_MAP } from "@/lib/optimized-image-map";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  pictureStyle?: React.CSSProperties;
};

const uploadVariantWidths = [480, 828, 1600];

function extensionFor(src: string) {
  const clean = src.split("?")[0];
  const match = clean.match(/\.(png|jpe?g|webp)$/i);
  if (!match) return ".jpg";
  const ext = match[1].toLowerCase();
  return ext === "jpeg" ? ".jpg" : `.${ext}`;
}

function uploadBase(src: string) {
  return `/optimized${src.replace(/\.(png|jpe?g|webp)$/i, "")}`;
}

function derivedUploadImage(src: string) {
  const isLocalUpload = src.startsWith("/uploads/");
  const isBlobUpload = src.startsWith("http") && src.includes("/astera-upload-");
  if (!isLocalUpload && !isBlobUpload) return null;

  const fallbackExt = extensionFor(src);
  const base = isLocalUpload
    ? uploadBase(src)
    : src.replace(/\.(png|jpe?g|webp)(\?.*)?$/i, "");
  return {
    webp: `${base}.webp`,
    fallback: `${base}${fallbackExt}`,
    webpSrcSet: uploadVariantWidths.map(width => `${base}-${width}w.webp ${width}w`).join(", "),
    fallbackSrcSet: uploadVariantWidths.map(width => `${base}-${width}w${fallbackExt} ${width}w`).join(", "),
    width: undefined,
    height: undefined,
  };
}

export function getOptimizedImage(src?: string) {
  if (!src || src.startsWith("data:") || src.startsWith("http") || src.endsWith(".svg")) {
    return null;
  }
  // /uploads/ files are runtime-generated and ephemeral on Vercel — no srcset
  if (src.startsWith("/uploads/")) return null;
  return OPTIMIZED_IMAGE_MAP[src] ?? derivedUploadImage(src);
}

function pickFromSrcSet(srcSet: string | undefined, preferredWidth: number) {
  if (!srcSet) return null;

  const candidates = srcSet
    .split(",")
    .map(candidate => {
      const [url, widthDescriptor] = candidate.trim().split(/\s+/);
      const width = Number(widthDescriptor?.replace("w", ""));
      return url && Number.isFinite(width) ? { url, width } : null;
    })
    .filter((candidate): candidate is { url: string; width: number } => Boolean(candidate))
    .sort((a, b) => a.width - b.width);

  return candidates.find(candidate => candidate.width >= preferredWidth)?.url ?? candidates.at(-1)?.url ?? null;
}

export function optimizedImageUrl(src: string | undefined, preferredWidth: number, format: "webp" | "fallback" = "webp") {
  const image = getOptimizedImage(src);
  if (!src) return "";
  if (!image) return src;

  return pickFromSrcSet(format === "webp" ? image.webpSrcSet : image.fallbackSrcSet, preferredWidth)
    ?? (format === "webp" ? image.webp : image.fallback);
}

export function optimizedImageSet(src?: string) {
  const image = getOptimizedImage(src);
  if (!src) return "";
  if (!image) return `url('${src}')`;

  const width = image.width || 1800;
  const webp = pickFromSrcSet(image.webpSrcSet, width) ?? image.webp;
  const fallback = pickFromSrcSet(image.fallbackSrcSet, width) ?? image.fallback;

  return `image-set(
    url('${webp}') type('image/webp'),
    url('${fallback}')
  )`;
}

export default function OptimizedImage({ src, alt = "", pictureStyle, ...imgProps }: Props) {
  const stringSrc = typeof src === "string" ? src : undefined;
  const image = getOptimizedImage(stringSrc);
  const sizes = imgProps.sizes || "100vw";
  const isEager = imgProps.fetchPriority === "high" || imgProps.loading === "eager";
  const loading = imgProps.loading ?? (isEager ? "eager" : "lazy");
  const decoding = imgProps.decoding ?? "async";
  const [loaded, setLoaded] = useState(isEager);

  if (!image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={stringSrc} alt={alt} loading={loading} decoding={decoding} {...imgProps} />;
  }

  const { lqip } = image;

  return (
    <picture
      style={{
        ...pictureStyle,
        display: pictureStyle?.display ?? "block",
        backgroundImage: lqip ? `url(${lqip})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <source srcSet={image.webpSrcSet || image.webp} sizes={sizes} type="image/webp" />
      <img
        src={image.fallback}
        srcSet={image.fallbackSrcSet}
        sizes={sizes}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={loading}
        decoding={decoding}
        {...imgProps}
        onLoad={(e) => {
          setLoaded(true);
          imgProps.onLoad?.(e);
        }}
        style={{
          ...imgProps.style,
          opacity: loaded ? 1 : 0,
          transition: loaded ? "opacity 0.4s ease" : "none",
        }}
      />
    </picture>
  );
}
