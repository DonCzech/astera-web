import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { saveWheelLead, getWheelLeads } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, segmentLabel, coupon, isWin } = await req.json();
    if (!email || !segmentLabel) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    await saveWheelLead(
      String(email).toLowerCase().trim(),
      String(segmentLabel),
      String(coupon || ""),
      Boolean(isWin)
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("wheel POST error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("astera_admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const leads = await getWheelLeads();
    return NextResponse.json({ leads });
  } catch (err) {
    console.error("wheel GET error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
