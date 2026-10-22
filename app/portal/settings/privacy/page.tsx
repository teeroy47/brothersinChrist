"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Shield,
  Download,
  Trash2,
  Lock,
  UserCheck,
  Eye,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { PortalShell } from "@/src/components/portal/PortalShell";
import { useAuthStore } from "@/src/stores/auth-store";

export default function PrivacySettingsPage() {
  const router = useRouter();
  const { currentUser, signOut } = useAuthStore();

  const [consents, setConsents] = useState<Record<string, boolean>>({
    LEADER_OVERVIEW: true,
    PARTNER_SHARING: true,
    EMAIL_REMINDERS: true,
  });

  const [loading, setLoading] = useState(true);
  const [updatingConsent, setUpdatingConsent] = useState<string | null>(null);
  const [purgeStatus, setPurgeStatus] = useState<string | null>(null);
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPurgeConfirm, setShowPurgeConfirm] = useState(false);

  useEffect(() => {
    async function loadConsents() {
      try {
        const res = await fetch("/api/user/consent");
        if (res.ok) {
          const data = await res.json();
          if (data.consents) {
            setConsents(data.consents);
          }
        }
      } catch {
        // Fallback to defaults
      } finally {
        setLoading(false);
      }
    }
    loadConsents();
  }, []);

  const handleToggleConsent = async (purposeCode: string) => {
    const nextState = !consents[purposeCode];
    setUpdatingConsent(purposeCode);

    try {
      const res = await fetch("/api/user/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purposeCode,
          granted: nextState,
        }),
      });

      if (res.ok) {
        setConsents((prev) => ({ ...prev, [purposeCode]: nextState }));
      }
    } catch {
      // Failed to update
    } finally {
      setUpdatingConsent(null);
    }
  };

  const handleDownloadArchive = () => {
    window.location.href = "/api/user/export";
  };

  const handlePurgeConfessions = async () => {
    setPurgeStatus("Clearing notes...");
    try {
      const res = await fetch("/api/user/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "purge_confessions" }),
      });

      const data = await res.json();
      if (res.ok) {
        setPurgeStatus("All personal reflection notes have been permanently cleared.");
        setShowPurgeConfirm(false);
      } else {
        setPurgeStatus("Could not clear notes: " + (data.error || "Please try again"));
      }
    } catch {
      setPurgeStatus("Connection error while clearing notes.");
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteStatus("Deleting account...");
    try {
      const res = await fetch("/api/user/account", {
        method: "DELETE",
      });

      if (res.ok) {
        setDeleteStatus("Account deleted. Redirecting...");
        await signOut();
        router.push("/signin");
      } else {
        const data = await res.json();
        setDeleteStatus("Could not delete account: " + (data.error || "Please try again"));
      }
    } catch {
      setDeleteStatus("Connection error during deletion.");
    }
  };

  return (
    <PortalShell
      title="Privacy & Sharing"
      subtitle="Manage what you share with your partner and group, download your data, or delete your account."
    >
      <div className="stack" style={{ gap: 24, maxWidth: 960 }}>
        {/* Privacy Assurance Banner */}
        <div
          className="card"
          style={{
            borderLeft: "4px solid var(--accent)",
            background: "linear-gradient(135deg, rgba(31, 122, 104, 0.05) 0%, rgba(197, 148, 50, 0.04) 100%)",
            padding: 24,
          }}
        >
          <div className="space-between" style={{ flexWrap: "wrap", gap: 12 }}>
            <div className="row" style={{ gap: 12 }}>
              <ShieldCheck size={28} style={{ color: "var(--accent)" }} />
              <div>
                <strong style={{ fontSize: "1.05rem" }}>Your personal notes are private and encrypted</strong>
                <p className="muted" style={{ margin: "4px 0 0", fontSize: "0.85rem" }}>
                  Personal struggles and reflection notes are encrypted before saving. Nobody in the brotherhood can read them unless you explicitly choose to share them.
                </p>
              </div>
            </div>
            <span
              className="pill"
              style={{
                color: "var(--accent)",
                borderColor: "var(--accent)",
                fontWeight: 700,
                fontSize: "0.78rem",
              }}
            >
              Encrypted & Private
            </span>
          </div>
        </div>

        {/* 1. Who Has Access */}
        <div className="section-flat stack" style={{ gap: 16 }}>
          <div className="space-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
            <div className="row" style={{ gap: 8 }}>
              <Eye size={18} style={{ color: "var(--gold)" }} />
              <h2 className="heading-md" style={{ margin: 0, fontSize: "1.15rem" }}>
                Who can see your information
              </h2>
            </div>
          </div>

          <p className="muted" style={{ fontSize: "0.88rem", margin: 0 }}>
            Here is an overview of who currently has access to your activity:
          </p>

          <div className="grid-2" style={{ gap: 16 }}>
            <div
              className="card stack-sm"
              style={{
                padding: 18,
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="space-between">
                <span className="eyebrow" style={{ color: "var(--gold)" }}>Accountability Partner</span>
                <span className="pill" style={{ fontSize: "0.7rem", color: "var(--accent)" }}>Connected</span>
              </div>
              <strong style={{ fontSize: "1rem" }}>Designated Partner</strong>
              <p className="muted" style={{ fontSize: "0.82rem", margin: 0 }}>
                Can see your habit streaks, and only the notes you specifically set to share with your partner.
              </p>
            </div>

            <div
              className="card stack-sm"
              style={{
                padding: 18,
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="space-between">
                <span className="eyebrow" style={{ color: "var(--gold)" }}>Small Group Leader</span>
                <span className="pill" style={{ fontSize: "0.7rem", color: "var(--accent)" }}>Support</span>
              </div>
              <strong style={{ fontSize: "1rem" }}>{currentUser?.groupName || "Group Leader"}</strong>
              <p className="muted" style={{ fontSize: "0.82rem", margin: 0 }}>
                Can see meeting attendance and general progress. Leaders cannot view your private notes unless you choose to share them, and any access is recorded.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Sharing Preferences */}
        <div className="section-flat stack" style={{ gap: 16 }}>
          <div className="space-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
            <div className="row" style={{ gap: 8 }}>
              <RotateCcw size={18} style={{ color: "var(--gold)" }} />
              <h2 className="heading-md" style={{ margin: 0, fontSize: "1.15rem" }}>
                Sharing preferences
              </h2>
            </div>
          </div>

          <p className="muted" style={{ fontSize: "0.88rem", margin: 0 }}>
            You can turn these permissions on or off at any time. Turning off sharing will never affect your access to reading plans or group materials.
          </p>

          <div className="stack-sm" style={{ gap: 12 }}>
            {[
              {
                code: "LEADER_OVERVIEW",
                label: "Share habit check-ins with your group leader",
                desc: "Allows your leader to see prayer and Bible reading days to help support you.",
              },
              {
                code: "PARTNER_SHARING",
                label: "Share progress with your accountability partner",
                desc: "Lets your partner view your weekly habit confirmations so you can encourage each other.",
              },
              {
                code: "EMAIL_REMINDERS",
                label: "Weekly check-in reminders",
                desc: "Receive email reminders before your group's weekly meeting.",
              },
            ].map((item) => {
              const isGranted = consents[item.code] ?? true;
              const isBusy = updatingConsent === item.code;
              return (
                <div
                  key={item.code}
                  className="space-between"
                  style={{
                    padding: "16px 20px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    alignItems: "center",
                  }}
                >
                  <div style={{ maxWidth: "80%" }}>
                    <strong style={{ fontSize: "0.95rem" }}>{item.label}</strong>
                    <p className="muted" style={{ fontSize: "0.82rem", margin: "4px 0 0" }}>
                      {item.desc}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => handleToggleConsent(item.code)}
                    className={isGranted ? "button" : "button-secondary"}
                    style={{
                      minWidth: 84,
                      background: isGranted ? "var(--accent)" : undefined,
                      borderColor: isGranted ? "var(--accent)" : undefined,
                      color: isGranted ? "#fff" : undefined,
                    }}
                  >
                    {isBusy ? "Saving..." : isGranted ? "On" : "Off"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Download or Delete Data */}
        <div className="section-flat stack" style={{ gap: 16 }}>
          <div className="space-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
            <div className="row" style={{ gap: 8 }}>
              <UserCheck size={18} style={{ color: "var(--gold)" }} />
              <h2 className="heading-md" style={{ margin: 0, fontSize: "1.15rem" }}>
                Download or delete your data
              </h2>
            </div>
          </div>

          <div className="grid-2" style={{ gap: 16 }}>
            {/* Download Data Archive */}
            <div
              className="card stack-sm"
              style={{
                padding: 20,
                border: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <div className="row" style={{ gap: 10 }}>
                <Download size={20} style={{ color: "var(--gold)" }} />
                <strong style={{ fontSize: "1rem" }}>Download your data</strong>
              </div>
              <p className="muted" style={{ fontSize: "0.84rem", margin: "6px 0 16px" }}>
                Get a complete export of your profile details, check-in history, reading logs, and attendance records.
              </p>
              <button
                type="button"
                onClick={handleDownloadArchive}
                className="button-secondary"
                style={{ width: "100%", gap: 8 }}
              >
                <Download size={16} /> Download Data (JSON)
              </button>
            </div>

            {/* Clear Notes & Account Deletion */}
            <div
              className="card stack-sm"
              style={{
                padding: 20,
                border: "1px solid rgba(197, 48, 48, 0.3)",
                background: "rgba(197, 48, 48, 0.02)",
              }}
            >
              <div className="row" style={{ gap: 10 }}>
                <Trash2 size={20} style={{ color: "#c53030" }} />
                <strong style={{ fontSize: "1rem", color: "#c53030" }}>Delete data or account</strong>
              </div>
              <p className="muted" style={{ fontSize: "0.84rem", margin: "6px 0 16px" }}>
                You can clear your private reflection notes while keeping your habit streaks, or permanently delete your account.
              </p>

              <div className="row" style={{ gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setShowPurgeConfirm(true)}
                  className="pill"
                  style={{
                    flex: 1,
                    borderColor: "rgba(197, 48, 48, 0.4)",
                    color: "#c53030",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    padding: "8px 10px",
                  }}
                >
                  Clear Private Notes
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="pill"
                  style={{
                    flex: 1,
                    background: "rgba(197, 48, 48, 0.1)",
                    borderColor: "#c53030",
                    color: "#c53030",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    padding: "8px 10px",
                  }}
                >
                  Delete Account
                </button>
              </div>

              {purgeStatus && (
                <p style={{ fontSize: "0.8rem", color: "var(--accent)", margin: "8px 0 0" }}>
                  {purgeStatus}
                </p>
              )}
              {deleteStatus && (
                <p style={{ fontSize: "0.8rem", color: "#c53030", margin: "8px 0 0" }}>
                  {deleteStatus}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Modal: Confirm Clear Notes */}
        {showPurgeConfirm && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              display: "grid",
              placeItems: "center",
              zIndex: 1000,
              padding: 20,
            }}
          >
            <div className="card stack" style={{ maxWidth: 460, padding: 28, background: "var(--surface)" }}>
              <div className="row" style={{ gap: 10, color: "var(--gold)" }}>
                <AlertTriangle size={24} />
                <h3 className="heading-md" style={{ margin: 0 }}>Clear all private reflection notes?</h3>
              </div>
              <p className="muted" style={{ fontSize: "0.88rem", lineHeight: 1.5 }}>
                This will permanently delete all personal struggle notes and reflection text from your weekly check-ins. Your prayer and Bible reading streaks will remain saved.
              </p>
              <div className="row" style={{ gap: 12, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => setShowPurgeConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="button"
                  style={{ background: "#c53030", borderColor: "#c53030", color: "#fff" }}
                  onClick={handlePurgeConfessions}
                >
                  Clear Notes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Confirm Account Delete */}
        {showDeleteConfirm && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              display: "grid",
              placeItems: "center",
              zIndex: 1000,
              padding: 20,
            }}
          >
            <div className="card stack" style={{ maxWidth: 460, padding: 28, background: "var(--surface)" }}>
              <div className="row" style={{ gap: 10, color: "#c53030" }}>
                <Trash2 size={24} />
                <h3 className="heading-md" style={{ margin: 0, color: "#c53030" }}>Permanently delete your account?</h3>
              </div>
              <p className="muted" style={{ fontSize: "0.88rem", lineHeight: 1.5 }}>
                This will permanently remove your profile, check-in history, group memberships, and all your personal data. This cannot be undone.
              </p>
              <div className="row" style={{ gap: 12, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="button"
                  style={{ background: "#c53030", borderColor: "#c53030", color: "#fff" }}
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
