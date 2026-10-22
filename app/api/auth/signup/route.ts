import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { hashPassword } from "@/src/lib/auth-server";
import { setSessionCookie } from "@/src/lib/auth-session";

/**
 * Public self-registration endpoint.
 * Remediates SEC-06 (Race condition: first registrant auto-elevation to admin) and SEC-05 (weak passwords).
 * Conforming to ASVS v5.0.0-6.1.1 (>= 12 characters) and ASVS v5.0.0-8.1.2.
 */
export async function POST(req: Request) {
  try {
    const { fullName, email, password, phone, city, church } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full name, email, and password are required." },
        { status: 400 }
      );
    }

    // ASVS v5.0.0-6.1.1 Minimum password length enforcement
    if (String(password).length < 12) {
      return NextResponse.json(
        { error: "Password must be at least 12 characters." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    // Check if user already exists
    const existing = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in." },
        { status: 400 }
      );
    }

    // INVARIANT: All public self-registrations receive MEMBER role (roleId = 10).
    // Admins and leaders must be provisioned via database seed or verified admin console.
    const roleId = 10;
    const level1 = await db.level.findUnique({ where: { levelNumber: 1 } });
    const currentLevelId = level1?.id ?? null;

    const trimmedName = String(fullName).trim();
    const firstName = trimmedName.split(" ")[0] || trimmedName;
    const hashedPassword = hashPassword(String(password));

    // Create user with profile and growth score
    const newUser = await db.user.create({
      data: {
        email: normalizedEmail,
        passwordHash: hashedPassword,
        roleId,
        currentLevelId,
        profile: {
          create: {
            fullName: trimmedName,
            firstName,
            phone: phone ? String(phone).trim() : null,
            city: city ? String(city).trim() : "Harare",
            church: church ? String(church).trim() : "Brothers In Christ",
            occupation: "Brother",
          },
        },
        growthScore: {
          create: {
            overallConsistency: 100,
            prayerScore: 7,
            bibleScore: 7,
            attendanceScore: 10,
            accountabilityScore: 10,
            recentActivity: "Created profile and joined the brotherhood.",
          },
        },
      },
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

    const sessionUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.profile?.fullName ?? newUser.email,
      firstName: newUser.profile?.firstName ?? "Brother",
      role: newUser.role.code, // "MEMBER"
      levelNumber: newUser.currentLevel?.levelNumber ?? 1,
      levelTitle: newUser.currentLevel?.title ?? "Level 1: New Believers",
      groupName: newUser.memberships[0]?.group?.name ?? "General Brotherhood",
      church: newUser.profile?.church ?? "Brothers In Christ Global",
      consistencyScore: newUser.growthScore?.overallConsistency ?? 100,
    };

    const res = NextResponse.json({ user: sessionUser }, { status: 201 });
    // Issue HTTP-only, Secure, SameSite=Lax session cookie (ASVS v5.0.0-7.1.1)
    setSessionCookie(res, sessionUser);
    return res;
  } catch (error) {
    console.error("Sign-up failed (telemetry redacted)");
    return NextResponse.json(
      { error: "An unexpected error occurred during registration." },
      { status: 500 }
    );
  }
}
