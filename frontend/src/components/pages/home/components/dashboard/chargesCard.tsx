import { useState, useEffect } from "react"
import { CreditCard, DollarSign } from "lucide-react"
import { requestData } from "../../../../../services/requestApi"
import { type Revenue } from "../../../../../types/stats/revenue"
import { TYPE_CONFIG_REVENUE, EMPTY_REVENUE } from "../../../../../configs/revenue"



function SkeletonCard({ borderColor }: { borderColor: string }) {
  return (
    <div
      className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30 flex flex-col justify-between animate-pulse"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="h-3.5 w-16 bg-slate-600/60 rounded" />
        <div className="w-9 h-9 rounded-xl bg-slate-600/60" />
      </div>

      <div>
        <div className="h-8 w-32 bg-slate-600/60 rounded mb-2" />
        <div className="h-3 w-20 bg-slate-600/40 rounded mb-4" />
      </div>

      <div>
        <div className="w-full h-1.5 bg-slate-600/50 rounded-full mb-1.5" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 bg-slate-600/40 rounded" />
          <div className="h-3 w-20 bg-slate-600/40 rounded" />
        </div>
      </div>
    </div>
  )
}

export function ChargesCard() {
  const [revenue, setRevenue] = useState<Revenue[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRevenue() {
      setIsLoading(true)
      const response = await requestData<Revenue[]>("/stats/revenue", "GET", {}, true)
      setRevenue(response.success && response.data ? response.data : null)
      setIsLoading(false)
    }
    fetchRevenue()
  }, [])

  return (
    <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
          Receita por Tipo de Cobrança
        </p>
        <CreditCard className="w-4 h-4 text-slate-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[calc(100%-2.5rem)]">
        {isLoading
          ? Object.values(TYPE_CONFIG_REVENUE).map((cfg, i) => (
              <SkeletonCard key={i} borderColor={cfg.borderColor} />
            ))
          : Object.entries(TYPE_CONFIG_REVENUE).map(([paymentType, cfg]) => {
              const data = revenue?.find((r) => r.paymentType === paymentType) ?? EMPTY_REVENUE
              const count = Number(data.vehicleCount)

              return (
                <div
                  key={paymentType}
                  className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30 flex flex-col justify-between"
                  style={{ borderLeft: `3px solid ${cfg.borderColor}` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-semibold ${cfg.textColor}`}>{cfg.label}</span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${cfg.iconBg}`}>
                      <DollarSign className={`w-4 h-4 ${cfg.textColor}`} />
                    </div>
                  </div>

                  <div>
                    <p className="text-3xl font-bold text-white mb-1">
                      R$ {data.revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-slate-400 mb-4">{count} veículos</p>
                  </div>

                  <div>
                    <div className="w-full h-1.5 bg-slate-600/50 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${data.pct}%`, background: cfg.color }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-medium ${cfg.textColor}`}>{data.pct.toFixed(1)}% da receita</p>
                    </div>
                  </div>
                </div>
              )
            })}
      </div>
    </div>
  )
}
