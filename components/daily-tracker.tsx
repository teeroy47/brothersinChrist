"use client";

import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { standardHabits } from "@/lib/mock-data";
import type { HabitPillar } from "@/lib/types";

const pillarLabels: Record<HabitPillar, { label: string; tag: string }> = {
  god: { label: "God", tag: "Prayer & Scripture" },
  mind: { label: "Mind", tag: "Wisdom & Stewardship" },
  body: { label: "Body", tag: "Gym & Discipline" },
  life: { label: "Life", tag: "Character & Fruit" },
};

export function DailyTracker() {
  const [completed, setCompleted] = useState<string[]>([
    "h-god-prayer",
    "h-god-word",
  ]);

  const toggleHabit = (id: string) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const percentage = Math.round(
    (completed.length / standardHabits.length) * 100,
  );

  return (
    <div className="card stack">
      <div className="space-between">
        <div>
          <span className="eyebrow">Daily Discipline Engine</span>
          <h3 className="heading-md" style={{ margin: 0 }}>
            The 4 Pillars
          </h3>
        </div>
        <span className="pill">{percentage}% completed</span>
      </div>

      <div className="stack-sm">
        {standardHabits.map((habit) => {
          const isDone = completed.includes(habit.id);
          const pillarInfo = pillarLabels[habit.pillar];

          return (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className="metric space-between"
              style={{
                cursor: "pointer",
                padding: "12px 14px",
                borderRadius: "8px",
                borderLeft: isDone
                  ? "3px solid #ffffff"
                  : "3px solid transparent",
                userSelect: "none",
              }}
            >
              <div className="stack-sm" style={{ gap: 2 }}>
                <div className="row" style={{ gap: 8, alignItems: "center" }}>
                  <span
                    className="pill pill-dark"
                    style={{ fontSize: 11, padding: "2px 8px" }}
                  >
                    {pillarInfo.label}
                  </span>
                  <strong>{habit.title}</strong>
                </div>
                <span className="muted" style={{ fontSize: 13 }}>
                  {habit.description}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {isDone ? (
                  <CheckCircle2 size={20} color="#ffffff" />
                ) : (
                  <Circle size={20} className="muted" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
