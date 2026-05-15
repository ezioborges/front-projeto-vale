import type { User, UserRole } from "@/types/user";

export const ROLE_DASHBOARD_MAP: Record<UserRole, string> = {
  employee: "/dashboard-employee",
  employer: "/dashboard-employer",
  admin: "/dashboard-admin",
};

export function resolveDashboardRoute(role: UserRole) {
  return ROLE_DASHBOARD_MAP[role];
}

export function resolvePostLoginRoute(user: User) {
  if (user.role === "employee" && !user.profile_completed) {
    return "/completar-perfil";
  }

  return resolveDashboardRoute(user.role);
}

export function getUserDisplayName(user: User | null) {
  if (!user) {
    return "";
  }

  return user.full_name || user.preferred_name || user.username;
}

export function requiresCompletedProfile(user: User | null) {
  return user?.role === "employee" && !user.profile_completed;
}
