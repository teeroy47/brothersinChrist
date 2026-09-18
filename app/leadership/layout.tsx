"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShieldAlert,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { useAuthStore } from "@/src/stores/auth-store";

export default function LeadershipLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isHydrated, initSession, isLeader, signOut } = useAuthStore();

  React.useEffect(() => {
    initSession();
  }, [initSession]);

  React.useEffect(() => {
    if (isHydrated) {
      if (!currentUser) {
        router.push(`/signin?next=${encodeURIComponent(pathname)}`);
      } else if (!isLeader()) {
        router.push("/portal/dashboard");
      }
    }
  }, [isHydrated, currentUser, isLeader, pathname, router]);

  if (!isHydrated || !currentUser) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background)" }}>
        <div className="card" style={{ padding: "28px 36px", textAlign: "center", maxWidth: 360 }}>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>Brothers In Christ</span>
          <p className="muted" style={{ margin: "8px 0 0", fontSize: "0.9rem" }}>Verifying leadership access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="nav-shell">
      {/* Sidebar for Leaders */}
      <aside className="sidebar">
        <BrandMark compact />

        <nav className="sidebar-nav" aria-label="Leadership navigation">
          <span className="eyebrow" style={{ padding: "0 14px 6px", display: "block" }}>
            Oversight
          </span>
          <Link
            href="/leadership/overview"
            className="nav-link"
            data-active={pathname === "/leadership/overview" || undefined}
          >
            <span className="nav-link-icon" aria-hidden="true">
              <ShieldAlert size={18} strokeWidth={2.4} />
            </span>
            <span className="nav-link-label">Overview & Alerts</span>
          </Link>

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
            <Link
              href="/portal/dashboard"
              className="nav-link"
            >
              <span className="nav-link-icon" aria-hidden="true">
                <ArrowLeft size={18} strokeWidth={2} />
              </span>
              <span className="nav-link-label">Member Portal</span>
            </Link>
          </div>
        </nav>

        {/* Real Authenticated Account */}
        <div className="sidebar-account">
          <div className="sidebar-account-info">
            <strong className="sidebar-account-name">{currentUser.name}</strong>
            <span className="sidebar-account-role">{currentUser.role.replace("_", " ")}</span>
          </div>
          <button
            type="button"
            className="sidebar-account-signout"
            onClick={() => {
              signOut();
              router.push("/signin");
            }}
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut size={14} strokeWidth={2.2} aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="app-main">
        <div className="container">
          <header className="topbar">
            <div className="space-between" style={{ alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>Leadership Console</span>
                  <span className="muted" style={{ fontSize: "0.8rem" }}>·</span>
                  <span className="muted" style={{ fontSize: "0.8rem" }}>{currentUser.role.replace("_", " ")}</span>
                </div>
                <h1 className="heading-lg" style={{ margin: 0 }}>Brotherhood Oversight</h1>
                <p className="muted topbar-subtitle">
                  Pastoral care, small group health, and brother follow-up tracking.
                </p>
              </div>

              <div className="row" style={{ gap: 8 }}>
                <Link href="/portal/dashboard" className="pill">
                  Member View
                </Link>
              </div>
            </div>
          </header>

          {children}
        </div>
      </div>
    </div>
  );
}
