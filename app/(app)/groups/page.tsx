"use client";

import { useDemoSession } from "@/components/session-provider";
import { getGroupById, getUserById, groups, users } from "@/lib/mock-data";
import { formatDateLabel } from "@/lib/utils";

export default function GroupsPage() {
  const { session } = useDemoSession();
  if (!session) {
    return null;
  }
  const user = getUserById(session.id);
  const activeGroup = user ? getGroupById(user.groupId) : undefined;

  return (
    <div className="stack">
      <div className="card card-dark stack">
        <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>Your discipleship circle</span>
        <h2 className="heading-lg" style={{ margin: 0 }}>{activeGroup?.name}</h2>
        <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>{activeGroup?.summary}</p>
      </div>

      <div className="grid-2">
        {groups.map((group) => {
          const leader = getUserById(group.leaderId);
          const members = group.memberIds.map((id) => users.find((member) => member.id === id)?.profile.firstName).filter(Boolean);

          return (
            <div key={group.id} className="card stack">
              <div className="stack-sm">
                <span className="eyebrow">Small group</span>
                <h3 className="heading-md">{group.name}</h3>
                <p className="muted" style={{ margin: 0 }}>{group.summary}</p>
              </div>
              <div className="metric stack-sm">
                <strong>Leader</strong>
                <span className="muted">{leader?.profile.fullName}</span>
              </div>
              <div className="metric stack-sm">
                <strong>Members</strong>
                <span className="muted">{members.join(", ")}</span>
              </div>
              <div className="metric stack-sm">
                <strong>Next gathering</strong>
                <span className="muted">{formatDateLabel(group.nextMeeting)}</span>
              </div>
              <div className="metric stack-sm">
                <strong>Prayer requests</strong>
                {group.prayerRequests.map((request) => (
                  <span key={request} className="muted">{request}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
