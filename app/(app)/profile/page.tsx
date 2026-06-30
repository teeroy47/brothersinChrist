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

  const devotionMetric = metrics.find(m => m.label === "Devotion");
  const devotionPercentage = devotionMetric ? Math.round((devotionMetric.value / devotionMetric.target) * 100) : 0;

  return (
    <div className="profile-layout-container">
      {/* Top Card */}
      <div className="profile-hr-card">
        <div className="profile-hr-banner"></div>
        <div className="profile-hr-header-content">
          <div className="profile-hr-avatar-container">
            <div className="profile-hr-avatar">
              {user.profile.firstName?.charAt(0) || user.profile.fullName.charAt(0)}
            </div>
            <div className="profile-hr-status-dot"></div>
          </div>
          
          <div className="profile-hr-user-details">
            <h2 className="profile-hr-name">{user.profile.fullName}</h2>
            <div className="profile-hr-meta row">
              <span className="profile-hr-meta-item">
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="7.5" r="5.5"/><path d="M7.5 2V5M7.5 10V13M2 7.5H5M10 7.5H13"/></svg>
                {group?.name || "Unassigned"}
              </span>
              <span className="profile-hr-meta-item">
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 1L1 5V14H14V5L7.5 1Z"/><path d="M10.5 14V9H4.5V14"/></svg>
                {user.profile.city}, {user.profile.church}
              </span>
            </div>
            
            <div className="profile-hr-badges row">
              <span className="hr-badge hr-badge-gold">
                <svg width="12" height="12" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2.5" y="4.5" width="10" height="8" rx="1"/><path d="M4.5 4.5V3C4.5 2.17157 5.17157 1.5 6 1.5H9C9.82843 1.5 10.5 2.17157 10.5 3V4.5"/></svg>
                {level?.title || "Unassigned Tier"}
              </span>
              <span className="hr-badge hr-badge-muted">
                <svg width="12" height="12" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7.5 1.5V13.5M1.5 7.5H13.5"/><circle cx="7.5" cy="7.5" r="3.5"/></svg>
                {user.profile.occupation}
              </span>
              <span className="hr-badge hr-badge-dark">
                Active Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Structural Placement (Personal info style) */}
      <div className="profile-hr-card">
        <div className="profile-hr-card-header space-between">
          <div className="row" style={{ gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="currentColor" style={{ color: "var(--gold)" }}><path d="M7.5 2C6.11929 2 5 3.11929 5 4.5C5 5.88071 6.11929 7 7.5 7C8.88071 7 10 5.88071 10 4.5C10 3.11929 8.88071 2 7.5 2ZM7.5 8C5.01472 8 3 10.0147 3 12.5V13H12V12.5C12 10.0147 9.98528 8 7.5 8Z"/></svg>
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Structural Placement</h3>
          </div>
          <button className="hr-edit-button">
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11.5 2.5L12.5 3.5L4.5 11.5H3.5V10.5L11.5 2.5Z"/></svg>
            Edit
          </button>
        </div>
        
        <div className="profile-hr-grid">
          <div className="hr-grid-item">
            <span className="hr-label">Tier</span>
            <span className="hr-value">{level?.title || "Unassigned"}</span>
          </div>
          <div className="hr-grid-item">
            <span className="hr-label">Community Group</span>
            <span className="hr-value">{group?.name || "Unassigned"}</span>
          </div>
          <div className="hr-grid-item">
            <span className="hr-label">Accountability Partner</span>
            <span className="hr-value">{partner?.profile.fullName || "To be assigned"}</span>
          </div>
          <div className="hr-grid-item">
            <span className="hr-label">City</span>
            <span className="hr-value">{user.profile.city}</span>
          </div>
          <div className="hr-grid-item">
            <span className="hr-label">Church</span>
            <span className="hr-value">{user.profile.church}</span>
          </div>
          <div className="hr-grid-item">
            <span className="hr-label">Occupation</span>
            <span className="hr-value">{user.profile.occupation}</span>
          </div>
        </div>
      </div>

      {/* Holistic Growth Tracking (Employment details style) */}
      <div className="profile-hr-card">
        <div className="profile-hr-card-header space-between" style={{ paddingBottom: 16 }}>
          <div className="row" style={{ gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="currentColor" style={{ color: "var(--gold)" }}><path d="M2.5 4.5V3C2.5 2.17157 3.17157 1.5 4 1.5H11C11.8284 1.5 12.5 2.17157 12.5 3V4.5M1.5 4.5H13.5V12.5C13.5 13.0523 13.0523 13.5 12.5 13.5H2.5C1.94772 13.5 1.5 13.0523 1.5 12.5V4.5Z"/></svg>
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Holistic Growth Tracking</h3>
          </div>
          <div className="hr-icon-button">
            <svg width="16" height="16" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6L7.5 9.5L11 6"/></svg>
          </div>
        </div>

        <div className="hr-accordion-content">
          <div className="hr-salary-box">
            <span className="hr-label">Spiritual Consistency Index</span>
            <div className="row" style={{ gap: 6, alignItems: "baseline" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--gold)" }}>{devotionPercentage}%</span>
              <span className="hr-label">/Monthly target</span>
            </div>
          </div>
          
          <div className="hr-salary-box" style={{ marginTop: 12 }}>
             <span className="hr-label">Recent Achievements</span>
             <div className="row" style={{ gap: 6, alignItems: "baseline", marginTop: 4 }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)" }}>'Foundations' Course Completed</span>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}