import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/src/lib/db";
import { hashPassword } from "@/src/lib/auth-server";

export async function GET() {
  try {
    const users = await db.user.findMany({
      include: {
        profile: true,
        currentLevel: true,
        growthScore: true,
        memberships: {
          include: { group: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.profile?.fullName ?? u.email,
      firstName: u.profile?.firstName ?? "Brother",
      role: u.role,
      levelNumber: u.currentLevel?.levelNumber ?? 1,
      levelTitle: u.currentLevel?.title ?? "Level 1: New Believers",
      groupName: u.memberships[0]?.group?.name ?? "Unassigned",
      church: u.profile?.church ?? "Brothers In Christ",
      occupation: u.profile?.occupation ?? "Brother",
      phone: u.profile?.phone ?? "",
      city: u.profile?.city ?? "Harare",
      consistencyScore: u.growthScore?.overallConsistency ?? 100,
      createdAt: u.createdAt,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Fetch members error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, password, role, levelNumber, phone, city, church, occupation } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const existing = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 400 }
      );
    }

    // Find requested level or default to Level 1
    const targetLevelNum = Number(levelNumber) || 1;
    const level = await db.level.findUnique({
      where: { levelNumber: targetLevelNum },
    });

    const userRole = (role in Role ? role : Role.MEMBER) as Role;
    const trimmedName = String(fullName).trim();
    const firstName = trimmedName.split(" ")[0] || trimmedName;
    const defaultPass = password ? String(password) : "bic2026";
    const hashedPassword = hashPassword(defaultPass);

    const newUser = await db.user.create({
      data: {
        email: normalizedEmail,
        passwordHash: hashedPassword,
        role: userRole,
        currentLevelId: level?.id,
        profile: {
          create: {
            fullName: trimmedName,
            firstName,
            phone: phone ? String(phone).trim() : null,
            city: city ? String(city).trim() : "Harare",
            church: church ? String(church).trim() : "Brothers In Christ",
            occupation: occupation ? String(occupation).trim() : "Brother",
          },
        },
        growthScore: {
          create: {
            overallConsistency: 100,
            prayerScore: 7,
            bibleScore: 7,
            attendanceScore: 10,
            accountabilityScore: 10,
            recentActivity: "Account initialized by Admin.",
          },
        },
      },
      include: {
        profile: true,
        currentLevel: true,
      },
    });

    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.profile?.fullName,
      role: newUser.role,
      levelTitle: newUser.currentLevel?.title,
    }, { status: 201 });
  } catch (error) {
    console.error("Create member error:", error);
    return NextResponse.json(
      { error: "Failed to create user." },
      { status: 500 }
    );
  }
}
