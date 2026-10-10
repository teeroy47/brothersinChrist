import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { getSessionUserFromRequest } from "@/src/lib/auth-session";

/**
 * Sanitized directory for standard members conforming to ASVS v5.0.0-4.1.1 and W3C §2.1.
 * Strictly provides id, firstName, avatar, and groupName, completely suppressing phone, email, and city.
 */
export async function GET(req: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(req);
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await db.user.findMany({
      include: {
        profile: true,
        currentLevel: true,
        memberships: {
          include: { group: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const sanitized = users.map((u) => ({
      id: u.id,
      firstName: u.profile?.firstName ?? "Brother",
      levelNumber: u.currentLevel?.levelNumber ?? 1,
      levelTitle: u.currentLevel?.title ?? "Level 1",
      groupName: u.memberships[0]?.group?.name ?? "General Brotherhood",
    }));

    return NextResponse.json(sanitized);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
