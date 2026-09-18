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
  initSession: () => void;
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
  signOut: () => void;
  isLeader: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  isHydrated: false,

  initSession: () => {
    if (typeof window !== "undefined") {
      try {
        const stored = window.localStorage.getItem("bic_user_session");
        if (stored) {
          set({ currentUser: JSON.parse(stored), isHydrated: true });
          return;
        }
      } catch (e) {
        console.error("Failed to parse stored session", e);
      }
      set({ currentUser: null, isHydrated: true });
    }
  },

  setCurrentUser: (user) => {
    set({ currentUser: user, isHydrated: true });
    if (typeof window !== "undefined") {
      if (user) {
        window.localStorage.setItem("bic_user_session", JSON.stringify(user));
      } else {
        window.localStorage.removeItem("bic_user_session");
      }
    }
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
      if (typeof window !== "undefined") {
        window.localStorage.setItem("bic_user_session", JSON.stringify(data.user));
      }

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
      if (typeof window !== "undefined") {
        window.localStorage.setItem("bic_user_session", JSON.stringify(data.user));
      }

      return { success: true, user: data.user };
    } catch {
      return { success: false, error: "Network error during registration." };
    }
  },

  signOut: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("bic_user_session");
    }
    set({ currentUser: null, isHydrated: true });
  },

  isLeader: () => {
    const role = get().currentUser?.role;
    return role === "GROUP_LEADER" || role === "LEVEL_LEADER" || role === "ADMIN";
  },

  isAdmin: () => get().currentUser?.role === "ADMIN",
}));

