import Image from "next/image";

const supportItems = [
  {
    title: "Casas de Acolhida",
    description:
      "Abrigos seguros para pessoas LGBTQIAP+ em situacao de rua ou risco.",
    icon: "fa-house-chimney-medical",
  },
  {
    title: "Orientacao Juridica",
    description: "Apoio para retificacao de nome e denuncias de discriminacao.",
    icon: "fa-scale-balanced",
  },
];

export default function AcolhimentoSection() {
  return (
    <section id="acolhimento" className="bg-fluid-gradient py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="mb-6 text-3xl font-bold text-slate-900 lg:text-4xl">
            Rede de Acolhimento
          </h2>
          <p className="mb-6 text-lg text-slate-700">
            Sabemos que a busca por emprego pode ser um momento de
            vulnerabilidade. Mapeamos ONGs, centros de referencia e espacos
            seguros que oferecem apoio psicologico, juridico e moradia.
          </p>
          <ul className="mb-8 space-y-4">
            {supportItems.map((item) => (
              <li key={item.title} className="flex items-start">
                <i
                  className={`fa-solid ${item.icon} mr-3 mt-1 text-purple-600`}
                  aria-hidden="true"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="rounded-full border-2 border-purple-600 px-6 py-3 font-bold text-purple-700 transition-colors hover:bg-purple-50"
          >
            Conhecer todos os parceiros
          </button>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between px-2">
            <h3 className="font-bold text-slate-900">
              <i
                className="fa-solid fa-location-dot mr-2 text-red-500"
                aria-hidden="true"
              />
              Pontos Seguros Proximos
            </h3>
            <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
              Sao Paulo, SP
            </span>
          </div>
          <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Mapa de acolhimento"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover opacity-70"
            />

            <div
              className="absolute left-1/4 top-1/4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-purple-600 text-white shadow-lg transition-transform hover:scale-110"
              title="Centro de Referencia LGBT"
            >
              <i className="fa-solid fa-star text-xs" aria-hidden="true" />
            </div>
            <div className="absolute left-2/3 top-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-pink-500 text-white shadow-lg transition-transform hover:scale-110">
              <i className="fa-solid fa-house text-xs" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
