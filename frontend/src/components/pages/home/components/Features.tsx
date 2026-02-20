import {
  Zap,
} from "lucide-react"

import { features } from "../../../../configs/features"
import { type ModelSectionProps } from "../../../../types/landingPage/sections"


export function FeaturesSection({ sectionRef, inView }: ModelSectionProps) {
  return (
    <section id="recursos" ref={sectionRef} className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
            <Zap className="w-4 h-4 text-blue-300" />
            <span className="text-sm text-blue-300 font-medium">Recursos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Tudo que você precisa<br />em um só lugar
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Do cadastro de clientes ao fechamento do caixa, o Estacionamento cobre todas as etapas da operação.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center border border-white/10 mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
