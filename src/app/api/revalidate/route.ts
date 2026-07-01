import { revalidateTag, revalidatePath } from "next/cache";
import { CONTENT_CACHE_TAG } from "@/lib/db";

// Secret must match REVALIDATE_SECRET env var (or "dev" in development)
const SECRET = process.env.REVALIDATE_SECRET ?? "dev";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (body.secret !== SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidateTag(CONTENT_CACHE_TAG, { expire: 0 });
  revalidatePath("/", "layout");
  return Response.json({ ok: true, revalidated: true });
}
