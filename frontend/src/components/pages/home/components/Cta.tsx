import { useNavigate } from "react-router-dom"

import {
    ParkingCircle,
    ArrowRight,
} from "lucide-react"

import { type ModelSectionProps } from "../../../../types/landingPage/sections"

export function CtaSection({ sectionRef, inView }: ModelSectionProps) {
  const navigate = useNavigate()
  return (
    <section ref={sectionRef} className="py-12 sm:py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div
          className={`relative overflow-hidden bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-700/50 transition-all duration-700 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-slate-800/80 to-indigo-600/20" />
          <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-64 sm:h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center border border-blue-400/30 mx-auto mb-5 sm:mb-6">
              <ParkingCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-tight leading-snug">
              Pronto para transformar<br className="hidden xs:block" />
              {" "}seu estacionamento?
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
              Junte-se a centenas de gestores que já saíram das planilhas e ganharam controle total da operação.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button onClick={() => navigate("/login")} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all hover:scale-105 shadow-2xl shadow-blue-500/30 text-base sm:text-lg">
                Começar grátis por 14 dias
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-3 sm:mt-4">Sem cartão de crédito · Cancele quando quiser</p>
          </div>
        </div>
      </div>
    </section>
  )
}
