import {
  CreditCard,
  DollarSign,
  TrendingUp,
} from "lucide-react"
import { type ModelSectionProps } from "../../../../types/landingPage/sections"
import { paymentTypes } from "../../../../configs/payments"

export function BillingSection({ sectionRef, inView }: ModelSectionProps) {

  return (
    <section ref={sectionRef} className="py-24 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 mb-4">
            <CreditCard className="w-4 h-4 text-violet-300" />
            <span className="text-sm text-violet-300 font-medium">Cobrança Flexível</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Três modalidades,<br />zero complicação
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Configure tarifas diferentes para cada tipo de cliente e deixe o sistema calcular tudo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {paymentTypes.map((t, i) => (
            <div
              key={t.type}
              className={`bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 transition-all duration-700 hover:scale-[1.02] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ borderLeft: `3px solid ${t.color}`, transitionDelay: `${i * 100}ms` }}
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold border ${t.bg} ${t.textColor} mb-4`}>
                <DollarSign className="w-4 h-4" />
                {t.type}
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">{t.desc}</p>
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <p className={`text-xs font-semibold ${t.textColor} flex items-center gap-1`}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  Receita calculada automaticamente
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}