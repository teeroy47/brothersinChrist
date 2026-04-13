import Link from "next/link";

import { ProgressCard, SectionHeader } from "@/components/cards";
import { requireSession } from "@/lib/auth";
import {
  events,
  getGroupById,
  getLevelById,
  getPostsForRole,
  getProgressMetricsForUser,
  getUserById,
  notifications
} from "@/lib/mock-data";
import { formatDateLabel } from "@/lib/utils";

export default async function HomePage() {
  const session = await requireSession();
  const user = getUserById(session.id);

  if (!user) {
    return null;
  }

  const level = getLevelById(user.levelId);
  const group = getGroupById(user.groupId);
  const visiblePosts = getPostsForRole(session.role, user.levelId);
  const upcoming = events.find((event) => event.groupId === user.groupId || event.levelId === user.levelId || event.audience === "all");
  const metrics = getProgressMetricsForUser(user.id);

  return (
    <div className="stack">
      <div className="card card-dark stack">
        <div className="space-between">
          <div className="stack-sm">
            <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>Welcome back</span>
            <h2 className="heading-lg" style={{ margin: 0 }}>{user.profile.firstName || "Brother"}</h2>
            <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>
              {level?.title} · {group?.name}
            </p>
          </div>
          <span className="pill pill-dark">{user.consistencyScore}% consistency</span>
        </div>
        <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>{user.recentActivity}</p>
        <div className="row">
          <Link href="/check-in" className="button-secondary">
            Submit check-in
          </Link>
          <Link href="/progress" className="button-secondary">
            View progress
          </Link>
        </div>
      </div>

      <div className="grid-2">
        <div className="card stack-sm">
          <span className="eyebrow">Today&apos;s devotion</span>
          <strong className="heading-md">{visiblePosts[0]?.title}</strong>
          <p className="muted" style={{ margin: 0 }}>{visiblePosts[0]?.excerpt}</p>
        </div>
        <div className="card stack-sm">
          <span className="eyebrow">Upcoming meeting</span>
          <strong className="heading-md">{upcoming?.title}</strong>
          <p className="muted" style={{ margin: 0 }}>
            {upcoming ? `${formatDateLabel(upcoming.when)} · ${upcoming.location}` : "No upcoming event scheduled."}
          </p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card stack">
          <SectionHeader
            eyebrow="This week"
            title="What should you do next?"
            body="Keep the next act of obedience and accountability clear."
          />
          <div className="grid-2">
            <Link href="/check-in" className="pill">Submit weekly check-in</Link>
            <Link href="/groups" className="pill">Open your group</Link>
            <Link href="/attendance" className="pill">Mark attendance</Link>
            <Link href="/community" className="pill">Read latest teaching</Link>
            <Link href="/groups" className="pill">Message leader or group</Link>
            <Link href="/progress" className="pill">Review progress</Link>
          </div>
        </div>
        <div className="card stack">
          <SectionHeader
            eyebrow="Encouragement"
            title="Brotherhood reminder"
            body="Strength is formed in hidden faithfulness."
          />
          <div className="quote-block">
            <p style={{ margin: 0 }}>
              A disciplined man is not built by pressure alone. He is built by repeated surrender, truth, and brotherhood.
            </p>
          </div>
          <div className="metric">
            <strong>{notifications[0]?.title}</strong>
            <p className="muted" style={{ marginBottom: 0 }}>{notifications[0]?.body}</p>
          </div>
        </div>
      </div>

      <div className="stack">
        <SectionHeader eyebrow="Progress summary" title="Visible growth across the areas that matter." />
        <div className="grid-4">
          {metrics.map((metric) => (
            <ProgressCard key={metric.id} {...metric} />
          ))}
        </div>
      </div>
    </div>
  );
}
