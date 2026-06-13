import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const responsiveWidths = [480, 828, 1600];

// Vercel's sharp build lacks the HEVC codec — reject HEIC before sharp tries to open it.
function isHeicBuffer(buf: Buffer): boolean {
  return buf.length >= 12 && buf.subarray(4, 8).toString("latin1") === "ftyp";
}

function normalizedExt(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() || "jpg";
  return ext === "jpeg" ? "jpg" : ext;
}

function outputExt(_inputExt: string, _hasAlpha?: boolean) {
  return "webp";
}

function mimeForExt(ext: string) {
  if (ext === "gif") return "image/gif";
  if (ext === "svg") return "image/svg+xml";
  return "image/webp";
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
  // alphaQuality: 100 ensures transparent pixels are losslessly preserved in WebP
  if (ext === "webp") return image.webp({ quality: 82, effort: 1, alphaQuality: 100 });
  if (ext === "png") return image.png({ compressionLevel: 6 });
  return image.jpeg({ quality: 85, mozjpeg: false });
}

async function renderImage(buffer: Buffer, width: number, ext: string) {
  const image = sharp(buffer, { failOn: "none" })
    .rotate()
    .resize({ width, withoutEnlargement: true, kernel: sharp.kernel.mitchell });
  return withFormat(image, ext).toBuffer();
}

async function writeOptimizedLocal(buffer: Buffer, uploadDir: string, optimizedDir: string, baseName: string, ext: string) {
  const metadata = await sharp(buffer, { failOn: "none" }).metadata();
  const target = targetSize(metadata.width, metadata.height);
  if (!target) throw new Error("Unsupported image dimensions");

  await mkdir(uploadDir, { recursive: true });
  await mkdir(optimizedDir, { recursive: true });

  const mainBuffer = await renderImage(buffer, target.width, ext);
  await writeFile(path.join(uploadDir, `${baseName}.${ext}`), mainBuffer);
  await writeFile(path.join(optimizedDir, `${baseName}.${ext}`), mainBuffer);

  await Promise.all(candidates(target.width).map(async width => {
    const variant = await renderImage(buffer, width, ext);
    return writeFile(path.join(optimizedDir, `${baseName}-${width}w.${ext}`), variant);
  }));
}

async function putBlobImage(pathname: string, body: Buffer, ext: string) {
  return put(pathname, body, {
    access: "public",
    addRandomSuffix: false,
    contentType: mimeForExt(ext),
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

async function writeOptimizedBlob(buffer: Buffer, baseName: string, ext: string) {
  const metadata = await sharp(buffer, { failOn: "none" }).metadata();
  const target = targetSize(metadata.width, metadata.height);
  if (!target) throw new Error("Unsupported image dimensions");

  const mainBuffer = await renderImage(buffer, target.width, ext);
  const mainBlob = await putBlobImage(`${baseName}.${ext}`, mainBuffer, ext);

  await Promise.all(candidates(target.width).map(async width => {
    const variant = await renderImage(buffer, width, ext);
    return putBlobImage(`${baseName}-${width}w.${ext}`, variant, ext);
  }));

  return mainBlob;
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

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"];
  // Some browsers report HEIC with empty MIME type — allow by extension fallback
  const inputExt = normalizedExt(file.name);
  const isHeic = inputExt === "heic" || inputExt === "heif";
  if (!allowedTypes.includes(file.type) && !isHeic) {
    return Response.json({ error: "Only image files allowed" }, { status: 400 });
  }

  const MAX_SIZE = 25 * 1024 * 1024; // 25 MB (HEIC from iPhone can be large)
  if (file.size > MAX_SIZE) {
    return Response.json({ error: "File too large (max 25 MB)" }, { status: 400 });
  }
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

  if (isHeicBuffer(bytes)) {
    return Response.json({ error: "HEIC/HEIF fotky nejde zpracovat na serveru. Ulož fotku jako JPEG v aplikaci Fotky (sdílet → Uložit jako JPEG) a nahraj ji znovu." }, { status: 400 });
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

  try {
    const blob = await writeOptimizedBlob(bytes, baseName, ext);
    return Response.json({ url: blob.url });
  } catch (err) {
    console.error("[upload] Vercel Blob failed:", err);
    return Response.json({ error: `Blob upload failed: ${err instanceof Error ? err.message : String(err)}` }, { status: 500 });
  }
}
