import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { getSessionUserFromRequest } from "@/src/lib/auth-session";
import { decryptConfession } from "@/src/lib/crypto-fields";

/**
 * Data Subject Rights Export (W3C §2.5, ASVS v5.0.0-14.1.4).
 * Returns complete structured JSON archive of member profile, daily practices, check-ins, and attendance.
 */
export async function GET(req: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(req);
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: sessionUser.id },
      include: {
        profile: true,
        role: true,
        currentLevel: true,
        growthScore: true,
        memberships: {
          include: { group: true },
        },
        dailyPractices: {
          orderBy: { practiceDate: "desc" },
        },
        checkIns: {
          orderBy: { weekStartDate: "desc" },
        },
        attendances: {
          orderBy: { createdAt: "desc" },
        },
        consents: {
          orderBy: { grantedAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Decrypt Ring 0 struggles for the exporting user
    const decryptedCheckIns = user.checkIns.map((ci) => ({
      ...ci,
      strugglesAndNeeds: decryptConfession(ci.strugglesAndNeeds),
    }));

    const archive = {
      exportMetadata: {
        exportDate: new Date().toISOString(),
        standard: "W3C Privacy Principles §2.5 & OWASP ASVS v5.0.0-14.1.4",
        userId: user.id,
      },
      identity: {
        email: user.email,
        role: user.role.code,
        joinedAt: user.joinedAt,
        level: user.currentLevel?.title,
        profile: user.profile,
      },
      discipleshipMetrics: {
        growthScore: user.growthScore,
        dailyPractices: user.dailyPractices,
        checkIns: decryptedCheckIns,
        attendances: user.attendances,
      },
      memberships: user.memberships.map((m) => ({
        groupId: m.groupId,
        groupName: m.group.name,
        joinedAt: m.joinedAt,
      })),
      consentLedger: user.consents,
    };

    return new NextResponse(JSON.stringify(archive, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="bic-data-archive-${user.id}.json"`,
      },
    });
  } catch {
    console.error("Data archive export failed (telemetry redacted)");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
