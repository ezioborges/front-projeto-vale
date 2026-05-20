"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { getUserDisplayName, requiresCompletedProfile } from "@/utils/auth";

type DashboardShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  children?: React.ReactNode;
};

export default function DashboardShell({
  title,
  eyebrow,
  description,
  children,
}: DashboardShellProps) {
  const { user, clearSession } = useAuth();
  const profilePending = requiresCompletedProfile(user);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8">
        <header className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-600">
                {eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                {description}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Sessao ativa para{" "}
                <span className="font-semibold text-slate-900">
                  {getUserDisplayName(user)}
                </span>
              </div>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
                onClick={clearSession}
              >
                Sair
              </Link>
            </div>
          </div>
        </header>

        {profilePending && (
          <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Seu perfil ainda nao esta completo
                </h2>
                <p className="mt-2 text-sm text-slate-700">
                  Complete os dados obrigatorios para liberar candidaturas e
                  etapas mais avancadas da area do candidato.
                </p>
              </div>
              <Link
                href="/perfil"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
              >
                Completar perfil
              </Link>
            </div>
          </section>
        )}

        {children}
      </div>
    </main>
  );
}
