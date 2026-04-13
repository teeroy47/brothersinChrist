"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useDemoSession } from "@/components/session-provider";
import { isAdminRole, isLeaderRole } from "@/lib/auth";

export function AuthGate({ children }: { children: ReactNode }) {
  const { hydrated, session } = useDemoSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !session) {
      router.replace(`/signin?next=${encodeURIComponent(pathname ?? "/home")}`);
    }
  }, [hydrated, pathname, router, session]);

  if (!hydrated || !session) {
    return <GateState label="Loading brotherhood access..." />;
  }

  return <>{children}</>;
}

export function LeaderGate({ children }: { children: ReactNode }) {
  const { hydrated, session } = useDemoSession();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!session) {
      router.replace("/signin");
      return;
    }

    if (!isLeaderRole(session.role)) {
      router.replace("/home");
    }
  }, [hydrated, router, session]);

  if (!hydrated || !session || !isLeaderRole(session.role)) {
    return <GateState label="Checking leader access..." />;
  }

  return <>{children}</>;
}

export function AdminGate({ children }: { children: ReactNode }) {
  const { hydrated, session } = useDemoSession();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!session) {
      router.replace("/signin");
      return;
    }

    if (!isAdminRole(session.role)) {
      router.replace("/home");
    }
  }, [hydrated, router, session]);

  if (!hydrated || !session || !isAdminRole(session.role)) {
    return <GateState label="Checking admin access..." />;
  }

  return <>{children}</>;
}

function GateState({ label }: { label: string }) {
  return (
    <div className="container section">
      <div className="card stack-sm">
        <span className="eyebrow">Access</span>
        <strong>{label}</strong>
      </div>
    </div>
  );
}
