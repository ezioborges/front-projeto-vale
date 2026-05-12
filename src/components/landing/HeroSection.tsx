import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
      <div>
        <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-sm font-medium text-purple-700 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-green-500" />
          <span>Comunidade segura e inclusiva</span>
        </div>
        <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-900 lg:text-6xl">
          O seu talento <br />
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            nao tem barreiras.
          </span>
        </h1>
        <p className="mb-8 text-xl leading-relaxed text-slate-600">
          Conectamos profissionais de todas as areas a empresas que valorizam a
          diversidade. Da diaria ao escritorio, encontre o seu lugar ou encontre
          o talento ideal.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            className="rounded-full bg-slate-900 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-slate-800"
          >
            <i
              className="fa-solid fa-magnifying-glass mr-2"
              aria-hidden="true"
            />
            Quero uma Oportunidade
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-900 shadow-sm transition-all hover:bg-slate-50"
          >
            <i className="fa-solid fa-building mr-2" aria-hidden="true" />
            Quero Contratar
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl md:aspect-[4/3]">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Equipe diversa colaborando"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        </div>

        <div
          className="absolute -bottom-6 -left-6 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-xl animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl text-green-600">
            <i className="fa-solid fa-check" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Vagas preenchidas
            </p>
            <p className="text-2xl font-bold text-slate-900">+1.200</p>
          </div>
        </div>
      </div>
    </section>
  );
}
