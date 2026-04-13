"use client";

import { useDemoSession } from "@/components/session-provider";
import { getGroupById, getLevelById, getUserById } from "@/lib/mock-data";

export default function ProfilePage() {
  const { session } = useDemoSession();
  if (!session) {
    return null;
  }
  const user = getUserById(session.id);

  if (!user) {
    return null;
  }

  const level = getLevelById(user.levelId);
  const group = getGroupById(user.groupId);
  const partner = user.accountabilityPartnerId ? getUserById(user.accountabilityPartnerId) : undefined;

  return (
    <div className="stack">
      <div className="card card-dark stack">
        <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>Profile</span>
        <h2 className="heading-lg" style={{ margin: 0 }}>{user.profile.fullName}</h2>
        <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>
          {user.profile.city} · {user.profile.church} · {user.profile.occupation}
        </p>
      </div>

      <div className="grid-2">
        <div className="card stack">
          <strong className="heading-md">Identity and placement</strong>
          <div className="metric stack-sm">
            <span className="muted">Level</span>
            <strong>{level?.title}</strong>
          </div>
          <div className="metric stack-sm">
            <span className="muted">Group</span>
            <strong>{group?.name}</strong>
          </div>
          <div className="metric stack-sm">
            <span className="muted">Accountability partner</span>
            <strong>{partner?.profile.fullName ?? "To be assigned"}</strong>
          </div>
        </div>

        <div className="card stack">
          <strong className="heading-md">Goals</strong>
          <div className="metric stack-sm">
            <span className="muted">Spiritual</span>
            {user.profile.spiritualGoals?.map((goal) => (
              <span key={goal}>{goal}</span>
            ))}
          </div>
          <div className="metric stack-sm">
            <span className="muted">Fitness / discipline</span>
            {user.profile.fitnessGoals?.map((goal) => (
              <span key={goal}>{goal}</span>
            )) ?? <span>None recorded yet.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
