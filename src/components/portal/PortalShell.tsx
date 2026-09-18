"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Layers,
  UsersRound,
  ClipboardCheck,
  BookOpenCheck,
  CalendarCheck,
  User,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { useAuthStore } from "@/src/stores/auth-store";

interface PortalShellProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const navItems: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: "/portal/dashboard", label: "Dashboard", icon: Home },
  { href: "/portal/levels", label: "Levels", icon: Layers },
  { href: "/portal/circle", label: "My Circle", icon: UsersRound },
  { href: "/portal/check-in", label: "Check-in", icon: ClipboardCheck },
  { href: "/portal/devotions", label: "Devotions", icon: BookOpenCheck },
  { href: "/portal/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/portal/profile", label: "Profile", icon: User },
];

export function PortalShell({ children, title, subtitle }: PortalShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isHydrated, initSession, isLeader, signOut } = useAuthStore();

  React.useEffect(() => {
    initSession();
  }, [initSession]);

  React.useEffect(() => {
    if (isHydrated && !currentUser) {
      router.push(`/signin?next=${encodeURIComponent(pathname)}`);
    }
  }, [isHydrated, currentUser, pathname, router]);

  if (!isHydrated || !currentUser) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background)" }}>
        <div className="card" style={{ padding: "28px 36px", textAlign: "center", maxWidth: 360 }}>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>Brothers In Christ</span>
          <p className="muted" style={{ margin: "8px 0 0", fontSize: "0.9rem" }}>Loading portal session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="nav-shell">
      {/* ------------------------------------------------------------------ */}
      {/* Sidebar                                                            */}
      {/* ------------------------------------------------------------------ */}
      <aside className="sidebar">
        <BrandMark compact />

        <nav className="sidebar-nav" aria-label="Sidebar navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={active ? "page" : undefined}
                data-active={active || undefined}
              >
                <span className="nav-link-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={active ? 2.4 : 2} />
                </span>
                <span className="nav-link-label">{item.label}</span>
              </Link>
            );
          })}

          {/* Oversight / Leadership Link */}
          {isLeader() && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
              <span className="eyebrow" style={{ padding: "0 14px 8px", display: "block", fontSize: "0.7rem" }}>
                Oversight
              </span>
              <Link
                href="/leadership/overview"
                className="nav-link"
                data-active={pathname.startsWith("/leadership") || undefined}
              >
                <span className="nav-link-icon" aria-hidden="true">
                  <ShieldCheck size={18} strokeWidth={2} />
                </span>
                <span className="nav-link-label">Leader Portal</span>
              </Link>
            </div>
          )}
        </nav>

        {/* Real Authenticated Account Block */}
        <div className="sidebar-account">
          <div className="sidebar-account-info">
            <strong className="sidebar-account-name">{currentUser.name}</strong>
            <span className="sidebar-account-role">{currentUser.levelTitle}</span>
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

      {/* ------------------------------------------------------------------ */}
      {/* Main Content Area with Landing Page Theme                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="app-main">
        <div className="container">
          <header className="topbar">
            <div className="space-between" style={{ alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>Member Portal</span>
                  <span className="muted" style={{ fontSize: "0.8rem" }}>·</span>
                  <span className="muted" style={{ fontSize: "0.8rem" }}>{currentUser.groupName}</span>
                </div>
                <h1 className="heading-lg" style={{ margin: 0 }}>{title}</h1>
                {subtitle && <p className="muted topbar-subtitle">{subtitle}</p>}
              </div>

              <div className="row" style={{ gap: 8 }}>
                <span className="pill">{currentUser.levelTitle}</span>
                <span className="pill">{currentUser.consistencyScore}% consistency</span>
              </div>
            </div>
          </header>

          {children}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile Bottom Navigation Bar                                       */}
      {/* ------------------------------------------------------------------ */}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              aria-current={active ? "page" : undefined}
              data-active={active || undefined}
            >
              <span className="mobile-nav-icon" aria-hidden="true">
                <Icon size={18} strokeWidth={active ? 2.4 : 2} />
              </span>
              <span className="mobile-nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
