"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  MessageSquare,
  PhoneCall,
  ShieldAlert,
  Undo2,
} from "lucide-react";
import { useDemoSession } from "@/components/session-provider";
import {
  checkInTemplate,
  getAccountabilityPartner,
  getUserById,
  submissions as initialSubmissions,
  users,
} from "@/lib/mock-data";

export default function CheckInPage() {
  const { session } = useDemoSession();
  const [submissionsList, setSubmissionsList] = useState(initialSubmissions);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({
    god_prayer_word: "yes",
    mind_wisdom: "yes",
    body_discipline: "yes",
    life_character: "yes",
    brother_sync: "yes",
    struggles: "",
    prayer_need: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!session) return null;

  const currentUser = getUserById(session.id);
  const isLeader =
    session.role === "group_leader" ||
    session.role === "level_leader" ||
    session.role === "admin";
  const partner = currentUser
    ? getAccountabilityPartner(currentUser.id)
    : undefined;

  const handleInputChange = (id: string, val: string) => {
    setFormData((prev) => ({ ...prev, [id]: val }));
  };

  const toggleResolveFollowUp = (submissionId: string) => {
    setResolvedIds((prev) =>
      prev.includes(submissionId)
        ? prev.filter((id) => id !== submissionId)
        : [...prev, submissionId],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFlags: string[] = [];

    if (formData.god_prayer_word === "no") newFlags.push("God Pillar Slipping");
    if (formData.body_discipline === "no") newFlags.push("Physical Slump");
    if (formData.brother_sync === "no") newFlags.push("Isolated from Partner");
    if (formData.struggles.trim().length > 15)
      newFlags.push("Needs Encouragement");

    const newSub = {
      id: `cs-${Date.now()}`,
      userId: session.id,
      templateId: checkInTemplate.id,
      weekLabel: "Current Week Review",
      answers: { ...formData },
      flags: newFlags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "published" as const,
    };

    setSubmissionsList([newSub, ...submissionsList]);
    setSubmitted(true);
  };

  // Submissions with active concern flags
  const flaggedSubmissions = submissionsList.filter((s) => s.flags.length > 0);
  const pendingCount = flaggedSubmissions.filter(
    (s) => !resolvedIds.includes(s.id),
  ).length;

  return (
    <div className="stack">
      {/* Header */}
      <div className="card card-dark stack">
        <div className="space-between">
          <div className="stack-sm">
            <span
              className="eyebrow"
              style={{ color: "rgba(255,255,255,.65)" }}
            >
              Weekly Formation Check-In
            </span>
            <h2 className="heading-lg" style={{ margin: 0 }}>
              {isLeader
                ? "Discipleship Reviews & Leader Triage"
                : checkInTemplate.title}
            </h2>
          </div>
          <span className="pill pill-dark">
            {isLeader ? "Leader View" : "Submission Due: Thursday"}
          </span>
        </div>
        <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>
          {isLeader
            ? "Review weekly reflections from your circle. Actively reach out to brothers carrying flags and log your follow-up."
            : "Honest evaluation across the 4 Pillars. Your group leader uses this to cover you in prayer and brotherly accountability."}
        </p>
      </div>

      {/* Leader Triage Queue (Visible if Leader or Admin) */}
      {isLeader && (
        <div className="card stack" style={{ borderLeft: "4px solid #eab308" }}>
          <div className="space-between">
            <div className="row" style={{ gap: 8, alignItems: "center" }}>
              <ShieldAlert size={22} color="#eab308" />
              <strong className="heading-md">
                Brothers Needing Triage & Follow-up
              </strong>
            </div>
            <span className="pill">{pendingCount} pending attention</span>
          </div>

          <div className="stack-sm">
            {flaggedSubmissions.map((sub) => {
              const brother = users.find((u) => u.id === sub.userId);
              if (!brother) return null;
              const isResolved = resolvedIds.includes(sub.id);

              return (
                <div
                  key={sub.id}
                  className="metric space-between"
                  style={{
                    opacity: isResolved ? 0.6 : 1,
                    transition: "all 0.2s ease",
                  }}
                >
                  <div className="stack-sm" style={{ gap: 4 }}>
                    <div
                      className="row"
                      style={{ gap: 8, alignItems: "center" }}
                    >
                      <strong>{brother.profile.fullName}</strong>
                      <span className="muted" style={{ fontSize: 13 }}>
                        {sub.weekLabel}
                      </span>
                      {isResolved && (
                        <span
                          className="pill"
                          style={{
                            fontSize: 11,
                            padding: "2px 8px",
                            borderColor: "#22c55e",
                            color: "#22c55e",
                          }}
                        >
                          ✓ Contacted & Prayed
                        </span>
                      )}
                    </div>

                    <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
                      {sub.flags.map((flag) => (
                        <span
                          key={flag}
                          className="pill pill-dark"
                          style={{
                            fontSize: 11,
                            padding: "2px 8px",
                            color: isResolved
                              ? "rgba(255,255,255,.5)"
                              : "#facc15",
                          }}
                        >
                          <AlertTriangle
                            size={11}
                            style={{ marginRight: 4, display: "inline" }}
                          />
                          {flag}
                        </span>
                      ))}
                    </div>

                    {typeof sub.answers.struggles === "string" &&
                      sub.answers.struggles && (
                        <p
                          className="muted"
                          style={{
                            margin: "4px 0 0",
                            fontSize: 13,
                            fontStyle: "italic",
                          }}
                        >
                          &ldquo;{sub.answers.struggles}&rdquo;
                        </p>
                      )}
                  </div>

                  {/* Leader Action Buttons */}
                  <div className="row" style={{ gap: 8, alignItems: "center" }}>
                    <a
                      href={`tel:${brother.profile.phone}`}
                      className="pill pill-dark row"
                      style={{
                        gap: 4,
                        textDecoration: "none",
                        alignItems: "center",
                      }}
                    >
                      <PhoneCall size={13} /> Call
                    </a>

                    <button
                      type="button"
                      onClick={() => toggleResolveFollowUp(sub.id)}
                      className={`pill ${isResolved ? "pill-dark" : ""}`}
                      style={{
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {isResolved ? (
                        <>
                          <Undo2 size={13} /> Undo
                        </>
                      ) : (
                        <>
                          <Check size={13} /> Mark Followed Up
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Member Form */}
      {submitted ? (
        <div
          className="card stack"
          style={{ textAlign: "center", padding: "36px 20px" }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CheckCircle2 size={44} color="#22c55e" />
          </div>
          <h3 className="heading-md" style={{ margin: 0 }}>
            Check-In Submitted for this Week
          </h3>
          <p className="muted" style={{ maxWidth: 480, margin: "0 auto" }}>
            Your honesty honors God and strengthens the brotherhood. Your
            responses and flags are visible to your group leader for prayer and
            follow-up.
          </p>
          <div>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="pill"
            >
              Edit Submission
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card stack">
          <strong className="heading-md">Self-Evaluation & Transparency</strong>

          {checkInTemplate.questions.map((q) => (
            <label key={q.id} className="field">
              <span style={{ fontWeight: 600 }}>{q.prompt}</span>

              {q.type === "boolean" && (
                <select
                  value={formData[q.id] || "yes"}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                >
                  <option value="yes">Yes - Walked consistently</option>
                  <option value="no">No - Fell short or struggled</option>
                </select>
              )}

              {q.type === "text" && (
                <textarea
                  rows={3}
                  value={formData[q.id] || ""}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder="Share honestly. Iron sharpens iron."
                />
              )}
            </label>
          ))}

          {partner && (
            <div
              className="metric space-between"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <div className="stack-sm" style={{ gap: 2 }}>
                <strong>Accountability Partner Notice</strong>
                <span className="muted" style={{ fontSize: 13 }}>
                  Your submission status is shared with{" "}
                  {partner.profile.fullName} to foster mutual discipline.
                </span>
              </div>
            </div>
          )}

          <button type="submit" className="button">
            Submit Weekly Check-In
          </button>
        </form>
      )}

      {/* Submission History Snapshot */}
      <div className="card stack">
        <strong className="heading-md">Past Submission Archive</strong>
        {submissionsList.map((sub) => {
          const author = users.find((u) => u.id === sub.userId);
          const isResolved = resolvedIds.includes(sub.id);

          return (
            <div key={sub.id} className="metric space-between">
              <div className="stack-sm" style={{ gap: 4 }}>
                <div className="row" style={{ gap: 8, alignItems: "center" }}>
                  <strong>{sub.weekLabel}</strong>
                  {author && (
                    <span className="muted">by {author.profile.fullName}</span>
                  )}
                  {isResolved && (
                    <span
                      className="muted"
                      style={{ fontSize: 12, color: "#22c55e" }}
                    >
                      (Resolved)
                    </span>
                  )}
                </div>
                <span className="muted">
                  {sub.flags.length
                    ? sub.flags.join(" · ")
                    : "Consistent - No concern flags"}
                </span>
              </div>
              <span
                className={`pill ${sub.flags.length && !isResolved ? "pill-dark" : ""}`}
              >
                {isResolved
                  ? "Followed Up"
                  : sub.flags.length
                    ? "Flagged for Care"
                    : "Clean"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
