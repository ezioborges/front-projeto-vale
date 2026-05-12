"use client";

import * as React from "react";
import type { User } from "@/types/user";

export type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
};

export const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined,
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  const setSession = React.useCallback((nextToken: string, nextUser: User) => {
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const clearSession = React.useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      setSession,
      clearSession,
    }),
    [user, token, setSession, clearSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
