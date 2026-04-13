"use client";

import { LeaderGate } from "@/components/auth-gate";
import { useDemoSession } from "@/components/session-provider";
import {
  groups,
  leaderReports,
  submissions,
  users
} from "@/lib/mock-data";

export default function LeaderPage() {
  const { session } = useDemoSession();
  if (!session) {
    return null;
  }

  return (
    <LeaderGate>
      <div className="stack">
      <div className="card card-dark stack">
        <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>Leader space</span>
        <h2 className="heading-lg" style={{ margin: 0 }}>Operational oversight for groups, levels, and follow-up.</h2>
        <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>
          Signed in as {session.name}. Use this space to identify disengagement early and shepherd men with clarity.
        </p>
      </div>

      <div className="grid-2">
        <div className="card stack">
          <strong className="heading-md">Brothers needing attention</strong>
          {leaderReports[0].memberIdsNeedingFollowUp.map((memberId) => {
            const member = users.find((user) => user.id === memberId);
            return (
              <div key={memberId} className="metric stack-sm">
                <strong>{member?.profile.fullName}</strong>
                <span className="muted">{member?.recentActivity}</span>
                <span className="pill">Flag for follow-up</span>
              </div>
            );
          })}
        </div>
        <div className="card stack">
          <strong className="heading-md">Check-in review</strong>
          {submissions.map((submission) => {
            const member = users.find((user) => user.id === submission.userId);
            return (
              <div key={submission.id} className="metric stack-sm">
                <strong>{member?.profile.fullName}</strong>
                <span className="muted">{submission.weekLabel}</span>
                <span className="muted">{submission.flags.length ? submission.flags.join(" · ") : "Healthy consistency signal"}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid-2">
        <div className="card stack">
          <strong className="heading-md">Group activity overview</strong>
          {groups.map((group) => (
            <div key={group.id} className="metric stack-sm">
              <strong>{group.name}</strong>
              <span className="muted">{group.memberIds.length} brothers assigned</span>
              <span className="muted">{group.summary}</span>
            </div>
          ))}
        </div>
        <div className="card stack">
          <strong className="heading-md">Prayer and support needs</strong>
          {leaderReports[0].prayerNeeds.map((need) => (
            <div key={need} className="metric stack-sm">
              <strong>{need}</strong>
              <span className="muted">Carry this into leader prayer and direct follow-up.</span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </LeaderGate>
  );
}
