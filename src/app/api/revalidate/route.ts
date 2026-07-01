import { revalidateTag, revalidatePath } from "next/cache";
import { CONTENT_CACHE_TAG } from "@/lib/db";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET ?? "dev";
  const body = await request.json().catch(() => ({}));
  if (body.secret !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidateTag(CONTENT_CACHE_TAG, { expire: 0 });
  revalidatePath("/", "layout");
  return Response.json({ ok: true, revalidated: true });
}
