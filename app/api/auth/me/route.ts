import { NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/src/lib/auth-session";

/**
 * Returns currently authenticated user session from HTTP-only cookie.
 * Eliminates need to store user PII or auth tokens in window.localStorage.
 */
export async function GET(req: Request) {
  const sessionUser = await getSessionUserFromRequest(req);
  if (!sessionUser) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: sessionUser });
}
