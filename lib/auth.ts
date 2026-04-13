import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { Role, SessionUser } from "@/lib/types";

const SESSION_COOKIE = "bic-session";

export function encodeSession(session: SessionUser) {
  return encodeURIComponent(JSON.stringify(session));
}

export function getSessionFromCookieValue(value?: string): SessionUser | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(value)) as SessionUser;
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  return getSessionFromCookieValue(store.get(SESSION_COOKIE)?.value);
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }

  return session;
}

export async function setSession(session: SessionUser) {
  const store = await cookies();
  store.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/"
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export function isLeaderRole(role: Role) {
  return role === "group_leader" || role === "level_leader" || role === "admin";
}

export function isAdminRole(role: Role) {
  return role === "admin";
}
