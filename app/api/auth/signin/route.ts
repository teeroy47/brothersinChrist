import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { verifyPassword } from "@/src/lib/auth-server";

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
        { error: "No account found with this email address." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.profile?.fullName ?? user.email,
      firstName: user.profile?.firstName ?? "Brother",
      role: user.role,
      levelNumber: user.currentLevel?.levelNumber ?? 1,
      levelTitle: user.currentLevel?.title ?? "Level 1: New Believers",
      groupName: user.memberships[0]?.group?.name ?? "General Brotherhood",
      church: user.profile?.church ?? "Brothers In Christ Global",
      consistencyScore: user.growthScore?.overallConsistency ?? 100,
    };

    return NextResponse.json({ user: sessionUser });
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during sign-in." },
      { status: 500 }
    );
  }
}
