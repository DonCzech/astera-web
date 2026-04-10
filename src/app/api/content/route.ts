import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { getAllContent, saveSection } from "@/lib/db";

export async function GET() {
  const content = await getAllContent();
  return Response.json(content);
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { section, content } = body;
  if (!section || content === undefined) {
    return Response.json({ error: "section and content required" }, { status: 400 });
  }
  await saveSection(section, content);
  return Response.json({ ok: true });
}
