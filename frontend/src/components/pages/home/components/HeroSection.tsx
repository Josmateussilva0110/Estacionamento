import {
  Car,
  ArrowRight,
  BarChart3,
  ChevronDown,
  DollarSign,
} from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900" />
      <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-slate-900 to-indigo-900/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(to right, #94a3b8 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm text-blue-300 font-medium">Sistema 100% online · Sem instalação</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Gerencie seu<br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
            estacionamento
          </span>
          <br />com inteligência
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Controle alocações, clientes, veículos e receitas em tempo real.
          Diga adeus às planilhas e cadernos de papel.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-2xl shadow-blue-500/30 text-lg">
            Começar gratuitamente
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mini stats */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: Car, label: "Carros, motos e caminhonetes" },
            { icon: DollarSign, label: "Cobrança automatizada" },
            { icon: BarChart3, label: "Relatórios em tempo real" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-slate-400">
              <Icon className="w-4 h-4 text-blue-400" />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs">Rolar para baixo</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  )
}