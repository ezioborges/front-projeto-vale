import Link from "next/link";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function EmployeeDashboardPage() {
  return (
    <DashboardShell
      eyebrow="Area do Candidato"
      title="Sua jornada profissional comeca aqui"
      description="Acompanhe seu progresso, finalize seu perfil e avance para vagas que combinam com seu momento profissional."
    >
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
        <article className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-purple-600">
                Vaga em destaque
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Desenvolvedor Front-end Pleno
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Empresa remota com foco em produto digital, acessibilidade e
                colaboracao entre design e engenharia.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Remoto
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-purple-50 px-3 py-1.5 text-purple-700">
              React
            </span>
            <span className="rounded-full bg-orange-50 px-3 py-1.5 text-orange-700">
              TypeScript
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
              UX colaborativo
            </span>
          </div>

          <div className="mt-8">
            <Link
              href="/vagas/demo/candidatar"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
            >
              Tentar candidatura protegida
            </Link>
          </div>
        </article>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            O que acontece agora
          </p>
          <ul className="mt-4 space-y-4 text-sm text-slate-700">
            <li className="rounded-2xl bg-white p-4 shadow-sm">
              Complete seu perfil com experiencia, formacao e curriculo.
            </li>
            <li className="rounded-2xl bg-white p-4 shadow-sm">
              Libere candidaturas e acompanhe o status das vagas.
            </li>
            <li className="rounded-2xl bg-white p-4 shadow-sm">
              Deixe seu perfil mais forte com links e bio objetiva.
            </li>
          </ul>
        </aside>
      </section>
    </DashboardShell>
  );
}
