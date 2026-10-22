import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { verifyPassword } from "@/src/lib/auth-server";
import { setSessionCookie } from "@/src/lib/auth-session";

/**
 * Hardened sign-in handler.
 * Verifies credentials against PBKDF2 600,000 rounds and issues HTTP-only session cookie.
 * Conforming to ASVS v5.0.0-6.2.1, ASVS v5.0.0-7.1.1, and W3C §2.3.
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        role: true,
        profile: true,
        currentLevel: true,
        growthScore: true,
        memberships: {
          include: { group: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.profile?.fullName ?? user.email,
      firstName: user.profile?.firstName ?? "Brother",
      role: user.role.code, // e.g. "ADMIN", "MEMBER", "GROUP_LEADER"
      levelNumber: user.currentLevel?.levelNumber ?? 1,
      levelTitle: user.currentLevel?.title ?? "Level 1: New Believers",
      groupName: user.memberships[0]?.group?.name ?? "General Brotherhood",
      church: user.profile?.church ?? "Brothers In Christ Global",
      consistencyScore: user.growthScore?.overallConsistency ?? 100,
    };

    const res = NextResponse.json({ user: sessionUser });
    // Issue HTTP-only, Secure, SameSite=Lax cookie (ASVS v5.0.0-7.1.1)
    setSessionCookie(res, sessionUser);
    return res;
  } catch {
    console.error("Sign-in attempt failed (telemetry redacted)");
    return NextResponse.json(
      { error: "An unexpected error occurred during sign-in." },
      { status: 500 }
    );
  }
}
