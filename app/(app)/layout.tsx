import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { requireSession } from "@/lib/auth";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const session = await requireSession();

  return (
    <AppShell session={session} title="Brotherhood Dashboard" subtitle="Stay grounded in prayer, accountable in community, and clear on this week's next step.">
      {children}
    </AppShell>
  );
}
