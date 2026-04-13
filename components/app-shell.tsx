import type { ReactNode } from "react";
import Link from "next/link";

import { signOutAction } from "@/components/auth-actions";
import { BrandMark } from "@/components/brand-mark";
import { getMainNavigation } from "@/lib/navigation";
import type { Role, SessionUser } from "@/lib/types";

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

  return (
    <div className="nav-shell">
      <aside className="sidebar">
        <BrandMark compact />
        <div className="card card-dark stack-sm">
          <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>Signed in as</span>
          <strong>{session.name}</strong>
          <span style={{ color: "rgba(255,255,255,.7)", textTransform: "capitalize" }}>{formatRoleLabel(session.role)}</span>
        </div>
        <nav className="stack-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="pill">
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={signOutAction}>
          <button type="submit" className="button-secondary" style={{ width: "100%" }}>
            Sign out
          </button>
        </form>
      </aside>

      <div className="app-main">
        <div className="container">
          <header className="topbar stack-sm">
            <span className="eyebrow">Brothers In Christ</span>
            <div className="space-between">
              <div className="stack-sm" style={{ gap: 6 }}>
                <h1 className="heading-lg">{title}</h1>
                {subtitle ? <p className="muted" style={{ margin: 0 }}>{subtitle}</p> : null}
              </div>
              <span className="pill">{formatRoleLabel(session.role)}</span>
            </div>
          </header>
          {children}
        </div>
      </div>

      <nav className="mobile-nav">
        {nav.slice(0, 5).map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function formatRoleLabel(role: Role) {
  return role.replace("_", " ");
}
