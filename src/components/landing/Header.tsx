import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-glass shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-500 to-orange-400 text-xl font-bold text-white shadow-lg">
            C
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Conecta<span className="text-purple-600">Talento</span>
          </span>
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          <Link
            href="#"
            className="font-medium text-slate-600 transition-colors hover:text-purple-600"
          >
            Sobre Nos
          </Link>
          <Link
            href="#radar"
            className="font-medium text-slate-600 transition-colors hover:text-purple-600"
          >
            Radar do Mercado
          </Link>
          <Link
            href="#acolhimento"
            className="font-medium text-slate-600 transition-colors hover:text-purple-600"
          >
            <i className="fa-solid fa-map-pin mr-1" aria-hidden="true" />
            Acolhimento
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
            title="Alto Contraste/Acessibilidade"
          >
            <i className="fa-solid fa-circle-half-stroke" aria-hidden="true" />
          </button>
          <Link
            href="/auth/login"
            className="hidden font-medium text-slate-600 hover:text-slate-900 sm:block"
          >
            Entrar
          </Link>
          <Link
            href="#cadastro"
            className="rounded-full bg-slate-900 px-5 py-2.5 font-medium text-white shadow-lg transition-colors hover:bg-slate-800"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </header>
  );
}
