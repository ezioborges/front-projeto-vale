export default function SignupSection() {
  return (
    <section
      id="cadastro"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl md:flex-row">
          <div className="relative flex w-full flex-col justify-between overflow-hidden bg-slate-900 p-10 text-white md:w-5/12">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-purple-600 opacity-40 blur-3xl mix-blend-screen" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-pink-600 opacity-40 blur-3xl mix-blend-screen" />

            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold">
                Seu talento tem espaco aqui.
              </h2>
              <p className="mb-8 text-sm text-slate-300">
                Nossa plataforma garante a seguranca dos seus dados. As
                informacoes solicitadas servem para conectarmos voce as melhores
                empresas e ONGs parceiras.
              </p>

              <div className="hidden space-y-6 md:block">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-bold">
                    1
                  </div>
                  <span className="text-sm font-medium">Acesso Essencial</span>
                </div>
                <div className="flex items-center gap-4 opacity-50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-500 text-sm font-bold">
                    2
                  </div>
                  <span className="text-sm font-medium">Sua Identidade</span>
                </div>
                <div className="flex items-center gap-4 opacity-50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-500 text-sm font-bold">
                    3
                  </div>
                  <span className="text-sm font-medium">
                    Perfil Profissional
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-8 md:w-7/12 lg:p-12">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              Criar nova conta
            </h3>

            <div className="mb-8 flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-all"
              >
                <i className="fa-solid fa-briefcase" aria-hidden="true" />
                Sou Candidato
              </button>
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-slate-500 transition-all hover:text-slate-700"
              >
                <i className="fa-solid fa-building" aria-hidden="true" />
                Sou Contratante
              </button>
            </div>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Nome de Usuario
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <i
                      className="fa-regular fa-user text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Ex: joaosilva"
                    autoComplete="username"
                    required
                    className="block w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 transition-colors focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  E-mail
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <i
                      className="fa-regular fa-envelope text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="seu@email.com"
                    autoComplete="email"
                    required
                    className="block w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 transition-colors focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Senha
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <i
                      className="fa-solid fa-lock text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    className="block w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 transition-colors focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Minimo de 8 caracteres.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-xl border border-transparent bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                >
                  Continuar para o Perfil
                  <i
                    className="fa-solid fa-arrow-right ml-2 mt-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <p className="mt-4 text-center text-sm text-slate-600">
                Ja tem uma conta?{" "}
                <a
                  href="/login"
                  className="font-bold text-purple-600 hover:text-purple-500"
                >
                  Faca login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
