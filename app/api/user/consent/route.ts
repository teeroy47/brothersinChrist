import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { getSessionUserFromRequest } from "@/src/lib/auth-session";

const SUPPORTED_PURPOSES = ["LEADER_OVERVIEW", "PARTNER_SHARING", "EMAIL_REMINDERS"] as const;

/**
 * Symmetric Consent Management (W3C §2.12, ASVS v5.0.0-14.1.3).
 * Enables one-click grant and instant revocation of consent without retention guilt.
 */
export async function GET(req: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(req);
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const consents = await db.userConsent.findMany({
      where: { userId: sessionUser.id },
      orderBy: { grantedAt: "desc" },
    });

    const statusMap: Record<string, boolean> = {
      LEADER_OVERVIEW: true,
      PARTNER_SHARING: true,
      EMAIL_REMINDERS: true,
    };

    for (const c of consents) {
      if (statusMap[c.purposeCode] !== undefined) {
        statusMap[c.purposeCode] = c.granted;
      }
    }

    return NextResponse.json({ consents: statusMap, ledger: consents });
  } catch {
    console.error("Fetch consent failed (telemetry redacted)");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(req);
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { purposeCode, granted } = await req.json();

    if (!SUPPORTED_PURPOSES.includes(purposeCode)) {
      return NextResponse.json({ error: "Unsupported consent purpose" }, { status: 400 });
    }

    const now = new Date();
    const consent = await db.userConsent.create({
      data: {
        userId: sessionUser.id,
        purposeCode,
        granted: Boolean(granted),
        grantedAt: granted ? now : undefined,
        revokedAt: !granted ? now : null,
        policyVersion: "2026.1",
      },
    });

    return NextResponse.json({ success: true, consent });
  } catch {
    console.error("Update consent failed (telemetry redacted)");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
