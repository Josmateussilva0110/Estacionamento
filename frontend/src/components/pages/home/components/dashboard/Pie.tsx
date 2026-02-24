import { Target } from "lucide-react"

import {
  PieChart,
  Pie as Pizza,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { CustomTooltip } from "./CustomTooltip"



interface VehicleShareItem {
  name: string
  value: number
  color: string
}


const vehicleShare: VehicleShareItem[] = [
  { name: "Carro", value: 58, color: "#3b82f6" },
  { name: "Moto", value: 22, color: "#10b981" },
  { name: "Caminhonete", value: 12, color: "#f59e0b" },
  { name: "PCD / Idoso", value: 8, color: "#8b5cf6" },
]

export function Pie() {
    return (
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Tipo de Veículo
              </p>
              <Target className="w-4 h-4 text-slate-500" />
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pizza
                  data={vehicleShare} cx="50%" cy="50%"
                  innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value"
                >
                  {vehicleShare.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pizza>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-3">
              {vehicleShare.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                    <span className="text-slate-400">{c.name}</span>
                  </div>
                  <span className="font-bold" style={{ color: c.color }}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
    )
}