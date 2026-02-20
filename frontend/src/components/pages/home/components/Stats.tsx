import { stats } from "../../../../configs/stats"
import { type ModelSectionProps } from "../../../../types/landingPage/sections"

export function StatsSection({ sectionRef, inView }: ModelSectionProps) {
  return (
    <section
      ref={sectionRef}
      className="py-20 bg-slate-900 border-y border-slate-700/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 text-center transition-all duration-700 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600/30">
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
              </div>

              <p className={`text-3xl font-bold mb-1 ${s.color}`}>
                {s.value}
              </p>

              <p className="text-sm text-slate-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
