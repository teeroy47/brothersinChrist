"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Layers,
  UsersRound,
  MessageSquare,
  ShoppingBag,
  User,
  ShieldCheck,
  Settings,
  LogOut
} from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { useDemoSession } from "@/components/session-provider";
import { getMainNavigation } from "@/lib/navigation";
import type { Role, SessionUser } from "@/lib/types";

const navIcons: Record<string, LucideIcon> = {
  "/home": Home,
  "/levels": Layers,
  "/groups": UsersRound,
  "/community": MessageSquare,
  "/merch": ShoppingBag,
  "/profile": User,
  "/leader": ShieldCheck,
  "/admin": Settings
};

/**
 * @deprecated Per design.md §4.1, AppShell is deprecated in favor of PortalShell (`src/components/portal/PortalShell.tsx`).
 * PortalShell unifies desktop sidebar, mobile bottom dock, and cross-portal accent consistency.
 */
export function AppShell({
  session,
  children,
  title,
  subtitle
}: {
  session: SessionUser;
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  const nav = getMainNavigation(session.role);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useDemoSession();

  return (
    <div className="nav-shell">
      <aside className="sidebar">
        <BrandMark compact />

        {/* Nav is the primary content of the sidebar now */}
        <nav className="sidebar-nav" aria-label="Sidebar navigation">
          {nav.map((item) => {
            const Icon = navIcons[item.href] ?? Home;
            const active = pathname === item.href || (item.href !== "/home" && pathname?.startsWith(`${item.href}/`));

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
        </nav>

        {/* Identity + sign out live together at the bottom */}
        <div className="sidebar-account">
          <div className="sidebar-account-info">
            <strong className="sidebar-account-name">{session.name}</strong>
            <span className="sidebar-account-role">{formatRoleLabel(session.role)}</span>
          </div>
          <button
            type="button"
            className="sidebar-account-signout"
            onClick={() => {
              signOut();
              router.push("/");
            }}
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut size={14} strokeWidth={2.2} aria-hidden="true" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      <div className="app-main">
        <div className="container">
          <header className="topbar">
            <h1 className="heading-lg">{title}</h1>
            {subtitle ? <p className="muted topbar-subtitle">{subtitle}</p> : null}
          </header>
          {children}
        </div>
      </div>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {nav.slice(0, 5).map((item) => {
          const Icon = navIcons[item.href] ?? Home;
          const active = pathname === item.href || (item.href !== "/home" && pathname?.startsWith(`${item.href}/`));

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

function formatRoleLabel(role: Role) {
  return role.replace("_", " ");
}
