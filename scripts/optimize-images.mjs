import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const outDir = path.join(publicDir, "optimized");
const mapFile = path.join(root, "src/lib/optimized-image-map.ts");

const exactTargets = new Map([
  ["/images/astera-logo.png", { width: 184, height: 184 }],
  ["/images/CBR-logo-black.png", { width: 102, height: 94 }],
  ["/images/Live-Event.png", { width: 119, height: 25 }],
  ["/images/Membership.png", { width: 147, height: 25 }],
  ["/images/new-book-icon.png", { width: 141, height: 27 }],

  ["/images/astera-with-computer.jpg", { width: 866, height: 668 }],
  ["/uploads/astera-upload-1777542744600-mjff29y2d1k.png", { width: 866, height: 670 }],

  ["/images/kniha-astera.png", { width: 702, height: 702 }],
  ["/images/vyber-si-kartu.png", { width: 702, height: 702 }],
  ["/images/art-of-manifesting.jpg", { width: 702, height: 702 }],
  ["/images/Oracle-Circle.png", { width: 408, height: 410 }],
  ["/images/408x410-OracleSecretsWebinar-Event-Promo.jpg", { width: 408, height: 410 }],
  ["/uploads/astera-upload-1777543812845-9puk6rdon7f.png", { width: 408, height: 410 }],
  ["/uploads/astera-upload-1777543712527-v1mmzjakq5.png", { width: 702, height: 702 }],

  ["/images/crystal-ball-astera.png", { width: 660, height: 440 }],

  ["/images/astera-about-home.png", { width: 579, height: 816 }],
  ["/images/astera-pick-card.png", { width: 579, height: 816 }],
  ["/images/about/astera-sofa.png", { width: 579, height: 816 }],

  ["/images/astera-hero-image.jpg", { width: 1788, height: 880 }],
  ["/images/astera-hero-image-mobile.jpg", { width: 900, height: 1100 }],
  ["/uploads/astera-upload-1777542736772-d2souok25x7.png", { width: 1787, height: 880 }],

  ["/images/oracle-video-thumb.jpg", { width: 1280, height: 720 }],
]);

const supported = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const responsiveWidths = [331, 480, 662, 828, 1200, 1600, 1800];
const preservePngFallback = new Set([
  "/images/astera-logo.png",
  "/images/CBR-logo-black.png",
  "/images/Live-Event.png",
  "/images/Membership.png",
  "/images/new-book-icon.png",
]);

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (abs.startsWith(outDir)) continue;
      files.push(...await listImages(abs));
    } else if (supported.has(path.extname(entry.name).toLowerCase())) {
      files.push(abs);
    }
  }
  return files;
}

function publicPath(abs) {
  return `/${path.relative(publicDir, abs).split(path.sep).join("/")}`;
}

function targetFor(src, meta) {
  const exact = exactTargets.get(src);
  if (exact) return exact;

  // Moon phase icons are displayed at 20px (widget) or 180px (popup) — never need full 300×300
  if (src.startsWith("/images/moon-phases/")) return { width: 180, height: 180 };

  const { width, height } = meta;
  if (!width || !height) return null;

  const maxLongEdge = src.startsWith("/uploads/") ? 1200 : 1000;
  const longEdge = Math.max(width, height);
  if (longEdge <= maxLongEdge) return { width, height };

  const scale = maxLongEdge / longEdge;
  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

function outBase(src) {
  const parsed = path.parse(src);
  return `/optimized${parsed.dir}/${parsed.name}`;
}

function variantPath(base, width, ext) {
  return `${base}-${width}w${ext}`;
}

function candidateWidths(target) {
  const widths = responsiveWidths.filter(width => width < target.width);
  widths.push(target.width);
  return [...new Set(widths)].sort((a, b) => a - b);
}

function fallbackExtFor(src, ext, metadata) {
  if (ext !== ".png") return ext;
  if (preservePngFallback.has(src) || metadata.hasAlpha) return ".png";
  return ".jpg";
}

async function writeVariant(source, target, output, format, fallbackExt) {
  let img = sharp(source, { failOn: "none" }).rotate();
  img = img.resize({
    width: target.width,
    height: target.height,
    fit: "inside",
    withoutEnlargement: true,
    kernel: sharp.kernel.lanczos3,
  });

  if (format === "webp") {
    img = img.webp({ quality: 85, effort: 6, smartSubsample: true });
  } else if (fallbackExt === ".png") {
    img = img.png({ compressionLevel: 9, adaptiveFiltering: true, palette: true });
  } else {
    img = img.jpeg({ quality: 85, mozjpeg: true, chromaSubsampling: "4:2:0" });
  }

  await fs.mkdir(path.dirname(output), { recursive: true });
  await img.toFile(output);
}

const files = await listImages(publicDir);
const map = {};

for (const file of files) {
  const src = publicPath(file);
  const metadata = await sharp(file, { failOn: "none" }).metadata();
  const target = targetFor(src, metadata);
  if (!target) continue;

  const ext = path.extname(src).toLowerCase() === ".jpeg" ? ".jpg" : path.extname(src).toLowerCase();
  const fallbackExt = fallbackExtFor(src, ext, metadata);
  const base = outBase(src);
  const fallback = `${base}${fallbackExt}`;
  const webp = `${base}.webp`;
  const widths = candidateWidths(target);

  await writeVariant(file, target, path.join(publicDir, webp), "webp", ext);
  await writeVariant(file, target, path.join(publicDir, fallback), "fallback", fallbackExt);

  const webpSrcSet = [];
  const fallbackSrcSet = [];
  for (const width of widths) {
    const variantTarget = { width, height: Math.round(target.height * (width / target.width)) };
    const webpVariant = variantPath(base, width, ".webp");
    const fallbackVariant = variantPath(base, width, fallbackExt);
    await writeVariant(file, variantTarget, path.join(publicDir, webpVariant), "webp", ext);
    await writeVariant(file, variantTarget, path.join(publicDir, fallbackVariant), "fallback", fallbackExt);
    webpSrcSet.push(`${webpVariant} ${width}w`);
    fallbackSrcSet.push(`${fallbackVariant} ${width}w`);
  }

  const fallbackMeta = await sharp(path.join(publicDir, fallback), { failOn: "none" }).metadata();

  // LQIP — ~48px blurred placeholder, preserves silhouette/composition while staying tiny (~1-2KB)
  const lqipBuffer = await sharp(file, { failOn: "none" })
    .rotate()
    .resize({ width: 48, withoutEnlargement: false })
    .blur(1.5)
    .webp({ quality: 40 })
    .toBuffer();
  const lqip = `data:image/webp;base64,${lqipBuffer.toString("base64")}`;

  map[src] = {
    webp,
    fallback,
    webpSrcSet: webpSrcSet.join(", "),
    fallbackSrcSet: fallbackSrcSet.join(", "),
    width: fallbackMeta.width ?? target.width,
    height: fallbackMeta.height ?? target.height,
    lqip,
  };
}

const content = `export type OptimizedImageEntry = {
  webp: string;
  fallback: string;
  webpSrcSet?: string;
  fallbackSrcSet?: string;
  width: number;
  height: number;
  lqip?: string;
};

export const OPTIMIZED_IMAGE_MAP: Record<string, OptimizedImageEntry> = ${JSON.stringify(map, null, 2)};
`;

await fs.mkdir(path.dirname(mapFile), { recursive: true });
await fs.writeFile(mapFile, content);

console.log(`Optimized ${Object.keys(map).length} images.`);
