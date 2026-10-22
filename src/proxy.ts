import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = req.cookies.get("bic_session")?.value;

  // 1. Protected Portal & Leadership Routes
  if (pathname.startsWith("/portal") || pathname.startsWith("/leadership")) {
    if (!sessionCookie) {
      const signInUrl = new URL("/signin", req.url);
      signInUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // 2. Leadership-Only Routes
    if (pathname.startsWith("/leadership")) {
      try {
        const payload = JSON.parse(Buffer.from(sessionCookie.split(".")[1], "base64").toString());
        const isLeaderOrAdmin = ["ADMIN", "GROUP_LEADER", "LEVEL_LEADER"].includes(payload.role);
        if (!isLeaderOrAdmin) {
          return NextResponse.redirect(new URL("/portal/dashboard", req.url));
        }
      } catch {
        return NextResponse.redirect(new URL("/signin", req.url));
      }
    }
  }

  // 3. API Protection for sensitive member endpoints
  if (pathname.startsWith("/api/members") && !sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export function proxy(req: NextRequest) {
  return middleware(req);
}

export const config = {
  matcher: ["/portal/:path*", "/leadership/:path*", "/api/members/:path*"],
};
