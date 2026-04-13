"use client";

import type { ReactNode } from "react";

import { AuthGate } from "@/components/auth-gate";
import { AppShell } from "@/components/app-shell";
import { useDemoSession } from "@/components/session-provider";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { session } = useDemoSession();

  if (!session) {
    return <AuthGate>{children}</AuthGate>;
  }

  return (
    <AuthGate>
      <AppShell session={session} title="Brotherhood Dashboard" subtitle="Stay grounded in prayer, accountable in community, and clear on this week's next step.">
        {children}
      </AppShell>
    </AuthGate>
  );
}
