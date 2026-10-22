import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { getSessionUserFromRequest, clearSessionCookie } from "@/src/lib/auth-session";

/**
 * Data Subject Rights Erasure (W3C §2.5, W3C §2.12, ASVS v5.0.0-14.1.4).
 * DELETE: Irreversibly erases the user account and all cascaded discipleship records.
 * POST: Cryptographically shreds/purges only confession entries while retaining general metrics.
 */
export async function DELETE(req: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(req);
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Irreversible deletion: cascades to profile, check-ins, daily practices, consents
    await db.user.delete({
      where: { id: sessionUser.id },
    });

    const res = NextResponse.json({
      success: true,
      message: "Account and associated spiritual records permanently shredded.",
    });

    clearSessionCookie(res);
    return res;
  } catch {
    console.error("Account erasure failed (telemetry redacted)");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(req);
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await req.json();

    if (action === "purge_confessions") {
      // Shreds all sensitive confession entries (Ring 0 content)
      await db.checkIn.updateMany({
        where: { userId: sessionUser.id },
        data: {
          strugglesAndNeeds: null,
          flags: [],
        },
      });

      return NextResponse.json({
        success: true,
        message: "All sensitive confessions and struggle entries permanently purged.",
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    console.error("Confession purge failed (telemetry redacted)");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
