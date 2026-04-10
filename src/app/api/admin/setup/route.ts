import { adminExists, createAdmin } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  if (await adminExists()) {
    return Response.json({ error: "Admin already exists" }, { status: 409 });
  }
  const { email, password } = await request.json();
  if (!email || !password || password.length < 8) {
    return Response.json({ error: "Valid email and password (min 8 chars) required" }, { status: 400 });
  }
  const hash = await bcrypt.hash(password, 12);
  await createAdmin(email, hash);
  return Response.json({ ok: true });
}
