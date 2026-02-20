import {
  RefreshCw,
} from "lucide-react"

import { steps } from "../../../../configs/steps"
import { type ModelSectionProps } from "../../../../types/landingPage/sections"


export function HowItWorksSection({ sectionRef, inView }: ModelSectionProps) {
  return (
    <section id="como-funciona" ref={sectionRef} className="py-24 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-4">
            <RefreshCw className="w-4 h-4 text-emerald-300" />
            <span className="text-sm text-emerald-300 font-medium">Como Funciona</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Simples do início ao fim
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Em menos de 5 minutos você já consegue registrar sua primeira alocação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`group bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-slate-600/50 z-10" />
              )}

              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${s.iconBg} rounded-xl flex items-center justify-center border border-white/10`}>
                  <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>
                <span className="text-3xl font-black text-slate-700">{s.step}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}