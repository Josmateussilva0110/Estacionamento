import {
    ParkingCircle,
    ArrowRight,
} from "lucide-react"

import { type ModelSectionProps } from "../../../../types/landingPage/sections"

export function CtaSection({ sectionRef, inView }: ModelSectionProps) {
  return (
    <section ref={sectionRef} className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div
          className={`relative overflow-hidden bg-slate-800/80 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50 transition-all duration-700 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-slate-800/80 to-indigo-600/20" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-400/30 mx-auto mb-6">
              <ParkingCircle className="w-8 h-8 text-blue-300" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Pronto para transformar<br />seu estacionamento?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
              Junte-se a centenas de gestores que já saíram das planilhas e ganharam controle total da operação.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-2xl shadow-blue-500/30 text-lg">
                Começar grátis por 14 dias
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-4">Sem cartão de crédito · Cancele quando quiser</p>
          </div>
        </div>
      </div>
    </section>
  )
}
