import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

import {
  AreaChart as Chart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { CustomTooltip } from "./CustomTooltip"
import { requestData } from "../../../../../services/requestApi"
import { type Occupied } from "../../../../../types/stats/occupied"


export function AreaChart() {

  const [occupied, setOccupied] = useState<Occupied[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOccupied() {
      setIsLoading(true)
      const response = await requestData<Occupied[]>("/stats/occupied", "GET", {}, true)
      setOccupied(response.success && response.data ? response.data : null)
      setIsLoading(false)
    }
    fetchOccupied()
  }, [])

  const normalizedOccupied = occupied?.length
    ? (() => {
        const max = Math.max(...occupied.map(o => Number(o.occupied)))
        return occupied.map(o => ({
          ...o,
          occupiedRaw: Number(o.occupied), 
          occupied: Math.round((Number(o.occupied) / max) * 100),
        }))
      })()
    : []

  return (
    <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
          Ocupação ao Longo do Dia
        </p>
        <Clock className="w-4 h-4 text-slate-500" />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[200px]">
          <div className="w-6 h-6 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <Chart data={normalizedOccupied ?? []}>
            <defs>
              <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis dataKey="time" stroke="#475569" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis
              stroke="#475569"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              unit="%"
              domain={[0, 100]}
              ticks={[0, 50, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="occupied"
              name="Ocupação"
              stroke="#3b82f6"
              fill="url(#gradBlue)"
              strokeWidth={2}
              dot={false}
            />
          </Chart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
