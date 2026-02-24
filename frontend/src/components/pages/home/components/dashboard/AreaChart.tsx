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


interface OccupancyPoint {
  time: string
  ocupados: number
}

const occupancyHourly: OccupancyPoint[] = [
  { time: "00h", ocupados: 10 },
  { time: "03h", ocupados: 6 },
  { time: "06h", ocupados: 22 },
  { time: "09h", ocupados: 74 },
  { time: "12h", ocupados: 91 },
  { time: "15h", ocupados: 85 },
  { time: "18h", ocupados: 68 },
  { time: "21h", ocupados: 42 },
  { time: "Agora", ocupados: 61 },
]

export function AreaChart() {
    return (
        <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Ocupação ao Longo do Dia
              </p>
              <Clock className="w-4 h-4 text-slate-500" />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <Chart data={occupancyHourly}>
                <defs>
                  <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="time" stroke="#475569" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <YAxis stroke="#475569" tick={{ fontSize: 10, fill: "#94a3b8" }} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone" dataKey="ocupados" name="Ocupação %"
                  stroke="#3b82f6" fill="url(#gradBlue)" strokeWidth={2} dot={false}
                />
              </Chart>
            </ResponsiveContainer>
        </div>
    )
}