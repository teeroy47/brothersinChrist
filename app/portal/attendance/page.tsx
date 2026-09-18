"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
} from "lucide-react";
import { PortalShell } from "@/src/components/portal/PortalShell";

type Status = "PRESENT" | "EXCUSED" | "LATE" | "ABSENT";

interface Gathering {
  id: string;
  title: string;
  category: string;
  dateTime: string;
  location: string;
  myStatus: Status;
}

export default function MemberAttendancePage() {
  const [gatherings, setGatherings] = useState<Gathering[]>([
    {
      id: "ev-1",
      title: "Thursday Prayer & Iron Circle",
      category: "Thursday Meeting",
      dateTime: "Thursday, Apr 9 · 18:30 CAT",
      location: "Harare Central Sanctuary / Online",
      myStatus: "PRESENT",
    },
    {
      id: "ev-2",
      title: "Monday Foundations Huddle",
      category: "Monday Meeting",
      dateTime: "Monday, Apr 13 · 19:00 CAT",
      location: "Northern Gate / Zoom",
      myStatus: "PRESENT",
    },
    {
      id: "ev-3",
      title: "Monthly Brotherhood Physical Outreach",
      category: "Physical Gathering",
      dateTime: "Saturday, Apr 25 · 08:00 CAT",
      location: "Harare Botanical Grounds",
      myStatus: "EXCUSED",
    },
  ]);

  const setStatus = (id: string, status: Status) => {
    setGatherings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, myStatus: status } : item))
    );
  };

  return (
    <PortalShell
      title="Gatherings & Attendance Rhythms"
      subtitle="Fidelity in showing up. Christian men keep their word and stand shoulder-to-shoulder."
    >
      <div className="grid-2" style={{ alignItems: "start", gap: 24 }}>
        {/* ------------------------------------------------------------------ */}
        {/* Left Col: Upcoming Gatherings with RSVP                            */}
        {/* ------------------------------------------------------------------ */}
        <div className="stack" style={{ gap: 20 }}>
          <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            <div className="row" style={{ gap: 8 }}>
              <CalendarCheck size={20} style={{ color: "var(--gold)" }} />
              <h3 className="heading-md" style={{ margin: 0 }}>Upcoming Brotherhood Gatherings</h3>
            </div>
            <p className="muted" style={{ fontSize: "0.85rem", margin: "4px 0 0" }}>
              Mark your intended presence so your circle leader can prepare.
            </p>
          </div>

          <div className="stack" style={{ gap: 16 }}>
            {gatherings.map((event) => (
              <div key={event.id} className="card stack">
                <div className="space-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
                  <div>
                    <span className="eyebrow" style={{ color: "var(--gold)" }}>
                      {event.category}
                    </span>
                    <h4 className="heading-md" style={{ margin: "2px 0 0" }}>{event.title}</h4>
                  </div>
                  <span
                    className="pill"
                    style={{
                      fontSize: "0.72rem",
                      padding: "2px 10px",
                      minHeight: 26,
                      background: event.myStatus === "PRESENT" ? "rgba(31, 122, 104, 0.12)" : undefined,
                      color: event.myStatus === "PRESENT" ? "var(--accent)" : undefined,
                      borderColor: event.myStatus === "PRESENT" ? "var(--accent)" : undefined,
                      fontWeight: 700,
                    }}
                  >
                    Status: {event.myStatus}
                  </span>
                </div>

                <div className="grid-2" style={{ gap: 10 }}>
                  <div className="row" style={{ gap: 8, fontSize: "0.85rem" }}>
                    <Clock size={16} style={{ color: "var(--gold)" }} />
                    <span>{event.dateTime}</span>
                  </div>
                  <div className="row" style={{ gap: 8, fontSize: "0.85rem" }}>
                    <MapPin size={16} style={{ color: "var(--gold)" }} />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Interactive Status Selector */}
                <div style={{ paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                  <span className="eyebrow" style={{ display: "block", marginBottom: 8 }}>
                    Confirm your attendance:
                  </span>
                  <div className="row" style={{ gap: 8 }}>
                    {(["PRESENT", "EXCUSED", "LATE", "ABSENT"] as Status[]).map((status) => {
                      const active = event.myStatus === status;
                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setStatus(event.id, status)}
                          className={active ? "button" : "button-secondary"}
                          style={{
                            padding: "6px 14px",
                            minHeight: 32,
                            fontSize: "0.76rem",
                            background: active && status === "PRESENT" ? "var(--accent)" : undefined,
                            color: active ? "#fff" : undefined,
                            flex: 1,
                          }}
                        >
                          {status}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Right Col: Attendance Statistics (Flat Section Container)          */}
        {/* ------------------------------------------------------------------ */}
        <div className="stack" style={{ gap: 20 }}>
          <div className="section-flat stack">
            <div className="row" style={{ gap: 8, borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
              <ShieldCheck size={18} style={{ color: "var(--gold)" }} />
              <h3 className="heading-md" style={{ margin: 0, fontSize: "1.1rem" }}>Reliability Marker</h3>
            </div>

            <div className="card stack-sm" style={{ textAlign: "center", background: "rgba(255,255,255,0.7)", padding: 20 }}>
              <span className="data-label">Last 90 Days</span>
              <strong className="data-value" style={{ fontSize: "2.6rem", margin: "4px 0" }}>
                92%
              </strong>
              <span className="data-detail" style={{ color: "var(--accent)", fontWeight: 700 }}>
                Faithful Presence
              </span>
            </div>

            <div className="scripture-lockup">
              <p style={{ fontStyle: "italic", fontSize: "0.88rem", margin: "0 0 4px", color: "#2d3748" }}>
                "Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another."
              </p>
              <span className="data-label" style={{ color: "var(--gold)", fontSize: "0.72rem" }}>
                Hebrews 10:25
              </span>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
