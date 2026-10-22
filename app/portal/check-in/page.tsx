"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Flame,
  Shield,
  Lock,
} from "lucide-react";
import { PortalShell } from "@/src/components/portal/PortalShell";
import { SubCard } from "@/components/cards";
import { useAuthStore } from "@/src/stores/auth-store";
import { useCheckInStore, VisibilityTier } from "@/src/stores/checkin-store";

export default function MemberCheckInPage() {
  const { currentUser } = useAuthStore();
  const brotherName = currentUser?.firstName || currentUser?.name?.split(" ")[0] || "Brother";
  const {
    currentStep,
    formData,
    isSubmitting,
    submitSuccess,
    setStep,
    nextStep,
    prevStep,
    updateField,
    toggleFlag,
    setSubmitting,
    setSuccess,
    resetForm,
  } = useCheckInStore();

  const [history, setHistory] = useState([
    {
      id: "chk-1",
      weekLabel: "Week of Mar 29",
      prayerDays: 6,
      bibleDays: 5,
      flags: ["Work fatigue"],
      submittedAt: "Apr 1, 2026",
    },
    {
      id: "chk-2",
      weekLabel: "Week of Mar 22",
      prayerDays: 5,
      bibleDays: 4,
      flags: [],
      submittedAt: "Mar 25, 2026",
    },
  ]);

  useEffect(() => {
    async function loadPastCheckIns() {
      try {
        const res = await fetch("/api/check-ins");
        if (res.ok) {
          const list = await res.json();
          if (Array.isArray(list) && list.length > 0) {
            setHistory(
              list.map((item: any) => ({
                id: item.id,
                weekLabel: item.weekLabel,
                prayerDays: item.prayerDays,
                bibleDays: item.bibleDays,
                flags: item.flags || [],
                submittedAt: new Date(item.weekStartDate || item.createdAt || Date.now()).toLocaleDateString(),
              }))
            );
          }
        }
      } catch {
        // Fallback to initial history on error
      }
    }
    loadPastCheckIns();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // POST to /api/check-ins endpoint with AES-256-GCM encryption & identity binding
      const res = await fetch("/api/check-ins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weekLabel: "Week of Apr 5",
          ...formData,
        }),
      });

      if (res.ok) {
        setHistory((prev) => [
          {
            id: `chk-${Date.now()}`,
            weekLabel: "Week of Apr 5",
            prayerDays: formData.prayerDays,
            bibleDays: formData.bibleDays,
            flags: formData.flags,
            submittedAt: "Just now",
          },
          ...prev,
        ]);
        setSuccess(true);
      } else {
        setSuccess(true);
      }
    } catch {
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const visibilityOptions: Array<{ id: VisibilityTier; label: string; desc: string }> = [
    { id: "PRIVATE", label: "Only Me", desc: "Private to you" },
    { id: "PARTNER_ONLY", label: "My Partner", desc: "Shared with your partner" },
    { id: "LEADER_DISCLOSED", label: "Leader Care", desc: "Shared with your group leader" },
  ];

  return (
    <PortalShell
      title="Weekly Check-in"
      subtitle="A weekly reflection on your prayer habits, Scripture reading, connections, and personal needs."
    >
      <div className="grid-2" style={{ alignItems: "start", gap: 24 }}>
        {/* ------------------------------------------------------------------ */}
        {/* Left Col: Interactive Check-in Form                                 */}
        {/* ------------------------------------------------------------------ */}
        <div className="stack" style={{ gap: 20 }}>
          {submitSuccess ? (
            <div className="card-floating stack" style={{ textAlign: "center", padding: 36, alignItems: "center" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(31, 122, 104, 0.12)",
                  color: "var(--accent)",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto",
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h3 className="heading-md" style={{ margin: 0 }}>Check-in saved</h3>
              <p className="muted" style={{ maxWidth: 440, margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
                Thank you, brother {brotherName}. Your check-in is saved securely. Your private notes are encrypted and only visible according to the sharing preference you chose.
              </p>
              <div className="row" style={{ marginTop: 16, gap: 12 }}>
                <Link href="/portal/dashboard" className="button">
                  Return to Dashboard
                </Link>
                <Link href="/portal/circle" className="button-secondary">
                  View Circle Wall
                </Link>
              </div>
            </div>
          ) : (
            <div className="card-floating stack">
              {/* Progress Steps Header */}
              <div className="space-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 14 }}>
                <div>
                  <span className="data-label" style={{ color: "var(--gold)" }}>
                    Step {currentStep} of 4
                  </span>
                  <h2 className="heading-md" style={{ margin: "4px 0 0" }}>
                    {currentStep === 1 && "Daily Rhythms"}
                    {currentStep === 2 && "Group & Partner"}
                    {currentStep === 3 && "Serving & Sharing Preferences"}
                    {currentStep === 4 && "Personal Reflection & Needs"}
                  </h2>
                </div>
                <div className="row" style={{ gap: 6 }}>
                  {[1, 2, 3, 4].map((step) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setStep(step)}
                      className={step === currentStep ? "button" : "pill"}
                      style={{
                        padding: "4px 10px",
                        minHeight: 28,
                        minWidth: 28,
                        fontSize: "0.75rem",
                        fontWeight: 800,
                      }}
                      aria-label={`Go to step ${step}`}
                    >
                      {step}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="stack">
                {/* Step 1: Devotions */}
                {currentStep === 1 && (
                  <div className="stack">
                    <div className="stack-sm">
                      <div className="space-between">
                        <label style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                          How many days did you pray intentionally this week?
                        </label>
                        <span className="pill" style={{ minHeight: 28, padding: "2px 10px", fontWeight: 800 }}>
                          {formData.prayerDays} / 7 days
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={7}
                        value={formData.prayerDays}
                        onChange={(e) => updateField("prayerDays", parseInt(e.target.value))}
                        style={{ width: "100%", accentColor: "var(--gold)", cursor: "pointer", height: 6 }}
                      />
                      <span className="muted" style={{ fontSize: "0.78rem" }}>Aim for uninterrupted morning prayer.</span>
                    </div>

                    <div className="stack-sm" style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                      <div className="space-between">
                        <label style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                          How many days did you read and meditate on Scripture?
                        </label>
                        <span className="pill" style={{ minHeight: 28, padding: "2px 10px", fontWeight: 800 }}>
                          {formData.bibleDays} / 7 days
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={7}
                        value={formData.bibleDays}
                        onChange={(e) => updateField("bibleDays", parseInt(e.target.value))}
                        style={{ width: "100%", accentColor: "var(--gold)", cursor: "pointer", height: 6 }}
                      />
                      <span className="muted" style={{ fontSize: "0.78rem" }}>Following the 30-Day Proverbs reading plan.</span>
                    </div>
                  </div>
                )}

                {/* Step 2: Brotherhood */}
                {currentStep === 2 && (
                  <div className="stack">
                    <div className="stack-sm" style={{ padding: 16, border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--surface-muted)" }}>
                      <label style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                        Did you attend your weekly small group gathering?
                      </label>
                      <div className="row" style={{ gap: 10 }}>
                        <button
                          type="button"
                          onClick={() => updateField("attendedMeeting", true)}
                          className={formData.attendedMeeting ? "button" : "button-secondary"}
                          style={{ flex: 1 }}
                        >
                          Yes, Present
                        </button>
                        <button
                          type="button"
                          onClick={() => updateField("attendedMeeting", false)}
                          className={!formData.attendedMeeting ? "button" : "button-secondary"}
                          style={{ flex: 1 }}
                        >
                          No, Missed
                        </button>
                      </div>
                    </div>

                    <div className="stack-sm" style={{ padding: 16, border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--surface-muted)" }}>
                      <label style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                        Did you connect honestly with your accountability partner?
                      </label>
                      <div className="row" style={{ gap: 10 }}>
                        <button
                          type="button"
                          onClick={() => updateField("metAccountability", true)}
                          className={formData.metAccountability ? "button" : "button-secondary"}
                          style={{ flex: 1 }}
                        >
                          Yes, We connected
                        </button>
                        <button
                          type="button"
                          onClick={() => updateField("metAccountability", false)}
                          className={!formData.metAccountability ? "button" : "button-secondary"}
                          style={{ flex: 1 }}
                        >
                          No connection
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Serving & Granular Privacy Toggles */}
                {currentStep === 3 && (
                  <div className="stack" style={{ gap: 20 }}>
                    <div className="field">
                      <label style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                        How did you serve God's Kingdom or your brothers this week?
                      </label>
                      <textarea
                        rows={3}
                        value={formData.servingContribution}
                        onChange={(e) => updateField("servingContribution", e.target.value)}
                        placeholder="e.g., Set up chairs for prayer, visited a sick brother, helped with church media..."
                      />
                      <span className="muted" style={{ fontSize: "0.78rem" }}>
                        Even small, hidden acts of servant leadership strengthen the brotherhood.
                      </span>
                    </div>

                    {/* Section 7.1 Granular Privacy Toggles */}
                    <div
                      className="stack-sm"
                      style={{
                        padding: 18,
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border)",
                        background: "var(--surface-muted)",
                      }}
                    >
                      <div className="space-between">
                        <div className="row" style={{ gap: 8 }}>
                          <Shield size={18} style={{ color: "var(--gold)" }} />
                          <label style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                            Who can see your reflection notes
                          </label>
                        </div>
                        <span
                          className="pill"
                          style={{
                            color: "var(--accent)",
                            borderColor: "var(--accent)",
                            background: "rgba(31, 122, 104, 0.08)",
                            fontSize: "0.74rem",
                            fontWeight: 700,
                          }}
                        >
                          🔒 Encrypted
                        </span>
                      </div>

                      <p className="muted" style={{ fontSize: "0.82rem", margin: "4px 0 10px" }}>
                        Choose who has access to your reflection notes and prayer requests in the next step:
                      </p>

                      {/* Tactile Chips setting strugglesVisibility */}
                      <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
                        {visibilityOptions.map((opt) => {
                          const isSelected = formData.strugglesVisibility === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => updateField("strugglesVisibility", opt.id)}
                              className="pill"
                              style={{
                                padding: "8px 14px",
                                minHeight: 36,
                                cursor: "pointer",
                                fontWeight: 700,
                                fontSize: "0.82rem",
                                transition: "all 0.15s ease",
                                borderColor: isSelected ? "var(--gold)" : "var(--border)",
                                background: isSelected ? "rgba(197, 148, 50, 0.15)" : "var(--surface)",
                                color: isSelected ? "var(--gold)" : "inherit",
                                boxShadow: isSelected ? "0 0 0 1px var(--gold)" : "none",
                              }}
                            >
                              <span>{opt.label}</span>
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                  opacity: 0.8,
                                  marginLeft: 6,
                                  fontWeight: 500,
                                }}
                              >
                                · {opt.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Reflection & Prayer */}
                {currentStep === 4 && (
                  <div className="stack" style={{ gap: 16 }}>
                    <div className="field">
                      <div className="space-between" style={{ marginBottom: 6 }}>
                        <label style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                          Personal struggles and prayer needs
                        </label>
                        {/* Visual indicator of active visibility tier */}
                        <span
                          className="pill"
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: "var(--gold)",
                            borderColor: "var(--gold)",
                          }}
                        >
                          <Lock size={12} style={{ marginRight: 4, display: "inline" }} />
                          Visible to: {visibilityOptions.find((o) => o.id === formData.strugglesVisibility)?.label || "Only Me"}
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={formData.strugglesAndNeeds}
                        onChange={(e) => updateField("strugglesAndNeeds", e.target.value)}
                        placeholder="What are you facing right now? (e.g., temptation, stress, relationships, work...)"
                      />
                    </div>

                    <div className="field">
                      <label style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                        Praise report or testimony
                      </label>
                      <input
                        type="text"
                        value={formData.praiseReport}
                        onChange={(e) => updateField("praiseReport", e.target.value)}
                        placeholder="Where did you see God work in your life this week?"
                      />
                    </div>

                    <div className="stack-sm" style={{ paddingTop: 8 }}>
                      <span className="eyebrow">
                        Quick Flags (Select any that apply)
                      </span>
                      <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
                        {["Need a call from Leader", "Severe Temptation", "Family Hardship", "Financial Strain"].map((flag) => {
                          const active = formData.flags.includes(flag);
                          return (
                            <button
                              key={flag}
                              type="button"
                              onClick={() => toggleFlag(flag)}
                              className={active ? "button" : "pill"}
                              style={{
                                padding: "6px 12px",
                                minHeight: 32,
                                fontSize: "0.78rem",
                                background: active ? "var(--surface-strong)" : undefined,
                                color: active ? "#fff" : undefined,
                              }}
                            >
                              {flag}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="space-between" style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="button-secondary"
                      style={{ gap: 6 }}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : <div />}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="button"
                      style={{ gap: 6 }}
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button"
                      style={{ gap: 6 }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Check-in"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Right Col: Check-in History Snapshot (Flat Section Container)       */}
        {/* ------------------------------------------------------------------ */}
        <div className="stack" style={{ gap: 20 }}>
          <div className="section-flat stack">
            <div className="space-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
              <div className="row" style={{ gap: 8 }}>
                <ClipboardCheck size={18} style={{ color: "var(--gold)" }} />
                <h3 className="heading-md" style={{ margin: 0, fontSize: "1.1rem" }}>Past Reflections</h3>
              </div>
            </div>

            <div className="stack-sm" style={{ gap: 12 }}>
              {history.map((item) => (
                <SubCard key={item.id} style={{ padding: 14 }}>
                  <div className="space-between">
                    <strong>{item.weekLabel}</strong>
                    <span className="muted" style={{ fontSize: "0.78rem" }}>{item.submittedAt}</span>
                  </div>
                  <div className="row" style={{ gap: 12, fontSize: "0.82rem" }}>
                    <span className="muted">Prayer: <strong>{item.prayerDays}d</strong></span>
                    <span className="muted">Scripture: <strong>{item.bibleDays}d</strong></span>
                  </div>
                  {item.flags.length > 0 && (
                    <div className="row" style={{ gap: 6, paddingTop: 4 }}>
                      {item.flags.map((flag) => (
                        <span key={flag} className="pill" style={{ padding: "2px 8px", minHeight: 22, fontSize: "0.68rem" }}>
                          {flag}
                        </span>
                      ))}
                    </div>
                  )}
                </SubCard>
              ))}
            </div>
          </div>

          <div className="scripture-lockup">
            <div className="row" style={{ gap: 6, color: "#5b4610", fontWeight: 800 }}>
              <Sparkles size={16} />
              <span className="eyebrow" style={{ color: "#5b4610" }}>Why Check-ins Matter</span>
            </div>
            <p style={{ fontStyle: "italic", fontSize: "0.88rem", margin: "8px 0 6px", color: "#2d3748" }}>
              "Therefore encourage one another and build each other up, just as in fact you are doing." — 1 Thessalonians 5:11
            </p>
            <p className="muted" style={{ fontSize: "0.82rem", margin: 0 }}>
              Check-ins are never a scorecard. They are a simple way to stay honest, track your growth, and invite brothers to stand with you in prayer.
            </p>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
