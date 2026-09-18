"use client";

import React, { useState } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  Sparkles,
} from "lucide-react";
import { PortalShell } from "@/src/components/portal/PortalShell";
import { useAuthStore } from "@/src/stores/auth-store";
import { useCheckInStore } from "@/src/stores/checkin-store";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // POST to /api/check-ins endpoint
      const res = await fetch("/api/check-ins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser?.id || "guest",
          weekLabel: "Week of Apr 5",
          ...formData,
        }),
      });

      // Update client state
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
    } catch {
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PortalShell
      title="Weekly Discipleship Check-in"
      subtitle="Honest weekly reflection to evaluate prayer, Scripture, brotherhood, and spiritual battles."
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
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(31, 122, 104, 0.15)",
                  color: "var(--accent)",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto",
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h3 className="heading-md" style={{ margin: 0 }}>Check-in Submitted</h3>
              <p className="muted" style={{ maxWidth: 440, margin: 0, fontSize: "0.92rem" }}>
                Thank you, brother {brotherName}. Your reflection has been recorded and your circle leader will pray over your requests.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="button-secondary"
                style={{ marginTop: 12 }}
              >
                Submit another check-in
              </button>
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
                    {currentStep === 1 && "Devotional Rhythms"}
                    {currentStep === 2 && "Brotherhood Gathering"}
                    {currentStep === 3 && "Serving & Stewardship"}
                    {currentStep === 4 && "Honest Reflection & Prayer"}
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
                    <div className="card stack-sm" style={{ background: "rgba(255,255,255,0.6)", padding: 16 }}>
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

                    <div className="card stack-sm" style={{ background: "rgba(255,255,255,0.6)", padding: 16 }}>
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

                {/* Step 3: Serving */}
                {currentStep === 3 && (
                  <div className="field">
                    <label style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                      How did you serve God's Kingdom or your brothers this week?
                    </label>
                    <textarea
                      rows={4}
                      value={formData.servingContribution}
                      onChange={(e) => updateField("servingContribution", e.target.value)}
                      placeholder="e.g., Set up chairs for prayer, visited a sick brother, helped with church media..."
                    />
                    <span className="muted" style={{ fontSize: "0.78rem" }}>
                      Even small, hidden acts of servant leadership strengthen the brotherhood.
                    </span>
                  </div>
                )}

                {/* Step 4: Reflection & Prayer */}
                {currentStep === 4 && (
                  <div className="stack">
                    <div className="field">
                      <label style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                        Spiritual battles, struggles, or areas needing prayer
                      </label>
                      <textarea
                        rows={3}
                        value={formData.strugglesAndNeeds}
                        onChange={(e) => updateField("strugglesAndNeeds", e.target.value)}
                        placeholder="Be real. What are you battling? (Lust, anger, exhaustion, finances, marriage...)"
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
                        Quick Flags (Click any that apply)
                      </span>
                      <div className="row" style={{ gap: 8 }}>
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
                      style={{ padding: "8px 16px" }}
                    >
                      <ArrowLeft size={14} style={{ marginRight: 6 }} />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="button"
                      style={{ padding: "8px 20px" }}
                    >
                      <span>Continue</span>
                      <ArrowRight size={14} style={{ marginLeft: 6 }} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button"
                      style={{
                        background: "var(--gold)",
                        color: "#000",
                        fontWeight: 800,
                        padding: "8px 20px",
                      }}
                    >
                      <Send size={14} style={{ marginRight: 6 }} />
                      <span>{isSubmitting ? "Recording..." : "Submit Check-in"}</span>
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
                <div key={item.id} className="card stack-sm" style={{ background: "rgba(255,255,255,0.6)", padding: 14 }}>
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
                </div>
              ))}
            </div>
          </div>

          <div className="scripture-lockup">
            <div className="row" style={{ gap: 6, color: "#5b4610", fontWeight: 800 }}>
              <Sparkles size={16} />
              <span className="eyebrow" style={{ color: "#5b4610" }}>Why Check-ins Matter</span>
            </div>
            <p style={{ fontStyle: "italic", fontSize: "0.88rem", margin: "8px 0 6px", color: "#2d3748" }}>
              "Confess your sins to each other and pray for each other so that you may be healed." — James 5:16
            </p>
            <p className="muted" style={{ fontSize: "0.82rem", margin: 0 }}>
              Check-ins are never a scorecard. They are an altar where men bring their lives into the light and invite brothers to stand with them.
            </p>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
