import {
  Car,
  CheckCircle2,
} from "lucide-react"

import { carTypes } from "../../../../configs/carTypes"
import { type ModelSectionProps } from "../../../../types/landingPage/sections"

export function VehicleTypesSection({ sectionRef, inView }: ModelSectionProps) {


  return (
    <section ref={sectionRef} className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
              <Car className="w-4 h-4 text-orange-300" />
              <span className="text-sm text-orange-300 font-medium">Multi-veículo</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Suporte a todos os<br />tipos de veículo
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              O Estacionamento identifica e classifica automaticamente cada tipo de veículo, 
              aplicando a tarifa correta e controlando vagas especiais como PCD e idosos.
            </p>
            <ul className="space-y-3">
              {["Tarifas diferenciadas por categoria", "Controle de vagas especiais (PCD, Idoso)", "Histórico por tipo de veículo", "Relatórios de ocupação segmentados"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            {carTypes.map((t) => (
              <div key={t.label} className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-500/50 hover:scale-[1.02] transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${t.badge}`}>
                    <t.icon className="w-3.5 h-3.5" />
                    {t.label}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}