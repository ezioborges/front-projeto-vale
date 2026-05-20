import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardRedirectPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("vale_role")?.value;
  const profileCompleted =
    cookieStore.get("vale_profile_completed")?.value === "1";

  if (role === "employee" && !profileCompleted) {
    redirect("/perfil");
  }

  if (role === "employee") {
    redirect("/dashboard-employee");
  }

  if (role === "employer") {
    redirect("/dashboard-employer");
  }

  if (role === "admin") {
    redirect("/dashboard-admin");
  }

  redirect("/auth/login");
}
