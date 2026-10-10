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
import { MetricCard, SubCard } from "@/components/cards";
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
        {/* 1. Daily Scripture Anchor Section (Flat Hero Header)                */}
        {/* -------------------------------------------------------------------- */}
        <div className="section-flat-dark stack">
          <div className="space-between" style={{ alignItems: "flex-start" }}>
            <div className="stack-sm" style={{ maxWidth: 680 }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>
                Proverbs 27:17 · Core Scripture
              </span>
              <h2 className="heading-lg" style={{ color: "#ffffff" }}>
                "As iron sharpens iron, so one man sharpens another."
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
                Discipleship is not solitary. God forms kingdom men through honest brotherhood, daily surrender, and mutual strengthening.
              </p>
            </div>

            <div className="row" style={{ gap: 10, alignSelf: "flex-start", marginTop: 8 }}>
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
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.22)",
                }}
              >
                <BookOpen size={16} style={{ color: "var(--gold)" }} />
                <span>Today's Devotion</span>
              </Link>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* 2. Discipleship Indicators (Unified Shared MetricCard Primitives)     */}
        {/* -------------------------------------------------------------------- */}
        <div className="grid-4">
          <MetricCard
            label="Consistency"
            value={`${consistencyScore}%`}
            badge="Steady"
            progress={consistencyScore}
            detail="Active rhythm across disciplines"
            tone="healthy"
          />
          <MetricCard
            label="Prayer Rhythm"
            value="5 / 7 days"
            progress={71}
            detail="Target: Daily communion"
            icon={<CheckCircle2 size={18} />}
            tone="healthy"
          />
          <MetricCard
            label="Scripture Study"
            value="4 / 7 days"
            progress={57}
            detail="Proverbs 30-Day Plan"
            icon={<BookOpen size={18} />}
            tone="healthy"
          />
          <MetricCard
            label="Attendance"
            value="100%"
            progress={100}
            detail="Present last 4 circles"
            icon={<Users size={18} />}
            tone="healthy"
          />
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* 3. My Brotherhood Circle & Upcoming Gatherings (Non-Nested Cards)    */}
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
              <Link href="/portal/circle" className="pill" style={{ fontSize: "0.8rem", minHeight: 34 }}>
                <span>Circle Wall</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid-2" style={{ gap: 12 }}>
              <SubCard
                label="Circle Leader"
                title="Simba Ndlovu"
                detail="Financial Analyst · Married"
              />
              <SubCard
                label="Accountability Brother"
                title="Tawanda Moyo"
                detail="Software Engineer · Single"
                status="Connected this week"
              />
            </div>

            <div className="scripture-lockup" style={{ padding: 16 }}>
              <div className="space-between">
                <span className="eyebrow" style={{ color: "var(--gold)" }}>
                  Current Circle Prayer Focus
                </span>
                <span className="muted" style={{ fontSize: "0.75rem" }}>
                  Updated 2 days ago
                </span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: "0.9rem", fontStyle: "italic", color: "var(--foreground)" }}>
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
                    <p className="muted" style={{ margin: 0, fontSize: "0.82rem" }}>
                      In 2 days
                    </p>
                  </div>
                </div>
                <div className="row" style={{ alignItems: "flex-start", gap: 12 }}>
                  <Clock size={20} style={{ color: "var(--gold)", marginTop: 2 }} />
                  <div>
                    <strong style={{ fontSize: "0.95rem" }}>Central Sanctuary & Online</strong>
                    <p className="muted" style={{ margin: 0, fontSize: "0.82rem" }}>
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
