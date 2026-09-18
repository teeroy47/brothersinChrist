"use client";

import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
  Flame,
} from "lucide-react";
import { PortalShell } from "@/src/components/portal/PortalShell";

const DEVOTIONS = [
  {
    day: 1,
    title: "The Beginning of Wisdom",
    ref: "Proverbs 1:7",
    scripture:
      "The fear of the LORD is the beginning of knowledge; fools despise wisdom and instruction.",
    reflection:
      "True masculine strength does not originate in ego, status, or self-reliance. It begins when a man reverently bows his heart before the holy God of the universe. When you fear God, you fear nothing else in this world.",
    prayer:
      "Heavenly Father, break any pride or foolishness in my heart today. Teach me to walk in reverent awe of Your holiness, and give me a teachable spirit among my brothers. In Jesus' name, Amen.",
  },
  {
    day: 2,
    title: "Guarding the Springs of Life",
    ref: "Proverbs 4:23",
    scripture:
      "Keep your heart with all vigilance, for from it flow the springs of life.",
    reflection:
      "A fortress is not conquered from without until its gates are breached from within. A kingdom man must set a guard over his eyes, thoughts, and affections. What you tolerate in private will eventually dominate you in public.",
    prayer:
      "Lord, help me stand as an alert watchman over my soul. Purify what I look at, what I listen to, and what I desire. Let my life be an unpolluted spring that blesses my family and brotherhood. Amen.",
  },
  {
    day: 3,
    title: "Trusting Beyond Understanding",
    ref: "Proverbs 3:5-6",
    scripture:
      "Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
    reflection:
      "Men love control and calculations. But God calls kingdom men to absolute trust. Surrendering your plans to Christ is not weakness; it is placing your life in the only hands capable of leading you into eternal victory.",
    prayer:
      "Father, I yield control to You. When circumstances are unclear and my understanding fails, strengthen my faith to trust Your sovereign wisdom. Order my steps today. Amen.",
  },
];

export default function MemberDevotionsPage() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([1]);

  const activeDevotion = DEVOTIONS.find((d) => d.day === selectedDay) ?? DEVOTIONS[0];
  const isCompleted = completedDays.includes(selectedDay);

  const toggleComplete = (day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <PortalShell
      title="Scripture & Daily Devotion"
      subtitle="Daily bread for spiritual formation, anchored in Proverbs and kingdom wisdom."
    >
      <div className="grid-2" style={{ alignItems: "start", gap: 24 }}>
        {/* ------------------------------------------------------------------ */}
        {/* Left Col: Active Devotion Reader (Flat Section)                     */}
        {/* ------------------------------------------------------------------ */}
        <div className="stack" style={{ gap: 20 }}>
          <div className="section-flat-dark stack">
            {/* Header & Tag */}
            <div className="space-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 14 }}>
              <span className="data-label" style={{ color: "var(--gold)" }}>
                Day {activeDevotion.day} · Proverbs Reading Track
              </span>
              <span className="pill pill-dark" style={{ fontSize: "0.75rem", minHeight: 28, padding: "2px 10px", color: "var(--gold)" }}>
                {activeDevotion.ref}
              </span>
            </div>

            {/* Scripture Callout */}
            <div className="scripture-lockup" style={{ margin: "4px 0" }}>
              <span className="data-label" style={{ color: "#5b4610" }}>
                The Word of the Lord
              </span>
              <blockquote style={{ fontSize: "1.15rem", fontWeight: 700, margin: "8px 0", color: "#17202f", lineHeight: 1.5 }}>
                "{activeDevotion.scripture}"
              </blockquote>
              <span className="muted" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                — {activeDevotion.ref}
              </span>
            </div>

            {/* Theological Reflection */}
            <div className="stack-sm">
              <span className="data-label" style={{ color: "var(--gold)" }}>
                Kingdom Reflection
              </span>
              <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.65, fontSize: "0.95rem", margin: 0 }}>
                {activeDevotion.reflection}
              </p>
            </div>

            {/* Prayer Focus */}
            <div className="stack-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", color: "#fff", padding: 16 }}>
              <div className="row" style={{ gap: 6 }}>
                <Flame size={14} style={{ color: "var(--gold)" }} />
                <span className="data-label" style={{ color: "var(--gold)" }}>Brotherhood Prayer Focus</span>
              </div>
              <p style={{ fontStyle: "italic", margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(255,255,255,0.9)" }}>
                "{activeDevotion.prayer}"
              </p>
            </div>

            {/* Complete Action */}
            <div className="space-between" style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>
                {isCompleted ? "Completed for today" : "Ready to mark completed"}
              </span>
              <button
                type="button"
                onClick={() => toggleComplete(selectedDay)}
                className="button"
                style={{
                  background: isCompleted ? "var(--accent)" : "var(--gold)",
                  color: isCompleted ? "#fff" : "#000",
                  fontWeight: 800,
                  padding: "8px 18px",
                }}
              >
                <CheckCircle2 size={16} style={{ marginRight: 6 }} />
                <span>{isCompleted ? "Reading Completed" : "Mark as Completed"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Right Col: Plan Index & Tracker (Flat Section Container)           */}
        {/* ------------------------------------------------------------------ */}
        <div className="stack" style={{ gap: 20 }}>
          <div className="section-flat stack">
            <div className="row" style={{ gap: 8, borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
              <BookOpen size={18} style={{ color: "var(--gold)" }} />
              <h3 className="heading-md" style={{ margin: 0, fontSize: "1.1rem" }}>Proverbs 30-Day Track</h3>
            </div>

            <div className="stack-sm" style={{ gap: 10 }}>
              {DEVOTIONS.map((dev) => {
                const isSelected = dev.day === selectedDay;
                const isDone = completedDays.includes(dev.day);

                return (
                  <button
                    key={dev.day}
                    type="button"
                    onClick={() => setSelectedDay(dev.day)}
                    className="card stack-sm"
                    style={{
                      cursor: "pointer",
                      textAlign: "left",
                      padding: 12,
                      border: isSelected ? "2px solid var(--gold)" : undefined,
                      background: isSelected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <div className="space-between">
                      <div>
                        <span className="eyebrow" style={{ color: "var(--gold)", fontSize: "0.68rem" }}>
                          Day {dev.day} · {dev.ref}
                        </span>
                        <strong style={{ fontSize: "0.88rem", display: "block", marginTop: 2 }}>
                          {dev.title}
                        </strong>
                      </div>
                      {isDone && <CheckCircle2 size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
