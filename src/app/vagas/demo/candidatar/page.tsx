export default function DemoApplyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-600">
          Candidatura liberada
        </p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Fluxo protegido por perfil completo
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Se o candidato chegou ate aqui, o middleware confirmou que a role e
          `employee` com perfil completo antes de liberar a rota de candidatura.
        </p>
      </div>
    </main>
  );
}
