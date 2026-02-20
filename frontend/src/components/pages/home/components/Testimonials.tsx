import {
  Users,
  Star,
} from "lucide-react"
import { type ModelSectionProps } from "../../../../types/landingPage/sections"
import { testimonials } from "../../../../configs/feedbacks"

export function TestimonialsSection({ sectionRef, inView }: ModelSectionProps) {
  return (
    <section id="depoimentos" ref={sectionRef} className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-4">
            <Star className="w-4 h-4 text-orange-300" />
            <span className="text-sm text-orange-300 font-medium">Depoimentos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Quem usa, aprova
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Veja o que nossos clientes dizem depois de adotar o Estacionamento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-orange-400 fill-orange-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.content}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                  <Users className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}