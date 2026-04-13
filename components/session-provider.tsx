"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { clearStoredSession, getStoredSession, storeSession } from "@/lib/auth";
import { getSessionOptions } from "@/lib/mock-data";
import type { SessionUser } from "@/lib/types";

interface SessionContextValue {
  hydrated: boolean;
  session: SessionUser | null;
  signIn: (userId: string) => void;
  signUp: (fullName: string) => void;
  signOut: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSession(getStoredSession());
    setHydrated(true);
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      hydrated,
      session,
      signIn: (userId) => {
        const matched = getSessionOptions().find((option) => option.id === userId);
        if (!matched) {
          return;
        }

        const nextSession = {
          id: matched.id,
          name: matched.name,
          role: matched.role
        } satisfies SessionUser;

        storeSession(nextSession);
        setSession(nextSession);
      },
      signUp: (fullName) => {
        const nextSession = {
          id: "u-1",
          name: fullName,
          role: "member"
        } satisfies SessionUser;

        storeSession(nextSession);
        setSession(nextSession);
      },
      signOut: () => {
        clearStoredSession();
        setSession(null);
      }
    }),
    [hydrated, session]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useDemoSession() {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error("useDemoSession must be used within SessionProvider");
  }

  return value;
}
