//import { useState, useEffect } from "react"
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
//import { requestData } from "../../../../../services/requestApi"


interface WeeklyPoint {
  dia: string
  entradas: number
  faturamento: number
}


const weeklyFlow: WeeklyPoint[] = [
  { dia: "Seg", entradas: 143, faturamento: 820 },
  { dia: "Ter", entradas: 167, faturamento: 910 },
  { dia: "Qua", entradas: 155, faturamento: 870 },
  { dia: "Qui", entradas: 189, faturamento: 1020 },
  { dia: "Sex", entradas: 212, faturamento: 1180 },
  { dia: "Sáb", entradas: 98, faturamento: 540 },
  { dia: "Dom", entradas: 54, faturamento: 320 },
]

export function BarChart() {

  return (
    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
          Movimentação Semanal
        </p>
        <CalendarDays className="w-4 h-4 text-slate-500" />
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <Chart data={weeklyFlow} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />

          <XAxis
            dataKey="dia"
            stroke="#475569"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
          />

          {/* Eixo esquerdo (Entradas) */}
          <YAxis
            yAxisId="left"
            stroke="#3b82f6"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
          />

          {/* Eixo direito (Faturamento) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#10b981"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />

          <Bar
            yAxisId="left"
            dataKey="entradas"
            name="Entradas"
            fill="#3b82f6"
            radius={[3, 3, 0, 0]}
          />

          <Bar
            yAxisId="right"
            dataKey="faturamento"
            name="Faturamento (R$)"
            fill="#10b981"
            radius={[3, 3, 0, 0]}
          />
        </Chart>
      </ResponsiveContainer>
    </div>
  )
}
