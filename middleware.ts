import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const DASHBOARD_BY_ROLE = {
  employee: "/dashboard-employee",
  employer: "/dashboard-employer",
  admin: "/dashboard-admin",
} as const;

const PROFILE_REQUIRED_PREFIXES = ["/vagas", "/candidaturas"];

function resolveAuthenticatedRoute(
  role: keyof typeof DASHBOARD_BY_ROLE,
  profileCompleted: boolean,
) {
  if (role === "employee" && !profileCompleted) {
    return "/completar-perfil";
  }

  return DASHBOARD_BY_ROLE[role];
}

function isPrefixedPath(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated =
    request.cookies.get("vale_authenticated")?.value === "1";
  const role = request.cookies.get("vale_role")?.value as
    | keyof typeof DASHBOARD_BY_ROLE
    | undefined;
  const profileCompleted =
    request.cookies.get("vale_profile_completed")?.value === "1";

  if (pathname === "/dashboard") {
    if (!isAuthenticated || !role) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.redirect(
      new URL(resolveAuthenticatedRoute(role, profileCompleted), request.url),
    );
  }

  if (pathname === "/auth/login" && isAuthenticated && role) {
    return NextResponse.redirect(
      new URL(resolveAuthenticatedRoute(role, profileCompleted), request.url),
    );
  }

  const isProtectedRoute =
    isPrefixedPath(pathname, "/dashboard-employee") ||
    isPrefixedPath(pathname, "/dashboard-employer") ||
    isPrefixedPath(pathname, "/dashboard-admin") ||
    isPrefixedPath(pathname, "/completar-perfil") ||
    PROFILE_REQUIRED_PREFIXES.some((prefix) => isPrefixedPath(pathname, prefix));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (!isAuthenticated || !role) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const authenticatedHome = resolveAuthenticatedRoute(role, profileCompleted);

  if (isPrefixedPath(pathname, "/completar-perfil")) {
    if (role !== "employee") {
      return NextResponse.redirect(new URL(authenticatedHome, request.url));
    }

    return NextResponse.next();
  }

  if (
    (isPrefixedPath(pathname, "/dashboard-employee") && role !== "employee") ||
    (isPrefixedPath(pathname, "/dashboard-employer") && role !== "employer") ||
    (isPrefixedPath(pathname, "/dashboard-admin") && role !== "admin")
  ) {
    return NextResponse.redirect(new URL(authenticatedHome, request.url));
  }

  if (
    role === "employee" &&
    !profileCompleted &&
    PROFILE_REQUIRED_PREFIXES.some((prefix) => isPrefixedPath(pathname, prefix))
  ) {
    return NextResponse.redirect(new URL("/completar-perfil", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/login",
    "/dashboard",
    "/dashboard-employee/:path*",
    "/dashboard-employer/:path*",
    "/dashboard-admin/:path*",
    "/completar-perfil/:path*",
    "/vagas/:path*",
    "/candidaturas/:path*",
  ],
};
