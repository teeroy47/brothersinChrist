"use client";

import Link from "next/link";
import { PhoneCall } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { ProgressCard, SectionHeader } from "@/components/cards";
import { DailyTracker } from "@/components/daily-tracker";
import { useDemoSession } from "@/components/session-provider";
import {
  events,
  getAccountabilityPartner,
  getGroupById,
  getLevelById,
  getPostsForRole,
  getProgressMetricsForUser,
  getUserById,
  notifications,
} from "@/lib/mock-data";
import { formatDateLabel } from "@/lib/utils";

export default function HomePage() {
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
  const partner = getAccountabilityPartner(user.id);
  const visiblePosts = getPostsForRole(session.role, user.levelId);
  const upcoming = events.find(
    (event) =>
      event.groupId === user.groupId ||
      event.levelId === user.levelId ||
      event.audience === "all",
  );
  const metrics = getProgressMetricsForUser(user.id);

  return (
    <div className="stack">
      {/* Hero Welcome Card */}
      <div className="card card-dark stack">
        <div className="space-between">
          <div className="stack-sm">
            <BrandMark compact />
            <span
              className="eyebrow"
              style={{ color: "rgba(255,255,255,.65)" }}
            >
              Welcome back
            </span>
            <h2 className="heading-lg" style={{ margin: 0 }}>
              {user.profile.firstName || "Brother"}
            </h2>
            <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>
              {level?.title} · {group?.name}
            </p>
          </div>
          <span className="pill pill-dark">
            {user.consistencyScore}% consistency
          </span>
        </div>
        <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>
          {user.recentActivity}
        </p>
        <div className="scripture-lockup">
          <span className="eyebrow" style={{ color: "rgba(255,255,255,.68)" }}>
            Proverbs 27:17 Core Scripture
          </span>
          <strong>Iron sharpens iron.</strong>
          <p style={{ color: "rgba(255,255,255,.76)", margin: "8px 0 0" }}>
            To sharpen each other daily into the full image of Christ.
          </p>
        </div>
        <div className="row">
          <Link href="/check-in" className="button-secondary">
            Submit check-in
          </Link>
          <Link href="/progress" className="button-secondary">
            View progress
          </Link>
        </div>
      </div>

      {/* The 4 Pillars Tracker & Accountability Partner */}
      <div className="grid-2">
        <DailyTracker />

        <div className="stack">
          {/* Accountability Partner Card */}
          {partner && (
            <div className="card stack">
              <div className="space-between">
                <div>
                  <span className="eyebrow">Personal Support System</span>
                  <h3 className="heading-md" style={{ margin: 0 }}>
                    Accountability Partner
                  </h3>
                </div>
                <span className="pill">{partner.consistencyScore}% score</span>
              </div>

              <div className="metric stack-sm">
                <strong>{partner.profile.fullName}</strong>
                <span className="muted">
                  {partner.profile.church} · {partner.profile.city}
                </span>
                <p
                  className="muted"
                  style={{ margin: "4px 0 0", fontStyle: "italic" }}
                >
                  &ldquo;{partner.recentActivity}&rdquo;
                </p>
              </div>

              <div className="row">
                <a
                  href={`tel:${partner.profile.phone}`}
                  className="pill pill-dark row"
                  style={{
                    gap: 6,
                    textDecoration: "none",
                    alignItems: "center",
                  }}
                >
                  <PhoneCall size={14} /> Call Brother
                </a>
                <span className="pill">Iron Sharpens Iron</span>
              </div>
            </div>
          )}

          {/* Devotion Snapshot */}
          <div className="card stack-sm">
            <span className="eyebrow">Today&apos;s devotion</span>
            <strong className="heading-md">{visiblePosts[0]?.title}</strong>
            <p className="muted" style={{ margin: 0 }}>
              {visiblePosts[0]?.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Gatherings & Attendance */}
      <div className="grid-2">
        <div className="card stack-sm">
          <span className="eyebrow">Upcoming gathering</span>
          <strong className="heading-md">{upcoming?.title}</strong>
          <p className="muted" style={{ margin: 0 }}>
            {upcoming
              ? `${formatDateLabel(upcoming.when)} · ${upcoming.location}`
              : "No upcoming event scheduled."}
          </p>
          <div style={{ marginTop: 8 }}>
            <Link href="/attendance" className="pill">
              Mark attendance (Mon/Thu)
            </Link>
          </div>
        </div>

        <div className="card stack">
          <SectionHeader
            eyebrow="Brotherhood reminder"
            title="Standing firm"
            body="A disciplined man is not built by pressure alone. He is built by repeated surrender, truth, and brotherhood."
          />
          <div className="metric">
            <strong>{notifications[0]?.title}</strong>
            <p className="muted" style={{ marginBottom: 0 }}>
              {notifications[0]?.body}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pillars Growth Summary */}
      <div className="stack">
        <SectionHeader
          eyebrow="Growth score"
          title="Visible growth across the 4 Pillars (God, Mind, Body, Life)."
        />
        <div className="grid-4">
          {metrics.map((metric) => (
            <ProgressCard key={metric.id} {...metric} />
          ))}
        </div>
      </div>
    </div>
  );
}
