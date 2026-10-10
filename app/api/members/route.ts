import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { hashPassword } from "@/src/lib/auth-server";
import { getSessionUserFromRequest } from "@/src/lib/auth-session";

// Role code → roleId lookup (mirrors the seed data)
const ROLE_CODE_TO_ID: Record<string, number> = {
  MEMBER: 10,
  GROUP_LEADER: 20,
  LEVEL_LEADER: 30,
  ADMIN: 40,
};

/**
 * Remediates SEC-03 (Unauthenticated PII Harvest).
 * Enforces authentication and prunes response payload per role (ASVS v5.0.0-4.1.1, W3C §2.1, W3C §2.2).
 */
export async function GET(req: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(req);
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isLeaderOrAdmin = ["ADMIN", "GROUP_LEADER", "LEVEL_LEADER"].includes(sessionUser.role);

    const users = await db.user.findMany({
      include: {
        role: true,
        profile: true,
        currentLevel: true,
        growthScore: true,
        memberships: {
          include: { group: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = users.map((u) => {
      // Standard members only see anonymized community cards (ASVS v5.0.0-4.1.1, W3C §2.1)
      if (!isLeaderOrAdmin) {
        return {
          id: u.id,
          firstName: u.profile?.firstName ?? "Brother",
          levelNumber: u.currentLevel?.levelNumber ?? 1,
          levelTitle: u.currentLevel?.title ?? "Level 1",
          groupName: u.memberships[0]?.group?.name ?? "General Brotherhood",
        };
      }

      // Leaders receive operational oversight fields, but NOT private testimonies or phone/city
      return {
        id: u.id,
        email: u.email,
        name: u.profile?.fullName ?? u.email,
        firstName: u.profile?.firstName ?? "Brother",
        role: u.role.code,
        levelNumber: u.currentLevel?.levelNumber ?? 1,
        levelTitle: u.currentLevel?.title ?? "Level 1",
        groupName: u.memberships[0]?.group?.name ?? "Unassigned",
        consistencyScore: u.growthScore?.overallConsistency ?? 100,
        createdAt: u.createdAt,
      };
    });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Fetch members error (redacted)");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * Authenticated admin endpoint for provisioning new members.
 */
export async function POST(req: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(req);
    if (!sessionUser || sessionUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized: Administrator privileges required." },
        { status: 403 }
      );
    }

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

    const roleCode = typeof role === "string" && role in ROLE_CODE_TO_ID ? role : "MEMBER";
    const roleId = ROLE_CODE_TO_ID[roleCode];

    const targetLevelNum = Number(levelNumber) || 1;
    const level = await db.level.findUnique({
      where: { levelNumber: targetLevelNum },
    });

    const trimmedName = String(fullName).trim();
    const firstName = trimmedName.split(" ")[0] || trimmedName;
    const defaultPass = password ? String(password) : "bic2026StrongPass!";
    const hashedPassword = hashPassword(defaultPass);

    const newUser = await db.user.create({
      data: {
        email: normalizedEmail,
        passwordHash: hashedPassword,
        roleId,
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
        role: true,
        profile: true,
        currentLevel: true,
      },
    });

    return NextResponse.json(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.profile?.fullName,
        role: newUser.role.code,
        levelTitle: newUser.currentLevel?.title,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create member error (redacted)");
    return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
  }
}
