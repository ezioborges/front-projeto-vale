"use client";

import * as React from "react";
import { getCurrentUser } from "@/services/userService";
import type { User } from "@/types/user";
import {
  clearStoredSession,
  persistSession,
  readStoredSession,
  updateStoredUser,
} from "@/utils/session";

export type AuthContextValue = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  setSession: (token: string, refreshToken: string, user: User) => void;
  updateUser: (user: User) => void;
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
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    let isActive = true;
    const session = readStoredSession();

    if (!session) {
      Promise.resolve().then(() => {
        if (isActive) {
          setIsReady(true);
        }
      });

      return () => {
        isActive = false;
      };
    }

    Promise.resolve().then(() => {
      if (!isActive) {
        return;
      }

      setToken(session.access);
      setRefreshToken(session.refresh);
      setUser(session.user);
    });

    getCurrentUser()
      .then((freshUser) => {
        if (!isActive) {
          return;
        }

        setUser(freshUser);
        updateStoredUser(freshUser);
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        clearStoredSession();
        setToken(null);
        setRefreshToken(null);
        setUser(null);
      })
      .finally(() => {
        if (isActive) {
          setIsReady(true);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const setSession = React.useCallback((
    nextToken: string,
    nextRefreshToken: string,
    nextUser: User,
  ) => {
    setToken(nextToken);
    setRefreshToken(nextRefreshToken);
    setUser(nextUser);
    persistSession(nextToken, nextRefreshToken, nextUser);
  }, []);

  const updateUser = React.useCallback((nextUser: User) => {
    setUser(nextUser);
    updateStoredUser(nextUser);
  }, []);

  const clearSession = React.useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    clearStoredSession();
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      token,
      refreshToken,
      isAuthenticated: Boolean(token && user),
      isReady,
      setSession,
      updateUser,
      clearSession,
    }),
    [user, token, refreshToken, isReady, setSession, updateUser, clearSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
