import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { getSessionUserFromRequest } from "@/src/lib/auth-session";

/**
 * Remediates SEC-03 (Unauthenticated Group Hierarchy & Nested Profile PII Dumps).
 * Enforces authentication and strips intimate testimonies and contact data (ASVS v5.0.0-4.1.1, W3C §2.7).
 */
export async function GET(req: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(req);
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isLeaderOrAdmin = ["ADMIN", "GROUP_LEADER", "LEVEL_LEADER"].includes(sessionUser.role);

    const groups = await db.group.findMany({
      include: {
        leader: {
          include: { profile: true },
        },
        members: {
          include: {
            user: {
              include: { profile: true, currentLevel: true },
            },
            groupRole: true,
          },
        },
      },
    });

    const sanitized = groups.map((g) => ({
      id: g.id,
      name: g.name,
      summary: g.summary,
      leaderName: g.leader?.profile?.fullName ?? "Group Leader",
      membersCount: g.members.length,
      members: g.members.map((m) => {
        if (!isLeaderOrAdmin) {
          return {
            id: m.userId,
            firstName: m.user?.profile?.firstName ?? "Brother",
            levelNumber: m.user?.currentLevel?.levelNumber ?? 1,
            role: m.groupRole?.label ?? "Member",
          };
        }
        return {
          id: m.userId,
          name: m.user?.profile?.fullName ?? m.user?.email,
          firstName: m.user?.profile?.firstName ?? "Brother",
          role: m.groupRole?.label ?? "Member",
          levelNumber: m.user?.currentLevel?.levelNumber ?? 1,
        };
      }),
    }));

    return NextResponse.json(sanitized);
  } catch {
    console.error("Groups query failed (telemetry redacted)");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
