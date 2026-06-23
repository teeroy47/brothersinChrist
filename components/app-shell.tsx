"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { BrandMark } from "@/components/brand-mark";
import StaggeredMenu from "@/components/staggered-menu";
import { useDemoSession } from "@/components/session-provider";
import { getMainNavigation } from "@/lib/navigation";
import type { Role, SessionUser } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const staggerMenuItems = nav.map(item => ({
    label: item.label,
    link: item.href
  }));

  staggerMenuItems.push({ label: 'Sign Out', link: '/' }); // We handle signout via click on mobile using onMenuClose if needed, or just link. Let's not hook it to the generic link perfectly, wait.

  return (
    <div className="nav-shell">
      <div className="app-main">
        <div className="container">
          <header className="topbar space-between" style={{ paddingBottom: 24, marginBottom: 24, borderBottom: "1px solid var(--border)", alignItems: "center" }}>
            <div className="row" style={{ gap: 16 }}>
              <div>
                <StaggeredMenu
                  position="left"
                  items={staggerMenuItems}
                  displayItemNumbering={true}
                  menuButtonColor="var(--foreground)"
                  openMenuButtonColor="#fff"
                  changeMenuColorOnOpen={true}
                  colors={['#111827', '#0a0e17']}
                  accentColor="var(--gold)"
                />
              </div>
              <div className="stack-sm" style={{ gap: 2 }}>
                <h1 className="heading-md" style={{ margin: 0, textTransform: "uppercase" }}>
                  {nav.find(item => item.href === pathname)?.label || title}
                </h1>
              </div>
            </div>
            <div className="row">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button" className="pill" style={{ cursor: "pointer", background: "transparent", color: "var(--foreground)" }}>
                    {session.name}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent style={{ minWidth: 200 }} align="end">
                  <div className="stack-sm" style={{ padding: "8px 12px" }}>
                    <strong style={{ fontSize: "0.9rem" }}>{session.name}</strong>
                    <span className="muted" style={{ fontSize: "0.8rem", textTransform: "capitalize" }}>{formatRoleLabel(session.role)}</span>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} style={{ color: "var(--destructive, red)" }}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}

function formatRoleLabel(role: Role) {
  return role.replace("_", " ");
}
