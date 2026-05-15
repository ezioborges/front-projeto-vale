import DashboardShell from "@/components/dashboard/DashboardShell";

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      eyebrow="Gestao"
      title="Visao administrativa da plataforma"
      description="Monitore usuarios, niveis de acesso e indicadores operacionais da plataforma em um unico lugar."
    >
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
          <h2 className="text-xl font-bold text-slate-900">
            Controles principais
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Acompanhe moderacao, usuarios ativos e configuracoes criticas sem
            misturar contexto com a jornada de candidatos e contratantes.
          </p>
        </article>
        <article className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
          <h2 className="text-xl font-bold text-slate-900">
            Indicadores operacionais
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            O redirecionamento por role agora separa claramente as areas para
            evitar colisao de permissao e reduzir erro de navegacao.
          </p>
        </article>
      </section>
    </DashboardShell>
  );
}
