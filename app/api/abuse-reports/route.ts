import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { getSessionUserFromRequest } from "@/src/lib/auth-session";

/**
 * In-context Community Safety & Abuse Reporting (W3C §2.9, ASVS v5.0.0-2.1.1).
 * Allows brothers to confidentially flag harassment or concerning messages to safeguarding ministers.
 */
export async function POST(req: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(req);
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reportedUserId, contextType, details } = await req.json();

    if (!details || String(details).trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a brief explanation for the report (at least 5 characters)." },
        { status: 400 }
      );
    }

    const report = await db.abuseReport.create({
      data: {
        reporterId: sessionUser.id,
        reportedUserId: reportedUserId || null,
        contextType: contextType || "CIRCLE_MESSAGE",
        details: String(details).trim(),
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        reportId: report.id,
        message:
          "Report submitted securely to safeguarding leadership. Thank you for protecting the brotherhood.",
      },
      { status: 201 }
    );
  } catch {
    console.error("Abuse report submission failed (telemetry redacted)");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
