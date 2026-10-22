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
  MoreHorizontal,
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
  { href: "/portal/levels",    label: "Levels",    icon: Layers },
  { href: "/portal/circle",    label: "My Circle", icon: UsersRound },
  { href: "/portal/check-in",  label: "Check-in",  icon: ClipboardCheck },
  { href: "/portal/devotions", label: "Devotions", icon: BookOpenCheck },
  { href: "/portal/attendance",label: "Attendance",icon: CalendarCheck },
  { href: "/portal/profile",   label: "Profile",   icon: User },
  { href: "/portal/settings/privacy", label: "Privacy & Sharing", icon: ShieldCheck },
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
      {/* Sidebar (desktop)                                                   */}
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

          {/* Oversight / Leadership Link — leaders and admins only */}
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

        {/* Account block */}
        <div className="sidebar-account">
          <div className="sidebar-account-info">
            <strong className="sidebar-account-name">{currentUser.name}</strong>
            <span className="sidebar-account-role">{currentUser.levelTitle}</span>
          </div>
          <button
            type="button"
            className="sidebar-account-signout"
            onClick={() => { signOut(); router.push("/signin"); }}
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut size={14} strokeWidth={2.2} aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* Main content                                                        */}
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
      {/* Mobile bottom nav — 4 primary tabs + "More" sheet                  */}
      {/* ------------------------------------------------------------------ */}
      <MobileNav
        pathname={pathname}
        isLeader={isLeader()}
        userName={currentUser.name}
        onSignOut={() => { signOut(); router.push("/signin"); }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// MobileNav component
// ---------------------------------------------------------------------------
const PRIMARY_MOBILE_NAV = [
  { href: "/portal/dashboard", label: "Dashboard", icon: Home           },
  { href: "/portal/levels",    label: "Levels",    icon: Layers         },
  { href: "/portal/circle",    label: "Circle",    icon: UsersRound     },
  { href: "/portal/check-in",  label: "Check-in",  icon: ClipboardCheck },
];

const SHEET_NAV = [
  { href: "/portal/devotions",  label: "Devotions",  icon: BookOpenCheck },
  { href: "/portal/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/portal/profile",    label: "Profile",    icon: User          },
  { href: "/portal/settings/privacy", label: "Privacy & Sharing", icon: ShieldCheck },
];

function MobileNav({
  pathname,
  isLeader,
  userName,
  onSignOut,
}: {
  pathname: string;
  isLeader: boolean;
  userName: string;
  onSignOut: () => void;
}) {
  const [sheetOpen, setSheetOpen] = React.useState(false);

  // Close sheet whenever the route changes
  React.useEffect(() => { setSheetOpen(false); }, [pathname]);

  const moreActive =
    pathname.startsWith("/portal/devotions") ||
    pathname.startsWith("/portal/attendance") ||
    pathname.startsWith("/portal/profile") ||
    pathname.startsWith("/portal/settings") ||
    pathname.startsWith("/leadership");

  return (
    <>
      {/* Bottom tab bar */}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {PRIMARY_MOBILE_NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
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

        {/* "More" tab */}
        <button
          type="button"
          className="mobile-nav-link"
          data-active={moreActive || sheetOpen || undefined}
          aria-expanded={sheetOpen}
          aria-haspopup="dialog"
          onClick={() => setSheetOpen((o) => !o)}
          style={{ background: "none", border: "none", cursor: "pointer", width: "100%", padding: 0 }}
        >
          <span className="mobile-nav-icon" aria-hidden="true">
            <MoreHorizontal size={18} strokeWidth={moreActive || sheetOpen ? 2.4 : 2} />
          </span>
          <span className="mobile-nav-label">More</span>
        </button>
      </nav>

      {/* Backdrop */}
      {sheetOpen && (
        <div
          aria-hidden="true"
          onClick={() => setSheetOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(10, 16, 26, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 998,
          }}
        />
      )}

      {/* Slide-up sheet */}
      <div
        role="dialog"
        aria-label="More options"
        aria-modal="true"
        style={{
          position: "fixed",
          left: 0, right: 0, bottom: 0,
          zIndex: 999,
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderRadius: "20px 20px 0 0",
          padding: "8px 16px 48px",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.25)",
          transform: sheetOpen ? "translateY(0)" : "translateY(110%)",
          transition: "transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)",
          willChange: "transform",
        }}
      >
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 16px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "var(--border)" }} />
        </div>

        {/* Signed-in identity */}
        <div style={{ padding: "0 4px 14px", borderBottom: "1px solid var(--border)", marginBottom: 6 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.95rem" }}>{userName}</p>
          <p className="muted" style={{ margin: "2px 0 0", fontSize: "0.78rem" }}>Signed in</p>
        </div>

        {/* Secondary nav links */}
        {SHEET_NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "13px 8px",
                borderBottom: "1px solid var(--border)",
                color: active ? "var(--gold)" : "var(--foreground)",
                fontWeight: active ? 700 : 500,
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              <Icon size={20} strokeWidth={active ? 2.4 : 2} />
              {item.label}
            </Link>
          );
        })}

        {/* Leader Portal — visible only to leaders & admins */}
        {isLeader && (
          <Link
            href="/leadership/overview"
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "13px 8px",
              borderBottom: "1px solid var(--border)",
              color: pathname.startsWith("/leadership") ? "var(--gold)" : "var(--foreground)",
              fontWeight: pathname.startsWith("/leadership") ? 700 : 500,
              fontSize: "0.95rem",
              textDecoration: "none",
            }}
          >
            <ShieldCheck size={20} strokeWidth={2} />
            Leader Portal
          </Link>
        )}

        {/* Sign Out */}
        <button
          type="button"
          onClick={onSignOut}
          style={{
            display: "flex", alignItems: "center", gap: 14,
            width: "100%", padding: "13px 8px",
            background: "none", border: "none", cursor: "pointer",
            color: "#c53030",
            fontWeight: 600,
            fontSize: "0.95rem",
            textAlign: "left",
            marginTop: 4,
          }}
        >
          <LogOut size={20} strokeWidth={2} />
          Sign Out
        </button>
      </div>
    </>
  );
}
