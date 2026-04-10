import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

// Protect /api/content PUT and /api/upload — handled inside routes themselves.
// This proxy redirects /admin/setup if admin already exists,
// and /admin/login if already logged in.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isLoggedIn = token ? !!verifyToken(token) : false;

  // If logged in and hitting login/setup, redirect to home
  if (isLoggedIn && (pathname === "/admin/login" || pathname === "/admin/setup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
