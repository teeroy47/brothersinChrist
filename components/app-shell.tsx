"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { BrandMark } from "@/components/brand-mark";
import { useDemoSession } from "@/components/session-provider";
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
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useDemoSession();

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
            <Link
              key={item.href}
              href={item.href}
              className="pill"
              aria-current={pathname === item.href ? "page" : undefined}
              style={pathname === item.href ? { borderColor: "#000", fontWeight: 700 } : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="button-secondary"
          style={{ width: "100%" }}
          onClick={() => {
            signOut();
            router.push("/");
          }}
        >
          Sign out
        </button>
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
          <Link key={item.href} href={item.href} data-active={pathname === item.href}>
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
