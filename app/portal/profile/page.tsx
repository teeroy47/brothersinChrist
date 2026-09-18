"use client";

import React, { useState } from "react";
import {
  User,
  Shield,
  Church,
  Briefcase,
  MapPin,
  Heart,
  BookOpen,
  Dumbbell,
  Sparkles,
  Save,
  Check,
} from "lucide-react";
import { PortalShell } from "@/src/components/portal/PortalShell";
import { useAuthStore } from "@/src/stores/auth-store";

export default function MemberProfilePage() {
  const { currentUser } = useAuthStore();
  const [saved, setSaved] = useState(false);

  const initialLetter = currentUser?.firstName?.[0] ?? currentUser?.name?.[0] ?? "B";
  const displayName = currentUser?.name ?? "Brother";
  const levelTitle = currentUser?.levelTitle ?? "Level 1: New Believers";
  const levelNumber = currentUser?.levelNumber ?? 1;
  const groupName = currentUser?.groupName ?? "Oversight Circle";

  const [profile, setProfile] = useState({
    fullName: currentUser?.name ?? "Brother",
    email: currentUser?.email ?? "",
    phone: "+263 77 123 4567",
    city: "Harare",
    church: currentUser?.church ?? "Brothers In Christ",
    occupation: "Project Coordinator",
    maritalStatus: "Single",
    testimony:
      "Grew up in church but wandered into secular patterns in university. In 2024, through the ministry of Brothers In Christ, God convicted me of passive spirituality and broke cycles of isolation. Now striving to walk in holiness and brotherly strength daily.",
    spiritualGoals: [
      "Wake up at 05:00 for prayer and Scripture meditation",
      "Memorize 1 passage per week (starting with Ephesians 4)",
      "Fast every Wednesday until 15:00",
    ],
    fitnessGoals: ["Morning workouts 3x weekly", "10,000 daily steps minimum"],
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <PortalShell
      title="Brother Profile"
      subtitle="Your personal discipleship record, placement, testimony, and spiritual commitments."
    >
      <form onSubmit={handleSave} className="stack" style={{ gap: 24 }}>
        {/* ------------------------------------------------------------------ */}
        {/* Profile Banner (Flat Section)                                      */}
        {/* ------------------------------------------------------------------ */}
        <div className="section-flat-dark stack">
          <div className="space-between">
            <div className="row" style={{ gap: 16 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "var(--radius-sm)",
                  background: "var(--gold)",
                  color: "#000",
                  fontWeight: 900,
                  fontSize: "1.8rem",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "0 4px 14px rgba(182, 139, 53, 0.3)",
                }}
              >
                {initialLetter}
              </div>
              <div className="stack-sm" style={{ gap: 4 }}>
                <h2 className="heading-lg" style={{ color: "#ffffff", margin: 0 }}>
                  {displayName}
                </h2>
                <div className="row" style={{ gap: 8, fontSize: "0.82rem", color: "rgba(255,255,255,0.7)" }}>
                  <span className="row" style={{ gap: 4 }}>
                    <MapPin size={14} style={{ color: "var(--gold)" }} />
                    {profile.city}
                  </span>
                  <span>·</span>
                  <span className="row" style={{ gap: 4 }}>
                    <Church size={14} style={{ color: "var(--gold)" }} />
                    {profile.church}
                  </span>
                  <span>·</span>
                  <span className="row" style={{ gap: 4 }}>
                    <Briefcase size={14} style={{ color: "var(--gold)" }} />
                    {profile.occupation}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="button"
              style={{
                background: "var(--gold)",
                color: "#000",
                fontWeight: 800,
                padding: "8px 20px",
              }}
            >
              {saved ? <Check size={16} style={{ marginRight: 6 }} /> : <Save size={16} style={{ marginRight: 6 }} />}
              <span>{saved ? "Saved Successfully" : "Save Changes"}</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Placement & Accountability Info                                    */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid-3">
          <div className="card stack-sm">
            <span className="eyebrow">Formation Level</span>
            <strong className="heading-md" style={{ color: "var(--gold)", margin: 0 }}>
              {levelTitle}
            </strong>
            <span className="muted" style={{ fontSize: "0.78rem" }}>Stage {levelNumber} of 5</span>
          </div>

          <div className="card stack-sm">
            <span className="eyebrow">Assigned Small Group</span>
            <strong className="heading-md" style={{ margin: 0 }}>{groupName}</strong>
            <span className="muted" style={{ fontSize: "0.78rem" }}>Leader: Simba Ndlovu</span>
          </div>

          <div className="card stack-sm">
            <span className="eyebrow">Accountability Brother</span>
            <strong className="heading-md" style={{ margin: 0 }}>Simba Ndlovu</strong>
            <span style={{ fontSize: "0.78rem", color: "var(--accent)", fontWeight: 700 }}>
              Assigned & Active
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Goals & Testimony (Flat Section Containers)                        */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid-2">
          {/* Spiritual Goals */}
          <div className="section-flat stack">
            <div className="row" style={{ gap: 8, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
              <BookOpen size={18} style={{ color: "var(--gold)" }} />
              <h3 className="heading-md" style={{ margin: 0, fontSize: "1.05rem" }}>Current Spiritual Goals</h3>
            </div>

            <div className="stack-sm" style={{ gap: 10 }}>
              {profile.spiritualGoals.map((goal, idx) => (
                <div
                  key={idx}
                  className="card stack-sm"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    padding: 12,
                    fontSize: "0.85rem",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Sparkles size={16} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fitness & Discipline Goals */}
          <div className="section-flat stack">
            <div className="row" style={{ gap: 8, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
              <Dumbbell size={18} style={{ color: "var(--gold)" }} />
              <h3 className="heading-md" style={{ margin: 0, fontSize: "1.05rem" }}>Physical Discipline & Bodily Stewardship</h3>
            </div>

            <div className="stack-sm" style={{ gap: 10 }}>
              {profile.fitnessGoals.map((goal, idx) => (
                <div
                  key={idx}
                  className="card stack-sm"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    padding: 12,
                    fontSize: "0.85rem",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Sparkles size={16} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimony Block (Flat Section) */}
        <div className="section-flat stack">
          <div className="row" style={{ gap: 8, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            <Heart size={18} style={{ color: "var(--gold)" }} />
            <h3 className="heading-md" style={{ margin: 0, fontSize: "1.05rem" }}>Personal Testimony</h3>
          </div>
          <div className="field">
            <textarea
              rows={4}
              value={profile.testimony}
              onChange={(e) => setProfile({ ...profile, testimony: e.target.value })}
              placeholder="Share how God transformed your life..."
            />
          </div>
        </div>
      </form>
    </PortalShell>
  );
}
