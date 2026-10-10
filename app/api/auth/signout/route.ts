import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/src/lib/auth-session";

/**
 * Revokes session and clears HTTP-only bic_session cookie.
 */
export async function POST() {
  const res = NextResponse.json({ success: true });
  clearSessionCookie(res);
  return res;
}
