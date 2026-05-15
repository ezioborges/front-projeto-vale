import DashboardShell from "@/components/dashboard/DashboardShell";

export default function EmployerDashboardPage() {
  return (
    <DashboardShell
      eyebrow="Area do Contratante"
      title="Painel de contratacao"
      description="Gerencie vagas, acompanhe candidaturas e mantenha o funil de recrutamento centralizado."
    >
      <section className="grid gap-6 md:grid-cols-3">
        <article className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
          <p className="text-sm font-semibold text-slate-500">Vagas abertas</p>
          <strong className="mt-4 block text-4xl font-bold text-slate-900">
            08
          </strong>
        </article>
        <article className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
          <p className="text-sm font-semibold text-slate-500">
            Candidaturas novas
          </p>
          <strong className="mt-4 block text-4xl font-bold text-slate-900">
            24
          </strong>
        </article>
        <article className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
          <p className="text-sm font-semibold text-slate-500">Triagens hoje</p>
          <strong className="mt-4 block text-4xl font-bold text-slate-900">
            05
          </strong>
        </article>
      </section>
    </DashboardShell>
  );
}
