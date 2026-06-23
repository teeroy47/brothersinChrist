"use client";

import { useDemoSession } from "@/components/session-provider";
import { getGroupById, getLevelById, getUserById, getProgressMetricsForUser } from "@/lib/mock-data";

export default function ProfilePage() {
  const { session } = useDemoSession();

  if (!session) return null;

  const user = getUserById(session.id);
  if (!user) return null;

  const level = getLevelById(user.levelId);
  const group = getGroupById(user.groupId);
  const partner = user.accountabilityPartnerId ? getUserById(user.accountabilityPartnerId) : null;
  const metrics = getProgressMetricsForUser(user.id);

  // Derive some stats from metrics
  const devotionMetric = metrics.find(m => m.label === "Devotion");
  const devotionPercentage = devotionMetric ? Math.round((devotionMetric.value / devotionMetric.target) * 100) : 0;

  return (
    <div className="profile-dashboard-layout">
      {/* Top Hero Card (Full Width) */}
      <div style={{ gridColumn: "1 / -1" }}>
        <header className="profile-hero-card">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar-inner">
              {/* Fallback to initials if no image */}
              <span style={{ fontSize: "3.5rem", fontWeight: 700, color: "var(--gold)" }}>
                {user.profile.firstName?.charAt(0) || user.profile.fullName.charAt(0)}
              </span>
            </div>
          </div>
          <div className="profile-hero-content">
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: 0, color: "var(--gold)" }}>
              {user.profile.fullName}
            </h2>
            <div className="profile-meta-grid">
              <div className="profile-meta-item">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7.5 13.5C7.5 13.5 12.5 9 12.5 5.5C12.5 2.5 10 1.5 7.5 1.5C5 1.5 2.5 2.5 2.5 5.5C2.5 9 7.5 13.5 7.5 13.5Z"/><circle cx="7.5" cy="5.5" r="1.5"/></svg>
                {user.profile.city}
              </div>
              <div className="profile-meta-item">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7.5 1L1 5V14H14V5L7.5 1Z"/><path d="M10.5 14V9H4.5V14"/><path d="M7.5 4.5V7.5M6 6H9"/></svg>
                {user.profile.church}
              </div>
            </div>
            <div className="profile-meta-grid" style={{ marginTop: -8 }}>
               <div className="profile-meta-item">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.5 5.5C10.5 7.15685 9.15685 8.5 7.5 8.5C5.84315 8.5 4.5 7.15685 4.5 5.5C4.5 3.84315 5.84315 2.5 7.5 2.5C9.15685 2.5 10.5 3.84315 10.5 5.5Z"/><path d="M2.5 13.5C2.5 10.7386 4.73858 8.5 7.5 8.5C10.2614 8.5 12.5 10.7386 12.5 13.5"/></svg>
                {user.profile.occupation}
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "auto", alignSelf: "flex-end" }}>
            <span className="profile-badge-gold">Active Member</span>
          </div>
        </header>
      </div>

      {/* Left Column: Structural Placement */}
      <div className="stack" style={{ gap: 24 }}>
        <section className="card card-dark" style={{ border: "1px solid var(--border)" }}>
          <h3 className="profile-section-heading">
            <svg width="16" height="16" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="11" height="11" rx="1"/><path d="M2 6H13"/><path d="M6 6V13"/></svg>
            Structural Placement
          </h3>
          
          <div className="profile-accent-left gold">
            <span className="eyebrow muted">CURRENT TIER</span>
            <strong style={{ fontSize: "1.1rem" }}>{level?.title || "Unassigned"}</strong>
          </div>

          <div className="profile-accent-left">
            <span className="eyebrow muted">COMMUNITY GROUP</span>
            <strong style={{ fontSize: "1.1rem" }}>{group?.name || "Unassigned"}</strong>
          </div>

          <div className="profile-accent-left">
            <span className="eyebrow muted">ACCOUNTABILITY PARTNER</span>
            <div className="row" style={{ gap: 12, marginTop: 4 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, color: "var(--gold)" }}>
                {partner ? partner.profile.firstName.charAt(0) : "?"}
              </div>
              <strong style={{ fontSize: "1.1rem" }}>{partner?.profile.fullName || "To be assigned"}</strong>
            </div>
          </div>
        </section>

        {/* Quote Card */}
        <div className="profile-quote-card">
          <span className="profile-quote-mark">”</span>
          <div className="profile-quote-content stack-sm">
            <p style={{ fontStyle: "italic", fontSize: "1.15rem", lineHeight: 1.5, margin: 0, color: "rgba(255,255,255,0.9)" }}>
              “As iron sharpens iron, so one man sharpens another.”
            </p>
            <strong style={{ color: "var(--gold)", letterSpacing: "0.05em", fontSize: "0.9rem" }}>Proverbs 27:17</strong>
          </div>
        </div>
      </div>

      {/* Right Column: Holistic Growth Tracking */}
      <div className="stack" style={{ gap: 24 }}>
        <section className="card card-dark" style={{ border: "1px solid var(--border)", height: "100%", display: "flex", flexDirection: "column" }}>
          <div className="space-between" style={{ marginBottom: 32 }}>
            <h3 className="profile-section-heading" style={{ margin: 0 }}>
              <svg width="16" height="16" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1.5 13.5H13.5"/><path d="M2.5 10.5L6.5 6.5L9.5 9.5L13.5 2.5"/></svg>
              Holistic Growth Tracking
            </h3>
            <span className="muted eyebrow" style={{ letterSpacing: "0.1em" }}>LAST SYNC: 2 HOURS AGO</span>
          </div>

          <div className="grid-2" style={{ gap: 32 }}>
            {/* Spiritual Disciplines */}
            <div className="stack">
              <strong style={{ borderBottom: "1px solid var(--border)", paddingBottom: 8, display: "block" }}>Spiritual Disciplines</strong>
              
              <div style={{ marginTop: 8 }}>
                <div className="space-between">
                  <span style={{ fontSize: "0.95rem" }}>Daily Bible Study</span>
                  <span style={{ color: "var(--gold)", fontWeight: 600 }}>{devotionPercentage}%</span>
                </div>
                <div className="profile-progress-bg">
                  <div className="profile-progress-fill" style={{ width: `${devotionPercentage}%` }} />
                </div>
              </div>

              <div className="profile-track-card stack-sm" style={{ marginTop: 12 }}>
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M1.5 2.5H13.5V12.5H1.5V2.5Z"/><path d="M1.5 5.5H13.5"/><path d="M4.5 8.5L6.5 10.5L10.5 6.5"/></svg>
                <div className="stack-sm" style={{ gap: 2 }}>
                  <strong style={{ fontSize: "0.95rem" }}>'Foundations' Course</strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--gold)" }}>✓ Completed Dec 12</span>
                </div>
              </div>

              <div className="profile-track-card stack-sm">
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 2.5H11.5V12.5H3.5V2.5Z"/><path d="M5.5 5.5H9.5M5.5 8.5H9.5"/></svg>
                <div className="stack-sm" style={{ gap: 2 }}>
                  <strong style={{ fontSize: "0.95rem" }}>Leadership Path</strong>
                  <span className="muted" style={{ fontSize: "0.8rem" }}>Starting in 2 weeks</span>
                </div>
              </div>
            </div>

            {/* Physical & Mental Habits */}
            <div className="stack">
              <strong style={{ borderBottom: "1px solid var(--border)", paddingBottom: 8, display: "block" }}>Physical & Mental Habits</strong>

              <div className="profile-track-card" style={{ marginTop: 8, alignItems: "center" }}>
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1.5 7.5H13.5M3.5 5.5V9.5M11.5 5.5V9.5"/></svg>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "0.9rem", display: "block", marginBottom: 8 }}>Weekly Workouts</span>
                  <div className="habit-squares-row">
                    <div className="habit-square filled" />
                    <div className="habit-square filled" />
                    <div className="habit-square filled" />
                    <div className="habit-square filled" />
                    <div className="habit-square" />
                  </div>
                </div>
              </div>

              <div className="profile-track-card" style={{ alignItems: "center" }}>
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2.5" y="1.5" width="10" height="12" rx="1"/><path d="M6 11.5H9"/></svg>
                <div style={{ flex: 1 }} className="space-between">
                  <div className="stack-sm" style={{ gap: 2 }}>
                    <span style={{ fontSize: "0.9rem" }}>Screen Time</span>
                    <span className="muted" style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>Target</span>
                  </div>
                  <div className="stack-sm" style={{ gap: 2, textAlign: "right" }}>
                    <strong style={{ color: "var(--gold)", fontSize: "0.9rem" }}>&lt; 2hrs/day</strong>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>Average: 1h 42m</span>
                  </div>
                </div>
              </div>

              <div className="profile-track-card" style={{ alignItems: "center" }}>
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1.5 10.5H13.5M2.5 7.5H4.5M1.5 13.5V5.5C1.5 4.39543 2.39543 3.5 3.5 3.5H11.5C12.6046 3.5 13.5 4.39543 13.5 5.5V13.5"/></svg>
                <div style={{ flex: 1 }} className="space-between">
                  <div className="stack-sm" style={{ gap: 2 }}>
                    <span style={{ fontSize: "0.9rem" }}>Sleep</span>
                    <span className="muted" style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>Discipline</span>
                  </div>
                  <div className="stack-sm" style={{ gap: 2, textAlign: "right" }}>
                    <strong style={{ fontSize: "0.9rem" }}>7.5 Hours</strong>
                    <span style={{ color: "var(--gold)", fontSize: "0.75rem", textTransform: "uppercase" }}>Consistent</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Quarterly Trend Box */}
          <div style={{ marginTop: "auto", paddingTop: 32 }}>
            <div style={{ padding: 24, border: "1px solid rgba(255,255,255,0.05)", borderRadius: "var(--radius-sm)", textAlign: "center", background: "rgba(255,255,255,0.02)" }}>
              <span className="eyebrow muted" style={{ display: "block", marginBottom: 12 }}>QUARTERLY TREND</span>
              <strong style={{ color: "var(--gold)", fontSize: "1.1rem" }}>+12.5% Spiritual Consistency Index</strong>
            </div>
          </div>

        </section>
      </div>

    </div>
  );
}