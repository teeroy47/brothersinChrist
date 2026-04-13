import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getSessionFromCookieValue, isAdminRole, isLeaderRole } from "@/lib/auth";

const protectedPrefixes = ["/home", "/levels", "/groups", "/community", "/progress", "/attendance", "/check-in", "/profile", "/settings"];
const leaderOnlyPrefixes = ["/leader"];
const adminOnlyPrefixes = ["/admin"];

export function middleware(request: NextRequest) {
  const session = getSessionFromCookieValue(request.cookies.get("bic-session")?.value);
  const { pathname } = request.nextUrl;

  const needsAuth = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  if (needsAuth && !session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (leaderOnlyPrefixes.some((prefix) => pathname.startsWith(prefix)) && (!session || !isLeaderRole(session.role))) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (adminOnlyPrefixes.some((prefix) => pathname.startsWith(prefix)) && (!session || !isAdminRole(session.role))) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/levels/:path*",
    "/groups/:path*",
    "/community/:path*",
    "/progress/:path*",
    "/attendance/:path*",
    "/check-in/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/leader/:path*",
    "/admin/:path*"
  ]
};
