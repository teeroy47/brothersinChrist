"use client";

import React, { useState } from "react";
import {
  UsersRound,
  Shield,
  Clock,
  MapPin,
  HeartHandshake,
  MessageSquare,
  Plus,
  Send,
  Check,
} from "lucide-react";
import { PortalShell } from "@/src/components/portal/PortalShell";
import { useAuthStore } from "@/src/stores/auth-store";

export default function MemberCirclePage() {
  const { currentUser } = useAuthStore();
  const authorName = currentUser?.name ?? "Brother";
  const groupName = currentUser?.groupName ?? "Harare Central Men";
  const [prayedSet, setPrayedSet] = useState<Record<string, boolean>>({});
  const [newPrayer, setNewPrayer] = useState("");
  const [prayerList, setPrayerList] = useState([
    {
      id: "pr-1",
      author: "Tawanda Moyo",
      request: "Wisdom navigating career decisions and provision for my younger siblings' education.",
      prayedCount: 7,
      timeAgo: "1 day ago",
    },
    {
      id: "pr-2",
      author: "Simba Ndlovu",
      request: "Protection and health over my family, and spiritual hunger in our weekly circles.",
      prayedCount: 12,
      timeAgo: "3 days ago",
    },
    {
      id: "pr-3",
      author: "Tinashe Shumba",
      request: "Victory over anxiety and strength to witness Christ boldly at work.",
      prayedCount: 9,
      timeAgo: "4 days ago",
    },
  ]);

  const togglePrayed = (id: string) => {
    setPrayedSet((prev) => ({ ...prev, [id]: !prev[id] }));
    setPrayerList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, prayedCount: item.prayedCount + (prayedSet[id] ? -1 : 1) }
          : item
      )
    );
  };

  const handleAddPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayer.trim()) return;

    setPrayerList((prev) => [
      {
        id: `pr-${Date.now()}`,
        author: authorName,
        request: newPrayer.trim(),
        prayedCount: 1,
        timeAgo: "Just now",
      },
      ...prev,
    ]);
    setNewPrayer("");
  };

  return (
    <PortalShell
      title="Brotherhood Circle"
      subtitle="Your trusted circle of Christian brothers walking in accountable discipleship."
    >
      <div className="grid-2" style={{ alignItems: "start", gap: 24 }}>
        {/* ------------------------------------------------------------------ */}
        {/* Left Col: Circle Info & Prayer Wall                                 */}
        {/* ------------------------------------------------------------------ */}
        <div className="stack" style={{ gap: 20 }}>
          {/* Circle Banner (Flat Section) */}
          <div className="section-flat-dark stack">
            <div className="space-between">
              <div>
                <span className="data-label" style={{ color: "var(--gold)" }}>
                  Active Small Group
                </span>
                <h2 className="heading-lg" style={{ color: "#ffffff", marginTop: 4 }}>
                  {groupName}
                </h2>
              </div>
              <span className="pill pill-dark" style={{ color: "var(--gold)", borderColor: "rgba(182, 139, 53, 0.4)" }}>
                Weekly Active
              </span>
            </div>

            <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "0.92rem", lineHeight: 1.6 }}>
              A community of men meeting weekly for fellowship, Scripture accountability, and mutual prayer support.
            </p>

            <div className="grid-2" style={{ gap: 10, paddingTop: 4 }}>
              <div className="stack-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", color: "#fff", padding: 12 }}>
                <div className="row" style={{ gap: 8 }}>
                  <Clock size={16} style={{ color: "var(--gold)" }} />
                  <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>Thursdays @ 18:30 CAT</span>
                </div>
              </div>
              <div className="stack-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", color: "#fff", padding: 12 }}>
                <div className="row" style={{ gap: 8 }}>
                  <MapPin size={16} style={{ color: "var(--gold)" }} />
                  <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>Harare Central & Hybrid</span>
                </div>
              </div>
            </div>
          </div>

          {/* Circle Prayer Wall (Flat Container with Discrete Cards) */}
          <div className="section-flat stack">
            <div className="space-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
              <div>
                <div className="row" style={{ gap: 8 }}>
                  <HeartHandshake size={20} style={{ color: "var(--gold)" }} />
                  <h3 className="heading-md" style={{ margin: 0 }}>Circle Prayer Wall</h3>
                </div>
                <p className="muted" style={{ fontSize: "0.8rem", margin: "4px 0 0" }}>
                  Bear one another's burdens, and so fulfill the law of Christ. — Galatians 6:2
                </p>
              </div>
            </div>

            {/* Submit Prayer Request */}
            <form onSubmit={handleAddPrayer} className="field">
              <div className="row" style={{ gap: 10 }}>
                <input
                  type="text"
                  value={newPrayer}
                  onChange={(e) => setNewPrayer(e.target.value)}
                  placeholder="Share a prayer need with your circle brothers..."
                  style={{ flex: 1 }}
                />
                <button
                  type="submit"
                  className="button"
                  style={{ background: "var(--gold)", color: "#000", fontWeight: 800 }}
                >
                  <Send size={14} style={{ marginRight: 6 }} />
                  <span>Post</span>
                </button>
              </div>
            </form>

            {/* Prayer Requests List */}
            <div className="stack-sm" style={{ gap: 14 }}>
              {prayerList.map((item) => (
                <div key={item.id} className="card stack-sm" style={{ background: "rgba(255,255,255,0.6)", padding: 16 }}>
                  <div className="space-between">
                    <strong>{item.author}</strong>
                    <span className="muted" style={{ fontSize: "0.78rem" }}>{item.timeAgo}</span>
                  </div>
                  <p style={{ margin: "4px 0 8px", fontSize: "0.92rem", lineHeight: 1.5, color: "#1f2937" }}>
                    {item.request}
                  </p>
                  <div className="space-between" style={{ paddingTop: 8, borderTop: "1px solid var(--border)" }}>
                    <span className="muted" style={{ fontSize: "0.8rem" }}>
                      {item.prayedCount} brothers praying
                    </span>
                    <button
                      type="button"
                      onClick={() => togglePrayed(item.id)}
                      className={prayedSet[item.id] ? "button" : "button-secondary"}
                      style={{
                        padding: "4px 12px",
                        minHeight: 30,
                        fontSize: "0.75rem",
                        background: prayedSet[item.id] ? "var(--accent)" : undefined,
                        color: prayedSet[item.id] ? "#fff" : undefined,
                      }}
                    >
                      <Check size={12} style={{ marginRight: 4 }} />
                      <span>{prayedSet[item.id] ? "I Prayed" : "Stand in Prayer"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Right Col: Circle Roster (Flat Section Container)                  */}
        {/* ------------------------------------------------------------------ */}
        <div className="stack" style={{ gap: 20 }}>
          <div className="section-flat stack">
            <div className="row" style={{ gap: 8, borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
              <UsersRound size={18} style={{ color: "var(--gold)" }} />
              <h3 className="heading-md" style={{ margin: 0, fontSize: "1.1rem" }}>Brothers in this Circle</h3>
            </div>

            <div className="stack-sm" style={{ gap: 10 }}>
              <div className="card stack-sm" style={{ background: "rgba(255,255,255,0.7)", padding: 12, border: "1px solid rgba(182, 139, 53, 0.35)" }}>
                <div className="space-between">
                  <div>
                    <strong>Simba Ndlovu</strong>
                    <p className="muted" style={{ margin: 0, fontSize: "0.78rem" }}>Financial Analyst</p>
                  </div>
                  <span className="pill" style={{ fontSize: "0.7rem", padding: "2px 8px", minHeight: 22, borderColor: "var(--gold)" }}>
                    Circle Leader
                  </span>
                </div>
              </div>

              <div className="card stack-sm" style={{ background: "rgba(255,255,255,0.6)", padding: 12 }}>
                <div className="space-between">
                  <div>
                    <strong>Tawanda Moyo</strong>
                    <p className="muted" style={{ margin: 0, fontSize: "0.78rem" }}>Project Coordinator</p>
                  </div>
                  <span className="pill" style={{ fontSize: "0.7rem", padding: "2px 8px", minHeight: 22 }}>
                    Member
                  </span>
                </div>
              </div>

              <div className="card stack-sm" style={{ background: "rgba(255,255,255,0.6)", padding: 12 }}>
                <div className="space-between">
                  <div>
                    <strong>Tinashe Shumba</strong>
                    <p className="muted" style={{ margin: 0, fontSize: "0.78rem" }}>Software Engineer</p>
                  </div>
                  <span className="pill" style={{ fontSize: "0.7rem", padding: "2px 8px", minHeight: 22 }}>
                    Member
                  </span>
                </div>
              </div>

              <div className="card stack-sm" style={{ background: "rgba(255,255,255,0.6)", padding: 12 }}>
                <div className="space-between">
                  <div>
                    <strong>Farai Mutasa</strong>
                    <p className="muted" style={{ margin: 0, fontSize: "0.78rem" }}>Civil Engineer</p>
                  </div>
                  <span className="pill" style={{ fontSize: "0.7rem", padding: "2px 8px", minHeight: 22 }}>
                    Member
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
