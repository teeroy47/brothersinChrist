import { NextResponse } from "next/server";
import { checkInSchema } from "@/src/lib/validation/checkin.schema";
import { db } from "@/src/lib/db";
import { authorizeAndFilterCheckIn } from "@/src/lib/rbac/checkin-policy";
import { getSessionUserFromRequest } from "@/src/lib/auth-session";
import { encryptConfession } from "@/src/lib/crypto-fields";

/**
 * Handles creation and updates of check-ins with identity binding and AES-256-GCM encryption.
 * Remediates SEC-01, SEC-02, SEC-08, and conforms to ASVS v5.0.0-8.2.1 & ASVS v5.0.0-11.2.1.
 */
export async function POST(req: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(req);
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const parsed = checkInSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // INVARIANT: Encrypt sensitive spiritual confessions (Ring 0) at rest using AES-256-GCM
    const encryptedStruggles = data.strugglesAndNeeds
      ? encryptConfession(data.strugglesAndNeeds)
      : null;

    // INVARIANT: Overwrite client-supplied userId with authenticated session userId
    const created = await db.checkIn.upsert({
      where: {
        userId_weekLabel: {
          userId: sessionUser.id,
          weekLabel: data.weekLabel,
        },
      },
      update: {
        prayerDays: data.prayerDays,
        bibleDays: data.bibleDays,
        attendedMeeting: data.attendedMeeting,
        metAccountability: data.metAccountability,
        servingContribution: data.servingContribution,
        strugglesAndNeeds: encryptedStruggles,
        strugglesVisibility: data.strugglesVisibility,
        praiseReport: data.praiseReport,
        praiseVisibility: data.praiseVisibility,
        flags: data.flags,
        flagsVisibility: data.flagsVisibility,
      },
      create: {
        userId: sessionUser.id,
        weekLabel: data.weekLabel,
        weekStartDate: new Date(),
        prayerDays: data.prayerDays,
        bibleDays: data.bibleDays,
        attendedMeeting: data.attendedMeeting,
        metAccountability: data.metAccountability,
        servingContribution: data.servingContribution,
        strugglesAndNeeds: encryptedStruggles,
        strugglesVisibility: data.strugglesVisibility,
        praiseReport: data.praiseReport,
        praiseVisibility: data.praiseVisibility,
        flags: data.flags,
        flagsVisibility: data.flagsVisibility,
      },
    });

    // Update Growth Score in PostgreSQL
    const consistency = Math.round(
      ((data.prayerDays + data.bibleDays) / 14) * 50 +
        (data.attendedMeeting ? 25 : 0) +
        (data.metAccountability ? 25 : 0)
    );

    await db.growthScore.upsert({
      where: { userId: sessionUser.id },
      update: {
        overallConsistency: consistency,
        prayerScore: data.prayerDays,
        bibleScore: data.bibleDays,
        attendanceScore: data.attendedMeeting ? 10 : 0,
        accountabilityScore: data.metAccountability ? 10 : 0,
        recentActivity: `Submitted check-in for ${data.weekLabel}.`,
      },
      create: {
        userId: sessionUser.id,
        overallConsistency: consistency,
        prayerScore: data.prayerDays,
        bibleScore: data.bibleDays,
        attendanceScore: data.attendedMeeting ? 10 : 0,
        accountabilityScore: data.metAccountability ? 10 : 0,
        recentActivity: `Submitted check-in for ${data.weekLabel}.`,
      },
    });

    return NextResponse.json({ success: true, checkIn: created }, { status: 201 });
  } catch (error) {
    // ASVS v5.0.0-16.2.1 Negative Logging: Redact confession text and PII from server logs
    console.error("Check-in submission failed (telemetry redacted)");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * Retrieves check-ins scoped strictly through ReBAC authorization.
 * Remediates SEC-01 BOLA / IDOR vulnerability.
 */
export async function GET(req: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(req);
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get("userId") || sessionUser.id;

    // If requesting another user's check-ins, verify relationship first
    if (targetUserId !== sessionUser.id) {
      const isPartner = await db.accountabilityPartner.findFirst({
        where: {
          status: "active",
          OR: [
            { user1Id: sessionUser.id, user2Id: targetUserId },
            { user1Id: targetUserId, user2Id: sessionUser.id },
          ],
        },
      });

      const isLeader = await db.groupMember.findFirst({
        where: {
          userId: targetUserId,
          group: { leaderId: sessionUser.id },
        },
      });

      const isAdmin = sessionUser.role === "ADMIN";

      if (!isPartner && !isLeader && !isAdmin) {
        return NextResponse.json(
          { error: "Forbidden: Not authorized to access this member's check-ins" },
          { status: 403 }
        );
      }
    }

    // Fetch records for the authorized target user
    const checkIns = await db.checkIn.findMany({
      where: { userId: targetUserId },
      orderBy: { createdAt: "desc" },
    });

    const authorizedList = [];
    for (const chk of checkIns) {
      const filtered = await authorizeAndFilterCheckIn(sessionUser.id, sessionUser.role, chk);
      if (filtered) {
        authorizedList.push(filtered);
      }
    }

    return NextResponse.json(authorizedList);
  } catch {
    console.error("Check-in query failed (telemetry redacted)");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
