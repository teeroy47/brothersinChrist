"use client";

import React from "react";
import {
  Layers,
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
} from "lucide-react";
import { PortalShell } from "@/src/components/portal/PortalShell";
import { useAuthStore } from "@/src/stores/auth-store";

const LEVELS = [
  {
    number: 1,
    title: "Level 1: New Believers",
    description: "Foundations in prayer, Scripture, brotherhood, and personal surrender to Jesus Christ.",
    requirements: [
      "Attend weekly discipleship meeting",
      "Complete foundational devotion plan",
      "Submit weekly check-in",
    ],
    curriculum: ["Identity in Christ", "Spiritual Disciplines", "Repentance & Obedience"],
    growthMarkers: ["Consistent devotion", "Visible humility", "Reliable attendance"],
  },
  {
    number: 2,
    title: "Level 2: Rooted",
    description: "Growing into daily spiritual consistency, Scripture literacy, and disciplined Christian manhood.",
    requirements: [
      "Maintain 80%+ gathering attendance",
      "Engage actively with an accountability partner",
      "Complete Rooted curriculum track",
    ],
    curriculum: ["Renewing the Mind", "Biblical Manhood", "Personal Holiness"],
    growthMarkers: ["Devotional consistency", "Serving heart", "Teachability"],
  },
  {
    number: 3,
    title: "Level 3: Steady",
    description: "Stable discipleship marked by reliability, spiritual maturity, and reproducible habits.",
    requirements: [
      "Disciple one younger brother",
      "Serve monthly in ministry area",
      "Complete Steady formation review",
    ],
    curriculum: ["Biblical Stewardship", "Discipling Men", "Emotional Maturity"],
    growthMarkers: ["Dependability", "Brotherly care", "Emerging leadership"],
  },
  {
    number: 4,
    title: "Level 4: Serving",
    description: "Men who serve, influence, and help carry the spiritual culture of the brotherhood.",
    requirements: [
      "Co-lead small group or prayer circles",
      "Provide direct pastoral follow-up to assigned brothers",
      "Complete servant leadership module",
    ],
    curriculum: ["Servant Leadership", "Peacemaking & Conflict", "Kingdom Responsibility"],
    growthMarkers: ["Initiative", "Care for others", "Visible fruitfulness"],
  },
  {
    number: 5,
    title: "Level 5: Leaders",
    description: "Mature men entrusted with forming other men through oversight, prayer, and wise leadership.",
    requirements: [
      "Oversee a group, region, or formation level",
      "Submit regular leader reports",
      "Mentor and multiply emerging leaders",
    ],
    curriculum: ["Leadership Theology", "Shepherding Men", "Kingdom Multiplication"],
    growthMarkers: ["Spiritual oversight", "Multiplication", "Fatherly care"],
  },
];

export default function MemberLevelsPage() {
  const { currentUser } = useAuthStore();
  const currentLevelNumber = currentUser?.levelNumber ?? 1;
  const activeLevel = LEVELS.find((l) => l.number === currentLevelNumber) ?? LEVELS[0];

  return (
    <PortalShell
      title="Formation Levels"
      subtitle="A clear, structured discipleship journey from new believer to multiplying leader."
    >
      <div className="stack" style={{ gap: 28 }}>
        {/* ------------------------------------------------------------------ */}
        {/* Current Level Spotlight (Flat Section)                             */}
        {/* ------------------------------------------------------------------ */}
        <div className="section-flat-dark stack">
          <div className="space-between">
            <div className="stack-sm">
              <span className="data-label" style={{ color: "var(--gold)" }}>
                Your Current Formation Stage
              </span>
              <h2 className="heading-lg" style={{ color: "#ffffff", margin: 0 }}>
                {activeLevel.title}
              </h2>
            </div>
            <span
              className="pill"
              style={{
                background: "var(--gold)",
                color: "#000",
                fontWeight: 800,
                borderColor: "transparent",
              }}
            >
              Stage {currentLevelNumber} of 5
            </span>
          </div>

          <p style={{ color: "rgba(255,255,255,0.82)", margin: 0, fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 780 }}>
            {activeLevel.description}
          </p>

          <div className="grid-3" style={{ gap: 14, paddingTop: 10 }}>
            <div className="stack-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", color: "#fff", padding: 16 }}>
              <span className="data-label" style={{ color: "var(--gold)" }}>
                Requirements
              </span>
              <div className="stack-sm" style={{ gap: 8, fontSize: "0.85rem", color: "rgba(255,255,255,0.85)" }}>
                {activeLevel.requirements.map((req) => (
                  <div key={req} className="row" style={{ gap: 8, alignItems: "flex-start" }}>
                    <CheckCircle2 size={15} style={{ color: "var(--gold)", marginTop: 2, flexShrink: 0 }} />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="stack-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", color: "#fff", padding: 16 }}>
              <span className="data-label" style={{ color: "var(--gold)" }}>
                Curriculum Tracks
              </span>
              <div className="stack-sm" style={{ gap: 8, fontSize: "0.85rem", color: "rgba(255,255,255,0.85)" }}>
                {activeLevel.curriculum.map((topic) => (
                  <div key={topic} className="row" style={{ gap: 8, alignItems: "flex-start" }}>
                    <BookOpen size={15} style={{ color: "var(--gold)", marginTop: 2, flexShrink: 0 }} />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="stack-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", color: "#fff", padding: 16 }}>
              <span className="data-label" style={{ color: "var(--gold)" }}>
                Growth Markers
              </span>
              <div className="stack-sm" style={{ gap: 8, fontSize: "0.85rem", color: "rgba(255,255,255,0.85)" }}>
                {activeLevel.growthMarkers.map((marker) => (
                  <div key={marker} className="row" style={{ gap: 8, alignItems: "flex-start" }}>
                    <Sparkles size={15} style={{ color: "var(--gold)", marginTop: 2, flexShrink: 0 }} />
                    <span>{marker}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Full 5-Level Formation Roadmap                                     */}
        {/* ------------------------------------------------------------------ */}
        <div className="stack" style={{ gap: 16 }}>
          <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            <div className="row" style={{ gap: 8 }}>
              <Layers size={20} style={{ color: "var(--gold)" }} />
              <h3 className="heading-md" style={{ margin: 0 }}>The Complete Formation Pathway</h3>
            </div>
            <p className="muted" style={{ fontSize: "0.85rem", margin: "4px 0 0" }}>
              Each stage is intentional, reproducible, and guarded by brotherly accountability.
            </p>
          </div>

          <div className="stack" style={{ gap: 14 }}>
            {LEVELS.map((level) => {
              const isCurrent = level.number === currentLevelNumber;
              const isCompleted = level.number < currentLevelNumber;

              return (
                <div
                  key={level.number}
                  className="card stack"
                  style={{
                    border: isCurrent
                      ? "2px solid var(--gold)"
                      : isCompleted
                      ? "1px solid rgba(31, 122, 104, 0.4)"
                      : undefined,
                    background: isCurrent
                      ? "rgba(255, 255, 255, 0.95)"
                      : undefined,
                    padding: 20,
                  }}
                >
                  <div className="space-between">
                    <div className="stack-sm">
                      <div className="row" style={{ gap: 8 }}>
                        <span className="eyebrow" style={{ color: "var(--gold)" }}>
                          Stage {level.number}
                        </span>
                        {isCompleted && (
                          <span
                            className="pill"
                            style={{
                              fontSize: "0.68rem",
                              padding: "2px 8px",
                              minHeight: 22,
                              color: "var(--accent)",
                              borderColor: "var(--accent)",
                            }}
                          >
                            Completed
                          </span>
                        )}
                        {isCurrent && (
                          <span
                            className="pill"
                            style={{
                              fontSize: "0.68rem",
                              padding: "2px 8px",
                              minHeight: 22,
                              background: "rgba(182, 139, 53, 0.15)",
                              color: "var(--gold)",
                              borderColor: "var(--gold)",
                            }}
                          >
                            Current Active
                          </span>
                        )}
                      </div>
                      <h4 className="heading-md" style={{ margin: "2px 0 0" }}>
                        {level.title}
                      </h4>
                      <p className="muted" style={{ fontSize: "0.85rem", margin: 0, maxWidth: 650 }}>
                        {level.description}
                      </p>
                    </div>

                    <div className="row" style={{ gap: 8 }}>
                      {isCompleted ? (
                        <div className="row" style={{ gap: 6, color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem" }}>
                          <CheckCircle2 size={18} />
                          <span>Passed Review</span>
                        </div>
                      ) : isCurrent ? (
                        <span className="pill" style={{ fontWeight: 800, fontSize: "0.78rem" }}>
                          In Progress
                        </span>
                      ) : (
                        <div className="row" style={{ gap: 6, color: "var(--muted)", fontSize: "0.82rem" }}>
                          <Lock size={14} />
                          <span>Locked</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
