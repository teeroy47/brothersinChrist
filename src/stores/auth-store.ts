import { create } from "zustand";

export type Role = "MEMBER" | "GROUP_LEADER" | "LEVEL_LEADER" | "ADMIN";

export interface UserSession {
  id: string;
  email: string;
  name: string;
  firstName: string;
  role: Role;
  levelNumber: number;
  levelTitle: string;
  groupName: string;
  church: string;
  consistencyScore: number;
  avatarUrl?: string;
}

interface AuthState {
  currentUser: UserSession | null;
  isHydrated: boolean;
  initSession: () => Promise<void>;
  setCurrentUser: (user: UserSession | null) => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: UserSession }>;
  signUp: (formData: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    city?: string;
    church?: string;
  }) => Promise<{ success: boolean; error?: string; user?: UserSession }>;
  signOut: () => Promise<void>;
  isLeader: () => boolean;
  isAdmin: () => boolean;
}

/**
 * Zustand Auth Store conforming to ASVS v5.0.0-7.1.1 and W3C §2.3.
 * ZERO PII and auth tokens in localStorage to protect against client-side XSS session hijacking.
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  isHydrated: false,

  initSession: async () => {
    // Purge any legacy session tokens from localStorage (SEC-04 remediation)
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem("bic_user_session");
      } catch {
        // Ignore in restricted environments
      }
    }

    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        set({ currentUser: data.user, isHydrated: true });
        return;
      }
    } catch {
      // Network/offline fallback
    }

    set({ currentUser: null, isHydrated: true });
  },

  setCurrentUser: (user) => {
    set({ currentUser: user, isHydrated: true });
  },

  signIn: async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Sign in failed" };
      }

      set({ currentUser: data.user, isHydrated: true });
      return { success: true, user: data.user };
    } catch {
      return { success: false, error: "Network error during sign-in." };
    }
  },

  signUp: async (formData) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }

      set({ currentUser: data.user, isHydrated: true });
      return { success: true, user: data.user };
    } catch {
      return { success: false, error: "Network error during registration." };
    }
  },

  signOut: async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } catch {
      // Ignore network errors on signout
    }

    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem("bic_user_session");
      } catch {
        // Ignore
      }
    }

    set({ currentUser: null, isHydrated: true });
  },

  isLeader: () => {
    const role = get().currentUser?.role;
    return role === "GROUP_LEADER" || role === "LEVEL_LEADER" || role === "ADMIN";
  },

  isAdmin: () => get().currentUser?.role === "ADMIN",
}));
