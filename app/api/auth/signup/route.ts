import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/src/lib/db";
import { hashPassword } from "@/src/lib/auth-server";

export async function POST(req: Request) {
  try {
    const { fullName, email, password, phone, city, church } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full name, email, and password are required." },
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

    // Determine role & formation level
    const userCount = await db.user.count();
    const isFirstUser = userCount === 0;

    // Fetch Level 1 and Level 5
    const [level1, level5] = await Promise.all([
      db.level.findUnique({ where: { levelNumber: 1 } }),
      db.level.findUnique({ where: { levelNumber: 5 } }),
    ]);

    const role = isFirstUser ? Role.ADMIN : Role.MEMBER;
    const currentLevel = isFirstUser ? level5 ?? level1 : level1;
    const currentLevelId = currentLevel?.id ?? null;

    const trimmedName = String(fullName).trim();
    const firstName = trimmedName.split(" ")[0] || trimmedName;
    const hashedPassword = hashPassword(String(password));

    // Create user with profile and growth score
    const newUser = await db.user.create({
      data: {
        email: normalizedEmail,
        passwordHash: hashedPassword,
        role,
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
      role: newUser.role,
      levelNumber: newUser.currentLevel?.levelNumber ?? 1,
      levelTitle: newUser.currentLevel?.title ?? "Level 1: New Believers",
      groupName: newUser.memberships[0]?.group?.name ?? "General Brotherhood",
      church: newUser.profile?.church ?? "Brothers In Christ Global",
      consistencyScore: newUser.growthScore?.overallConsistency ?? 100,
    };

    return NextResponse.json({ user: sessionUser }, { status: 201 });
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during registration." },
      { status: 500 }
    );
  }
}
