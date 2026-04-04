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
  saidas: number
}


const weeklyFlow: WeeklyPoint[] = [
  { dia: "Seg", entradas: 143, saidas: 138 },
  { dia: "Ter", entradas: 167, saidas: 162 },
  { dia: "Qua", entradas: 155, saidas: 150 },
  { dia: "Qui", entradas: 189, saidas: 184 },
  { dia: "Sex", entradas: 212, saidas: 208 },
  { dia: "Sáb", entradas: 98, saidas: 95 },
  { dia: "Dom", entradas: 54, saidas: 52 },
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
              <Chart data={weeklyFlow} barSize={10} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="dia" stroke="#475569" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <YAxis stroke="#475569" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148,163,184,0.08)" }} />
                <Bar dataKey="entradas" name="Entradas" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="saidas" name="Saídas" fill="#10b981" radius={[3, 3, 0, 0]} />
                <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              </Chart>
            </ResponsiveContainer>
        </div>
    )
}
