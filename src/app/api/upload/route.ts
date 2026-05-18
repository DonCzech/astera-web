import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const responsiveWidths = [331, 480, 662, 828, 1200, 1600, 1800];

function normalizedExt(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() || "jpg";
  return ext === "jpeg" ? "jpg" : ext;
}

function outputExt(inputExt: string, hasAlpha?: boolean) {
  if (inputExt === "png" && hasAlpha) return "png";
  if (inputExt === "png") return "jpg";
  if (inputExt === "webp" && hasAlpha) return "png";
  return "jpg";
}

function targetSize(width?: number, height?: number) {
  if (!width || !height) return null;
  const maxLongEdge = 1800;
  const longEdge = Math.max(width, height);
  if (longEdge <= maxLongEdge) return { width, height };
  const scale = maxLongEdge / longEdge;
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

function candidates(width: number) {
  return [...new Set([...responsiveWidths, width])].sort((a, b) => a - b);
}

function withFormat(image: sharp.Sharp, ext: string) {
  if (ext === "webp") return image.webp({ quality: 100, effort: 6, smartSubsample: false });
  if (ext === "png") return image.png({ compressionLevel: 9, adaptiveFiltering: true, palette: false });
  return image.jpeg({ quality: 100, mozjpeg: true, chromaSubsampling: "4:4:4" });
}

async function renderImage(buffer: Buffer, width: number, ext: string) {
  const image = sharp(buffer, { failOn: "none" })
    .rotate()
    .resize({ width, withoutEnlargement: true, kernel: sharp.kernel.lanczos3 });
  return withFormat(image, ext).toBuffer();
}

async function writeOptimizedLocal(buffer: Buffer, uploadDir: string, optimizedDir: string, baseName: string, ext: string) {
  const metadata = await sharp(buffer, { failOn: "none" }).metadata();
  const target = targetSize(metadata.width, metadata.height);
  if (!target) throw new Error("Unsupported image dimensions");

  await mkdir(uploadDir, { recursive: true });
  await mkdir(optimizedDir, { recursive: true });

  const fallbackBuffer = await renderImage(buffer, target.width, ext);
  await writeFile(path.join(uploadDir, `${baseName}.${ext}`), fallbackBuffer);
  await writeFile(path.join(optimizedDir, `${baseName}.${ext}`), fallbackBuffer);
  await writeFile(path.join(optimizedDir, `${baseName}.webp`), await renderImage(buffer, target.width, "webp"));

  await Promise.all(candidates(target.width).flatMap(async width => {
    const webp = await renderImage(buffer, width, "webp");
    const fallback = await renderImage(buffer, width, ext);
    return Promise.all([
      writeFile(path.join(optimizedDir, `${baseName}-${width}w.webp`), webp),
      writeFile(path.join(optimizedDir, `${baseName}-${width}w.${ext}`), fallback),
    ]);
  }));
}

async function putBlobImage(pathname: string, body: Buffer, contentType: string) {
  return put(pathname, body, {
    access: "public",
    addRandomSuffix: false,
    contentType,
  });
}

async function writeOptimizedBlob(buffer: Buffer, baseName: string, ext: string) {
  const metadata = await sharp(buffer, { failOn: "none" }).metadata();
  const target = targetSize(metadata.width, metadata.height);
  if (!target) throw new Error("Unsupported image dimensions");

  const contentType = ext === "png" ? "image/png" : "image/jpeg";
  const fallbackBuffer = await renderImage(buffer, target.width, ext);
  const fallbackBlob = await putBlobImage(`${baseName}.${ext}`, fallbackBuffer, contentType);
  await putBlobImage(`${baseName}.webp`, await renderImage(buffer, target.width, "webp"), "image/webp");

  await Promise.all(candidates(target.width).flatMap(async width => {
    const webp = await renderImage(buffer, width, "webp");
    const fallback = await renderImage(buffer, width, ext);
    return Promise.all([
      putBlobImage(`${baseName}-${width}w.webp`, webp, "image/webp"),
      putBlobImage(`${baseName}-${width}w.${ext}`, fallback, contentType),
    ]);
  }));

  return fallbackBlob;
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowedTypes.includes(file.type)) {
    return Response.json({ error: "Only image files allowed" }, { status: 400 });
  }

  const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
  if (file.size > MAX_SIZE) {
    return Response.json({ error: "File too large (max 10 MB)" }, { status: 400 });
  }

  const inputExt = normalizedExt(file.name);
  const baseName = `astera-upload-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    const filename = `${baseName}.${inputExt}`;
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      const uploadDir = path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), bytes);
      return Response.json({ url: `/uploads/${filename}` });
    }

    const blob = await put(filename, bytes, { access: "public", addRandomSuffix: false, contentType: file.type });
    return Response.json({ url: blob.url });
  }

  const metadata = await sharp(bytes, { failOn: "none" }).metadata();
  const ext = outputExt(inputExt, metadata.hasAlpha);
  const filename = `${baseName}.${ext}`;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    const uploadDir = path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "uploads");
    const optimizedDir = path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "optimized", "uploads");
    await writeOptimizedLocal(bytes, uploadDir, optimizedDir, baseName, ext);
    return Response.json({ url: `/uploads/${filename}` });
  }

  const blob = await writeOptimizedBlob(bytes, baseName, ext);

  return Response.json({ url: blob.url });
}
