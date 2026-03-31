import { CreditCard, DollarSign } from "lucide-react"

interface RevenueByType {
  label: string
  type: "hour" | "day" | "month"
  revenue: number
  count: number
  pct: number
  color: string
  textColor: string
  iconBg: string
  borderColor: string
}

const revenueByType: RevenueByType[] = [
  {
    label: "Por Hora",
    type: "hour",
    revenue: 1240,
    count: 98,
    pct: 32,
    color: "#ef4444",
    textColor: "text-red-300",
    iconBg: "bg-red-500/20 border-red-500/30",
    borderColor: "#ef4444",
  },
  {
    label: "Por Dia",
    type: "day",
    revenue: 1860,
    count: 54,
    pct: 48,
    color: "#3b82f6",
    textColor: "text-blue-300",
    iconBg: "bg-blue-500/20 border-blue-500/30",
    borderColor: "#3b82f6",
  },
  {
    label: "Mensalistas",
    type: "month",
    revenue: 740,
    count: 34,
    pct: 20,
    color: "#10b981",
    textColor: "text-emerald-300",
    iconBg: "bg-emerald-500/20 border-emerald-500/30",
    borderColor: "#10b981",
  },
]

export function ChargesCard() {
    return (
        <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Receita por Tipo de Cobrança
              </p>
              <CreditCard className="w-4 h-4 text-slate-500" />
            </div>

            {/* Cards por tipo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[calc(100%-2.5rem)]">
              {revenueByType.map((r) => (
                <div
                  key={r.type}
                  className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30 flex flex-col justify-between"
                  style={{ borderLeft: `3px solid ${r.borderColor}` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-semibold ${r.textColor}`}>{r.label}</span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${r.iconBg}`}>
                      <DollarSign className={`w-4 h-4 ${r.textColor}`} />
                    </div>
                  </div>

                  <div>
                    <p className="text-3xl font-bold text-white mb-1">
                      R$ {r.revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-slate-400 mb-4">{r.count} veículos</p>
                  </div>

                  <div>
                    <div className="w-full h-1.5 bg-slate-600/50 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${r.pct}%`, background: r.color }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-medium ${r.textColor}`}>{r.pct}% da receita</p>
                      <p className="text-xs text-slate-500">
                        R$ {(r.revenue / r.count).toFixed(2)} / veíc.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
    )
}

