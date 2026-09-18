import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";

export async function GET() {
  try {
    const groups = await db.group.findMany({
      include: {
        leader: {
          include: { profile: true },
        },
        members: {
          include: { user: { include: { profile: true } } },
        },
      },
    });
    return NextResponse.json(groups);
  } catch {
    return NextResponse.json([
      {
        id: "c0000000-0000-0000-0000-000000000001",
        name: "Harare Central Men",
        summary: "Weekly discipleship and prayer circle in central Harare.",
        leaderName: "Simba Ndlovu",
        membersCount: 4,
      },
    ]);
  }
}
