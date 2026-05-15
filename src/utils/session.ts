import type { User } from "@/types/user";

export const AUTH_STORAGE_KEY = "vale.auth.session";

type StoredSession = {
  access: string;
  refresh: string;
  user: User;
};

function setCookie(name: string, value: string, maxAge = 60 * 60 * 24 * 7) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
}

function clearCookie(name: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

function syncRouteCookies(user: User) {
  setCookie("vale_authenticated", "1");
  setCookie("vale_role", user.role);
  setCookie("vale_profile_completed", user.profile_completed ? "1" : "0");
}

export function readStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredSession;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function persistSession(access: string, refresh: string, user: User) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({ access, refresh, user } satisfies StoredSession),
  );
  syncRouteCookies(user);
}

export function updateStoredUser(user: User) {
  const current = readStoredSession();
  if (!current || typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      ...current,
      user,
    } satisfies StoredSession),
  );
  syncRouteCookies(user);
}

export function clearStoredSession() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  clearCookie("vale_authenticated");
  clearCookie("vale_role");
  clearCookie("vale_profile_completed");
}
