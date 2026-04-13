import { requireSession } from "@/lib/auth";
import { groups, levels, notifications, users } from "@/lib/mock-data";

export default async function AdminPage() {
  const session = await requireSession();

  return (
    <div className="stack">
      <div className="card card-dark stack">
        <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>Admin oversight</span>
        <h2 className="heading-lg" style={{ margin: 0 }}>Manage the full BIC system with minimal friction.</h2>
        <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>
          Signed in as {session.name}. Assign levels, groups, leaders, recurring events, and system-wide content from one operational surface.
        </p>
      </div>

      <div className="grid-3">
        <div className="card stack-sm">
          <span className="eyebrow">Members</span>
          <strong className="heading-md">{users.length}</strong>
          <span className="muted">Total users across members and leaders</span>
        </div>
        <div className="card stack-sm">
          <span className="eyebrow">Groups</span>
          <strong className="heading-md">{groups.length}</strong>
          <span className="muted">Active discipleship circles</span>
        </div>
        <div className="card stack-sm">
          <span className="eyebrow">Levels</span>
          <strong className="heading-md">{levels.length}</strong>
          <span className="muted">Structured progression stages</span>
        </div>
      </div>

      <div className="grid-2">
        <div className="card stack">
          <strong className="heading-md">User and assignment management</strong>
          {users.map((user) => (
            <div key={user.id} className="metric space-between">
              <div className="stack-sm" style={{ gap: 4 }}>
                <strong>{user.profile.fullName}</strong>
                <span className="muted">
                  {user.role.replace("_", " ")} · {user.levelId} · {user.groupId}
                </span>
              </div>
              <span className="pill">Manage</span>
            </div>
          ))}
        </div>

        <div className="card stack">
          <strong className="heading-md">System configuration</strong>
          <div className="metric stack-sm">
            <strong>Recurring events</strong>
            <span className="muted">Monday meetings, Thursday meetings, group gatherings, and special sessions.</span>
          </div>
          <div className="metric stack-sm">
            <strong>Notifications</strong>
            {notifications.map((item) => (
              <span key={item.id} className="muted">{item.title}</span>
            ))}
          </div>
          <div className="metric stack-sm">
            <strong>Content controls</strong>
            <span className="muted">Pin content, remove unsuitable posts, and manage post categories.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
