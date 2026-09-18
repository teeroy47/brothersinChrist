"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  CheckCircle2,
  AlertTriangle,
  PhoneCall,
  UserPlus,
  RefreshCw,
  Sparkles,
  X,
  Calendar,
  Mail,
  MapPin,
  Shield,
  Layers,
} from "lucide-react";
import { useAuthStore } from "@/src/stores/auth-store";

interface BrotherRecord {
  id: string;
  email: string;
  name: string;
  firstName: string;
  role: string;
  levelNumber: number;
  levelTitle: string;
  groupName: string;
  church: string;
  occupation: string;
  phone: string;
  city: string;
  consistencyScore: number;
  createdAt: string;
}

export default function LeadershipOverviewPage() {
  const { currentUser } = useAuthStore();
  const [members, setMembers] = useState<BrotherRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [calledSet, setCalledSet] = useState<Record<string, boolean>>({});

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "bic" + Math.floor(1000 + Math.random() * 9000),
    role: "MEMBER",
    levelNumber: 1,
    phone: "",
    city: "Harare",
    church: "Brothers In Christ",
    occupation: "Brother",
  });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/members");
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (err) {
      console.error("Failed to fetch members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleCreateBrother = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setModalError(data.error || "Failed to create brother.");
        setIsSubmitting(false);
        return;
      }

      // Success: Close modal, reset form, refresh list
      setIsModalOpen(false);
      setFormData({
        fullName: "",
        email: "",
        password: "bic" + Math.floor(1000 + Math.random() * 9000),
        role: "MEMBER",
        levelNumber: 1,
        phone: "",
        city: "Harare",
        church: "Brothers In Christ",
        occupation: "Brother",
      });
      setActionSuccess(`Brother ${data.name || formData.fullName} added successfully.`);
      setTimeout(() => setActionSuccess(null), 4000);
      fetchMembers();
    } catch {
      setModalError("Network error while creating brother.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCalled = (id: string) => {
    setCalledSet((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Derived metrics
  const totalBrothers = members.length;
  const leadersCount = members.filter((m) => m.role !== "MEMBER").length;
  const newBelieversCount = members.filter((m) => m.levelNumber === 1).length;
  const avgConsistency = totalBrothers > 0
    ? Math.round(members.reduce((acc, m) => acc + (m.consistencyScore || 100), 0) / totalBrothers)
    : 100;

  const followUpBrothers = [
    {
      id: "f-1",
      name: "Tawanda Moyo",
      circle: "Harare Central Men",
      flag: "Work exhaustion & family tension",
      submitted: "2 days ago",
      consistency: "82%",
      phone: "+263 77 123 4567",
    },
  ];

  return (
    <div className="stack" style={{ gap: 28 }}>
      {/* Action Notification Banner */}
      {actionSuccess && (
        <div
          className="row"
          style={{
            background: "rgba(31, 122, 104, 0.12)",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            padding: "12px 18px",
            borderRadius: 14,
            fontWeight: 700,
            fontSize: "0.9rem",
            gap: 10,
          }}
        >
          <CheckCircle2 size={18} />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 1. Real Database Overview Metrics                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid-4">
        <div className="card stack-sm">
          <div className="space-between">
            <span className="data-label">Registered Brothers</span>
            <Users size={16} style={{ color: "var(--gold)" }} />
          </div>
          <strong className="data-value">{loading ? "..." : totalBrothers}</strong>
          <span className="data-detail" style={{ color: "var(--accent)", fontWeight: 700 }}>
            Active in PostgreSQL
          </span>
        </div>

        <div className="card stack-sm">
          <div className="space-between">
            <span className="data-label">Leaders & Admins</span>
            <Shield size={16} style={{ color: "var(--gold)" }} />
          </div>
          <strong className="data-value">{loading ? "..." : leadersCount}</strong>
          <span className="data-detail">Shepherding brotherhood</span>
        </div>

        <div className="card stack-sm">
          <div className="space-between">
            <span className="data-label">New Believers</span>
            <Layers size={16} style={{ color: "var(--gold)" }} />
          </div>
          <strong className="data-value">{loading ? "..." : newBelieversCount}</strong>
          <span className="data-detail">Level 1 formation stage</span>
        </div>

        <div className="card stack-sm">
          <div className="space-between">
            <span className="data-label">Avg Consistency</span>
            <Sparkles size={16} style={{ color: "var(--accent)" }} />
          </div>
          <strong className="data-value" style={{ color: "var(--accent)" }}>
            {loading ? "..." : `${avgConsistency}%`}
          </strong>
          <span className="data-detail" style={{ color: "var(--accent)", fontWeight: 700 }}>
            Discipline rhythm
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Registered Brothers Directory (Live Database Roster)             */}
      {/* ------------------------------------------------------------------ */}
      <div className="section-flat stack">
        <div className="space-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12, flexWrap: "wrap", gap: 10 }}>
          <div className="row" style={{ gap: 8 }}>
            <Users size={20} style={{ color: "var(--gold)" }} />
            <div>
              <h2 className="heading-md" style={{ margin: 0, fontSize: "1.15rem" }}>
                Brotherhood Directory ({members.length})
              </h2>
              <span className="muted" style={{ fontSize: "0.78rem" }}>
                All registered accounts in the local PostgreSQL database
              </span>
            </div>
          </div>

          <div className="row" style={{ gap: 8 }}>
            <button
              type="button"
              onClick={fetchMembers}
              className="button-secondary"
              style={{ fontSize: "0.8rem", padding: "6px 12px" }}
              title="Refresh roster from database"
            >
              <RefreshCw size={14} className={loading ? "spin" : ""} style={{ marginRight: 6 }} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="button"
              style={{
                fontSize: "0.82rem",
                padding: "8px 16px",
                background: "var(--gold)",
                color: "#000",
                fontWeight: 800,
              }}
            >
              <UserPlus size={15} style={{ marginRight: 6 }} />
              <span>+ Add Brother</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "32px 0", textAlign: "center" }} className="muted">
            Loading brotherhood records from PostgreSQL...
          </div>
        ) : members.length === 0 ? (
          <div style={{ padding: "32px 16px", textAlign: "center" }} className="card stack-sm">
            <strong>No Registered Brothers Found</strong>
            <p className="muted" style={{ margin: 0, fontSize: "0.88rem" }}>
              The database has no registered brothers. Click <strong>"+ Add Brother"</strong> above to provision an account, or share the registration link.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={{ padding: "10px 12px", color: "var(--muted)", fontWeight: 700 }}>Brother</th>
                  <th style={{ padding: "10px 12px", color: "var(--muted)", fontWeight: 700 }}>Role</th>
                  <th style={{ padding: "10px 12px", color: "var(--muted)", fontWeight: 700 }}>Formation Level</th>
                  <th style={{ padding: "10px 12px", color: "var(--muted)", fontWeight: 700 }}>Circle / Church</th>
                  <th style={{ padding: "10px 12px", color: "var(--muted)", fontWeight: 700 }}>Score</th>
                  <th style={{ padding: "10px 12px", color: "var(--muted)", fontWeight: 700 }}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => {
                  const roleBadgeColor =
                    m.role === "ADMIN"
                      ? "var(--gold)"
                      : m.role.includes("LEADER")
                      ? "var(--accent)"
                      : "var(--muted)";

                  const formattedDate = new Date(m.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <tr key={m.id} style={{ borderBottom: "1px solid rgba(119, 132, 154, 0.15)" }}>
                      <td style={{ padding: "12px" }}>
                        <div className="row" style={{ gap: 10 }}>
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: "rgba(182, 139, 53, 0.15)",
                              color: "var(--gold)",
                              fontWeight: 800,
                              fontSize: "0.85rem",
                              display: "grid",
                              placeItems: "center",
                              flexShrink: 0,
                            }}
                          >
                            {m.firstName?.[0] || m.name?.[0] || "B"}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: "var(--foreground)" }}>{m.name}</div>
                            <div className="muted" style={{ fontSize: "0.75rem" }}>{m.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px" }}>
                        <span
                          className="pill"
                          style={{
                            fontSize: "0.68rem",
                            padding: "2px 8px",
                            minHeight: 22,
                            borderColor: roleBadgeColor,
                            color: roleBadgeColor,
                            fontWeight: 700,
                          }}
                        >
                          {m.role.replace("_", " ")}
                        </span>
                      </td>
                      <td style={{ padding: "12px" }}>
                        <div style={{ fontWeight: 600 }}>{m.levelTitle}</div>
                        <span className="muted" style={{ fontSize: "0.74rem" }}>Stage {m.levelNumber}</span>
                      </td>
                      <td style={{ padding: "12px" }}>
                        <div>{m.church}</div>
                        <span className="muted" style={{ fontSize: "0.74rem" }}>{m.city}</span>
                      </td>
                      <td style={{ padding: "12px", fontWeight: 700, color: "var(--accent)" }}>
                        {m.consistencyScore}%
                      </td>
                      <td style={{ padding: "12px", color: "var(--muted)", fontSize: "0.78rem" }}>
                        {formattedDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Brothers Needing Pastoral Follow-Up                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="section-flat stack">
        <div className="space-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
          <div className="row" style={{ gap: 8 }}>
            <AlertTriangle size={20} style={{ color: "var(--gold)" }} />
            <h2 className="heading-md" style={{ margin: 0, fontSize: "1.1rem" }}>
              Brothers Requesting Prayer / Pastoral Care
            </h2>
          </div>
          <span className="muted" style={{ fontSize: "0.8rem" }}>Shepherd with promptness</span>
        </div>

        <div className="stack-sm" style={{ gap: 12 }}>
          {followUpBrothers.map((brother) => (
            <div
              key={brother.id}
              className="card stack-sm"
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                padding: 16,
                border: "1px solid rgba(197, 48, 48, 0.25)",
              }}
            >
              <div className="space-between" style={{ flexWrap: "wrap", gap: 12 }}>
                <div className="stack-sm" style={{ gap: 2 }}>
                  <div className="row" style={{ gap: 8 }}>
                    <strong>{brother.name}</strong>
                    <span className="pill" style={{ fontSize: "0.7rem", padding: "2px 8px", minHeight: 22 }}>
                      {brother.circle}
                    </span>
                  </div>
                  <p style={{ margin: "2px 0 0", fontSize: "0.88rem", color: "#c53030", fontWeight: 700 }}>
                    {brother.flag}
                  </p>
                  <span className="muted" style={{ fontSize: "0.75rem" }}>Submitted {brother.submitted}</span>
                </div>

                <div className="row" style={{ gap: 8 }}>
                  <a
                    href={`tel:${brother.phone}`}
                    className="button-secondary"
                    style={{ fontSize: "0.78rem", padding: "6px 14px" }}
                  >
                    <PhoneCall size={14} style={{ marginRight: 6, color: "var(--gold)" }} />
                    <span>Call Brother</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => toggleCalled(brother.id)}
                    className="button"
                    style={{
                      fontSize: "0.78rem",
                      padding: "6px 16px",
                      background: calledSet[brother.id] ? "var(--accent)" : "var(--gold)",
                      color: calledSet[brother.id] ? "#fff" : "#000",
                      fontWeight: 800,
                    }}
                  >
                    {calledSet[brother.id] ? "Contacted" : "Mark Contacted"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Modal: Add / Provision New Brother                              */}
      {/* ------------------------------------------------------------------ */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 16, 26, 0.65)",
            backdropFilter: "blur(6px)",
            display: "grid",
            placeItems: "center",
            padding: 16,
            zIndex: 9999,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="card stack"
            style={{
              maxWidth: 540,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "var(--surface)",
              boxShadow: "0 20px 45px rgba(0,0,0,0.3)",
              padding: 24,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
              <div className="row" style={{ gap: 8 }}>
                <UserPlus size={20} style={{ color: "var(--gold)" }} />
                <h3 className="heading-md" style={{ margin: 0 }}>Provision New Brother</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {modalError && (
              <div
                style={{
                  background: "rgba(197, 48, 48, 0.1)",
                  border: "1px solid rgba(197, 48, 48, 0.3)",
                  color: "#c53030",
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontSize: "0.85rem",
                }}
              >
                {modalError}
              </div>
            )}

            <form className="stack" onSubmit={handleCreateBrother} style={{ gap: 14 }}>
              <label className="field">
                <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>Full Name *</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tendai Mupfumi"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </label>

              <label className="field">
                <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>Email Address *</span>
                <input
                  type="email"
                  required
                  placeholder="tendai@bic.app"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </label>

              <label className="field">
                <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>Temporary Password</span>
                <input
                  type="text"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <span className="muted" style={{ fontSize: "0.74rem" }}>
                  Brother can change this later from their profile.
                </span>
              </label>

              <div className="grid-2" style={{ gap: 12 }}>
                <label className="field">
                  <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>Role</span>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: 10,
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.9)",
                    }}
                  >
                    <option value="MEMBER">Member</option>
                    <option value="GROUP_LEADER">Group Leader</option>
                    <option value="LEVEL_LEADER">Level Leader</option>
                    <option value="ADMIN">Super Admin</option>
                  </select>
                </label>

                <label className="field">
                  <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>Formation Level</span>
                  <select
                    value={formData.levelNumber}
                    onChange={(e) => setFormData({ ...formData, levelNumber: Number(e.target.value) })}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: 10,
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.9)",
                    }}
                  >
                    <option value={1}>Level 1: New Believers</option>
                    <option value={2}>Level 2: Disciples</option>
                    <option value={3}>Level 3: Disciplers</option>
                    <option value={4}>Level 4: Shepherds</option>
                    <option value={5}>Level 5: Leaders</option>
                  </select>
                </label>
              </div>

              <div className="grid-2" style={{ gap: 12 }}>
                <label className="field">
                  <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>Phone</span>
                  <input
                    type="tel"
                    placeholder="+263 77 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </label>

                <label className="field">
                  <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>City</span>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </label>
              </div>

              <div className="space-between" style={{ paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="button-secondary"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button"
                  disabled={isSubmitting}
                  style={{ background: "var(--gold)", color: "#000", fontWeight: 800 }}
                >
                  {isSubmitting ? "Creating..." : "Save & Provision Brother"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
