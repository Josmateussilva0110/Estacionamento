import {
  CheckCircle2,
  Lock,
} from "lucide-react"

import { type ModelSectionProps } from "../../../../types/landingPage/sections"
import { plans } from "../../../../configs/pricing"


export function PricingSection({ sectionRef, inView }: ModelSectionProps) {
  return (
    <section id="planos" ref={sectionRef} className="py-24 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
            <Lock className="w-4 h-4 text-blue-300" />
            <span className="text-sm text-blue-300 font-medium">Planos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Planos para todos<br />os tamanhos
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Comece gratuitamente por 14 dias. Sem cartão de crédito.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-700 ${p.highlighted
                ? "bg-linear-to-b from-blue-600/20 to-slate-800/80 border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-[1.02]"
                : "bg-slate-800/80 backdrop-blur-xl border-slate-700/50"
              } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-linear-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                    {p.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{p.description}</p>
                <div className="flex items-end gap-1">
                  <span className={`text-4xl font-black ${p.highlighted ? "text-blue-300" : "text-white"}`}>{p.price}</span>
                  {p.period && <span className="text-slate-400 mb-1">{p.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.highlighted ? "text-blue-400" : "text-emerald-400"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-semibold transition-all hover:scale-105 ${p.highlighted
                ? "bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30"
                : "bg-slate-700/50 hover:bg-slate-700/80 text-white border border-slate-600/50"
              }`}>
                {p.name === "Enterprise" ? "Falar com vendas" : "Começar agora"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}