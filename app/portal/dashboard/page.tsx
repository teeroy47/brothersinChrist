"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { PortalShell } from "@/src/components/portal/PortalShell";
import { useAuthStore } from "@/src/stores/auth-store";

export default function MemberDashboardPage() {
  const { currentUser } = useAuthStore();
  const consistencyScore = currentUser?.consistencyScore ?? 100;
  const groupName = currentUser?.groupName ?? "Oversight Circle";

  return (
    <PortalShell
      title="Brotherhood Dashboard"
      subtitle="Stay grounded in prayer, disciplined in the Word, and accountable in community."
    >
      <div className="stack" style={{ gap: 24 }}>
        {/* -------------------------------------------------------------------- */}
        {/* 1. Daily Scripture Anchor & Devotional Focus Section (Flat)          */}
        {/* -------------------------------------------------------------------- */}
        <div className="section-flat-dark stack">
          <div className="space-between" style={{ alignItems: "flex-start" }}>
            <div className="stack-sm" style={{ maxWidth: 680 }}>
              <div className="row" style={{ gap: 8 }}>
                <span className="data-label" style={{ color: "var(--gold)" }}>
                  Proverbs 27:17 · Core Scripture
                </span>
              </div>
              <h2 className="heading-lg" style={{ color: "#ffffff" }}>
                "As iron sharpens iron, so one man sharpens another."
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
                Discipleship is not solitary. God forms kingdom men through honest brotherhood, daily surrender, and mutual strengthening.
              </p>
            </div>

            <div className="row" style={{ gap: 10, alignSelf: "flex-start" }}>
              <Link
                href="/portal/check-in"
                className="button"
                style={{ background: "var(--gold)", color: "#000", fontWeight: 800 }}
              >
                <span>Weekly Check-in</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/portal/devotions"
                className="button-secondary"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.25)"
                }}
              >
                <BookOpen size={16} style={{ color: "var(--gold)" }} />
                <span>Today's Devotion</span>
              </Link>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* 2. Discipleship Indicators (Discrete Repeatable Metric Cards)        */}
        {/* -------------------------------------------------------------------- */}
        <div className="grid-4">
          <div className="card stack-sm">
            <div className="space-between">
              <span className="data-label">Consistency</span>
              <span className="pill" style={{ padding: "2px 8px", minHeight: 24, fontSize: "0.72rem", color: "var(--accent)" }}>
                Strong
              </span>
            </div>
            <strong className="data-value">
              {consistencyScore}%
            </strong>
            <div className="progress">
              <span style={{ width: `${consistencyScore}%` }} />
            </div>
            <span className="data-detail">
              Active rhythm across disciplines
            </span>
          </div>

          <div className="card stack-sm">
            <div className="space-between">
              <span className="data-label">Prayer Rhythm</span>
              <CheckCircle2 size={16} style={{ color: "var(--accent)" }} />
            </div>
            <strong className="data-value">
              5 / 7 days
            </strong>
            <div className="progress">
              <span style={{ width: "71%" }} />
            </div>
            <span className="data-detail">
              Target: Daily communion
            </span>
          </div>

          <div className="card stack-sm">
            <div className="space-between">
              <span className="data-label">Scripture Study</span>
              <CheckCircle2 size={16} style={{ color: "var(--accent)" }} />
            </div>
            <strong className="data-value">
              4 / 7 days
            </strong>
            <div className="progress">
              <span style={{ width: "57%" }} />
            </div>
            <span className="data-detail">
              Proverbs 30-Day Plan
            </span>
          </div>

          <div className="card stack-sm">
            <div className="space-between">
              <span className="data-label">Attendance</span>
              <Users size={16} style={{ color: "var(--accent)" }} />
            </div>
            <strong className="data-value">
              100%
            </strong>
            <div className="progress">
              <span style={{ width: "100%" }} />
            </div>
            <span className="data-detail">
              Present last 4 circles
            </span>
          </div>
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* 3. My Brotherhood Circle & Upcoming Gatherings                       */}
        {/* -------------------------------------------------------------------- */}
        <div className="grid-2">
          {/* Circle Card */}
          <div className="card stack">
            <div className="space-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>
                  My Discipleship Circle
                </span>
                <h3 className="heading-md" style={{ marginTop: 4 }}>
                  {groupName}
                </h3>
              </div>
              <Link href="/portal/circle" className="pill" style={{ fontSize: "0.78rem", minHeight: 32 }}>
                <span>Circle Wall</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid-2" style={{ gap: 12 }}>
              <div className="card stack-sm" style={{ background: "rgba(255,255,255,0.6)", padding: 14 }}>
                <span className="eyebrow">Circle Leader</span>
                <strong>Simba Ndlovu</strong>
                <span className="muted" style={{ fontSize: "0.78rem" }}>
                  Financial Analyst · Married
                </span>
              </div>
              <div className="card stack-sm" style={{ background: "rgba(255,255,255,0.6)", padding: 14 }}>
                <span className="eyebrow">Accountability Brother</span>
                <strong>Simba Ndlovu</strong>
                <span style={{ fontSize: "0.78rem", color: "var(--accent)" }}>
                  Connected this week
                </span>
              </div>
            </div>

            <div className="scripture-lockup" style={{ padding: 14 }}>
              <div className="space-between">
                <span className="eyebrow" style={{ color: "#5b4610" }}>
                  Current Circle Prayer Focus
                </span>
                <span className="muted" style={{ fontSize: "0.75rem" }}>
                  Updated 2 days ago
                </span>
              </div>
              <p style={{ margin: "6px 0 0", fontSize: "0.88rem", fontStyle: "italic", color: "#374151" }}>
                "Strength and moral courage for working fathers, and employment provision for young brothers navigating careers."
              </p>
            </div>
          </div>

          {/* Next Gathering Card */}
          <div className="card stack" style={{ justifyContent: "space-between" }}>
            <div className="stack">
              <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>
                  Next Gathering
                </span>
                <h3 className="heading-md" style={{ marginTop: 4 }}>
                  Thursday Prayer & Iron Circle
                </h3>
              </div>

              <div className="stack-sm" style={{ gap: 14 }}>
                <div className="row" style={{ alignItems: "flex-start", gap: 12 }}>
                  <Calendar size={20} style={{ color: "var(--gold)", marginTop: 2 }} />
                  <div>
                    <strong style={{ fontSize: "0.95rem" }}>Thursday, 18:30 CAT</strong>
                    <p className="muted" style={{ margin: 0, fontSize: "0.8rem" }}>
                      In 2 days
                    </p>
                  </div>
                </div>
                <div className="row" style={{ alignItems: "flex-start", gap: 12 }}>
                  <Clock size={20} style={{ color: "var(--gold)", marginTop: 2 }} />
                  <div>
                    <strong style={{ fontSize: "0.95rem" }}>Central Sanctuary & Online</strong>
                    <p className="muted" style={{ margin: 0, fontSize: "0.8rem" }}>
                      Physical + Streaming Room
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/portal/attendance" className="button" style={{ width: "100%", marginTop: 16 }}>
              Confirm My Attendance
            </Link>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
