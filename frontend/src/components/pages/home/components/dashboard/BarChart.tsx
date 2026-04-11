import { useState, useEffect } from "react"
import { CalendarDays } from "lucide-react"
import {
  BarChart as Chart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { CustomTooltip } from "./CustomTooltip"
import { type RevenueGroupDay } from "../../../../../types/stats/revenueGroupDay"
import { requestData } from "../../../../../services/requestApi"

export function BarChart() {
  const [occupied, setOccupied] = useState<RevenueGroupDay[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOccupied() {
      setIsLoading(true)
      const response = await requestData<RevenueGroupDay[]>("/stats/revenue/day", "GET", {}, true)
      setOccupied(response.success && response.data ? response.data : null)
      setIsLoading(false)
    }
    fetchOccupied()
  }, [])

  return (
    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
          Movimentação Semanal
        </p>
        <CalendarDays className="w-4 h-4 text-slate-500" />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[200px]">
          <div className="w-6 h-6 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : !occupied || occupied.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[200px] gap-2">
          <CalendarDays className="w-8 h-8 text-slate-600" />
          <p className="text-slate-500 text-xs">Nenhuma movimentação registrada</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <Chart data={occupied} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis
              yAxisId="left"
              stroke="#3b82f6"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              allowDecimals={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#10b981"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
            <Bar yAxisId="left" dataKey="occupied" name="Entradas" fill="#3b82f6" radius={[3, 3, 0, 0]} />
            <Bar yAxisId="right" dataKey="revenue" name="Faturamento (R$)" fill="#10b981" radius={[3, 3, 0, 0]} />
          </Chart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
