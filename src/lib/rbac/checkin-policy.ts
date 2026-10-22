import { db } from "@/src/lib/db";
import { decryptConfession } from "@/src/lib/crypto-fields";

export interface SerializedCheckIn {
  id: string;
  userId: string;
  weekLabel: string;
  weekStartDate: Date;
  prayerDays: number;
  bibleDays: number;
  attendedMeeting: boolean;
  metAccountability: boolean;
  servingContribution?: string | null;
  strugglesAndNeeds?: string | null;
  praiseReport?: string | null;
  flags?: string[];
  strugglesVisibility?: string;
  praiseVisibility?: string;
  flagsVisibility?: string;
}

/**
 * Enforces relationship-based access control (ReBAC) on check-in records.
 * Conforming to ASVS v5.0.0-8.2.1, ASVS v5.0.0-16.1.1, and W3C §2.8.
 */
export async function authorizeAndFilterCheckIn(
  requestingUserId: string,
  requestingRole: string,
  checkIn: any
): Promise<SerializedCheckIn | null> {
  const isAuthor = requestingUserId === checkIn.userId;

  // 1. Author has unrestricted access to their own data
  if (isAuthor) {
    return {
      ...checkIn,
      strugglesAndNeeds: decryptConfession(checkIn.strugglesAndNeeds),
    };
  }

  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_REGEX.test(requestingUserId) || !UUID_REGEX.test(checkIn.userId)) {
    return null;
  }

  // 2. Check mutual accountability partnership
  const isPartner = await db.accountabilityPartner.findFirst({
    where: {
      status: "active",
      OR: [
        { user1Id: requestingUserId, user2Id: checkIn.userId },
        { user1Id: checkIn.userId, user2Id: requestingUserId },
      ],
    },
  });

  if (isPartner) {
    return {
      id: checkIn.id,
      userId: checkIn.userId,
      weekLabel: checkIn.weekLabel,
      weekStartDate: checkIn.weekStartDate,
      prayerDays: checkIn.prayerDays,
      bibleDays: checkIn.bibleDays,
      attendedMeeting: checkIn.attendedMeeting,
      metAccountability: checkIn.metAccountability,
      servingContribution: checkIn.servingContribution,
      // Only release struggles if scoped to partner or circle
      strugglesAndNeeds:
        checkIn.strugglesVisibility === "PARTNER_ONLY" ||
        checkIn.strugglesVisibility === "CIRCLE_SHARED"
          ? decryptConfession(checkIn.strugglesAndNeeds)
          : null,
      praiseReport: checkIn.praiseReport,
      flags: checkIn.flagsVisibility === "PARTNER_ONLY" ? checkIn.flags : [],
    };
  }

  // 3. Check small group leader oversight
  const isLeader = await db.groupMember.findFirst({
    where: {
      userId: checkIn.userId,
      group: { leaderId: requestingUserId },
    },
  });

  if (isLeader) {
    // Audit leader access in compliance with ASVS v5.0.0-16.1.1 & W3C §2.8
    await db.dataAccessAuditLog.create({
      data: {
        actorId: requestingUserId,
        targetUserId: checkIn.userId,
        recordType: "CHECK_IN",
        recordId: checkIn.id,
        accessReason: "Small group leader care review",
      },
    });

    return {
      id: checkIn.id,
      userId: checkIn.userId,
      weekLabel: checkIn.weekLabel,
      weekStartDate: checkIn.weekStartDate,
      prayerDays: checkIn.prayerDays,
      bibleDays: checkIn.bibleDays,
      attendedMeeting: checkIn.attendedMeeting,
      metAccountability: checkIn.metAccountability,
      servingContribution: checkIn.servingContribution,
      strugglesAndNeeds:
        checkIn.strugglesVisibility === "LEADER_DISCLOSED"
          ? decryptConfession(checkIn.strugglesAndNeeds)
          : null,
      praiseReport: checkIn.praiseReport,
      flags: checkIn.flags, // Pastoral alerts visible to leader
    };
  }

  // 4. Admin oversight access (audited)
  if (requestingRole === "ADMIN") {
    await db.dataAccessAuditLog.create({
      data: {
        actorId: requestingUserId,
        targetUserId: checkIn.userId,
        recordType: "CHECK_IN",
        recordId: checkIn.id,
        accessReason: "Administrative oversight care audit",
      },
    });

    return {
      id: checkIn.id,
      userId: checkIn.userId,
      weekLabel: checkIn.weekLabel,
      weekStartDate: checkIn.weekStartDate,
      prayerDays: checkIn.prayerDays,
      bibleDays: checkIn.bibleDays,
      attendedMeeting: checkIn.attendedMeeting,
      metAccountability: checkIn.metAccountability,
      servingContribution: checkIn.servingContribution,
      strugglesAndNeeds:
        checkIn.strugglesVisibility === "LEADER_DISCLOSED"
          ? decryptConfession(checkIn.strugglesAndNeeds)
          : null,
      praiseReport: checkIn.praiseReport,
      flags: checkIn.flags,
    };
  }

  // Access Denied: User has no relation to this record
  return null;
}
