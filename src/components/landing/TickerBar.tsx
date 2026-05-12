export default function TickerBar() {
  return (
    <div className="relative z-50 overflow-hidden bg-slate-900 py-2 text-sm text-white">
      <div className="flex items-center space-x-8 whitespace-nowrap animate-marquee">
        <span>
          <i
            className="fa-solid fa-arrow-up mr-1 text-green-400"
            aria-hidden="true"
          />
          IBOVESPA 128.430 (+0.8%)
        </span>
        <span aria-hidden="true">•</span>
        <span>
          <i
            className="fa-solid fa-briefcase mr-1 text-fluid-peach"
            aria-hidden="true"
          />
          Setor de Tecnologia lidera contratacoes este mes
        </span>
        <span aria-hidden="true">•</span>
        <span>
          <i
            className="fa-solid fa-arrow-down mr-1 text-red-400"
            aria-hidden="true"
          />
          Dolar R$ 5,02 (-0.3%)
        </span>
        <span aria-hidden="true">•</span>
        <span>
          <i
            className="fa-solid fa-bullhorn mr-1 text-fluid-cyan"
            aria-hidden="true"
          />
          Nova lei de cotas trans entra em pauta no senado
        </span>
      </div>
    </div>
  );
}
