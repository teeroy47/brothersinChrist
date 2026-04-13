import type { Role, SessionUser } from "@/lib/types";

export const SESSION_STORAGE_KEY = "bic-session";

export function getSessionFromStorageValue(value: string | null): SessionUser | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as SessionUser;
  } catch {
    return null;
  }
}

export function getStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  return getSessionFromStorageValue(window.localStorage.getItem(SESSION_STORAGE_KEY));
}

export function storeSession(session: SessionUser) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function isLeaderRole(role: Role) {
  return role === "group_leader" || role === "level_leader" || role === "admin";
}

export function isAdminRole(role: Role) {
  return role === "admin";
}
