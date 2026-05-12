import Image from "next/image";
import Link from "next/link";

const tags = [
  "Alta demanda: Tecnologia",
  "Empreendedorismo",
  "Direitos Trabalhistas",
  "Saude Mental",
];

const articles = [
  {
    id: "diversidade",
    category: "Tendencias",
    categoryColor: "text-purple-600",
    title:
      "Empresas que investem em diversidade faturam ate 35% mais, diz pesquisa",
    description:
      "Estudo recente aponta que equipes plurais nao apenas melhoram o clima organizacional, mas trazem inovacao direta para os negocios.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "capacitacao",
    category: "Capacitacao",
    categoryColor: "text-orange-500",
    title:
      "ONG lanca cursos gratuitos de programacao para pessoas trans e travestis",
    description:
      "Iniciativa visa reduzir a vulnerabilidade social incluindo a comunidade em uma das areas que mais cresce no Brasil.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "entrevista",
    category: "Dicas de Carreira",
    categoryColor: "text-pink-500",
    title: "Como abordar o uso do nome social durante a entrevista de emprego",
    description:
      "Especialistas em RH dao dicas praticas para garantir seus direitos e manter a seguranca durante os processos seletivos.",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export default function MarketRadarSection() {
  return (
    <section
      id="radar"
      className="border-t border-slate-100 bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-slate-900">
              Radar do Mercado
            </h2>
            <p className="text-slate-600">
              Ultimas noticias, tendencias e pesquisas sobre empregabilidade.
            </p>
          </div>
          <Link
            href="#"
            className="hidden font-medium text-purple-600 hover:underline sm:block"
          >
            Ver todas as noticias
            <i className="fa-solid fa-arrow-right ml-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="cursor-pointer rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
            >
              {tag === "Alta demanda: Tecnologia" ? (
                <>
                  <i
                    className="fa-solid fa-fire mr-1 text-orange-500"
                    aria-hidden="true"
                  />
                  {tag}
                </>
              ) : (
                tag
              )}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span
                  className={`mb-2 block text-xs font-bold uppercase tracking-wider ${article.categoryColor}`}
                >
                  {article.category}
                </span>
                <h3 className="mb-2 text-xl font-bold text-slate-900 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {article.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
