import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Elementos de Fundo (Blobs Holograficos do Style Guide) */}
      <div className="absolute top-0 left-1/2 -ml-96 h-96 w-96 rounded-full bg-purple-500 opacity-20 blur-3xl mix-blend-multiply" />
      <div className="absolute bottom-0 right-1/2 -mr-96 h-96 w-96 rounded-full bg-pink-500 opacity-20 blur-3xl mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/2 -ml-24 -mt-24 h-64 w-64 rounded-full bg-orange-400 opacity-20 blur-3xl mix-blend-multiply" />

      {/* Card de Login Centralizado */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        {/* Cabecalho do Card */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-500 to-orange-400 text-2xl font-bold text-white shadow-lg">
              C
            </span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Acesse sua conta para continuar conectando talentos.
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              E-mail
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <i
                  className="fa-regular fa-envelope text-slate-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="seu@email.com"
                className="block w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Senha
              </label>
              <Link
                href="/recuperar-senha"
                className="text-sm font-semibold text-purple-600 hover:text-purple-500 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <i
                  className="fa-solid fa-lock text-slate-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="block w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-white"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full justify-center items-center gap-2 rounded-xl bg-slate-900 px-4 py-4 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Entrar na Plataforma
              <i
                className="fa-solid fa-arrow-right text-xs"
                aria-hidden="true"
              />
            </button>
          </div>
        </form>

        {/* Rodape do Card */}
        <div className="mt-8 text-center text-sm text-slate-600">
          Ainda nao tem uma conta?{" "}
          <Link
            href="/#cadastro"
            className="font-bold text-purple-600 transition-colors hover:text-purple-500"
          >
            Cadastre-se aqui
          </Link>
        </div>
      </div>
    </main>
  );
}
