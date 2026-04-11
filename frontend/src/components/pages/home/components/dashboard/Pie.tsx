import { useState, useEffect } from "react"
import { Target } from "lucide-react"
import { PieChart, Pie as Pizza, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { requestData } from "../../../../../services/requestApi"
import { PieTooltip } from "./PieTooltip"
import { type CountVehicles } from "../../../../../types/stats/countVehicle"
import { type CountVehicleTypeResponse } from "../../../../../types/stats/countVehicleResponse"

const VEHICLE_COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#ec4899",
]

export function Pie() {
  const [vehicles, setVehicles] = useState<CountVehicles[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchOccupied() {
      setIsLoading(true)
      const response = await requestData<CountVehicleTypeResponse>("/stats/vehicle", "GET", {}, true)
      if (response.success && response.data) {
        setVehicles(response.data.data)
        setTotal(response.data.total)
      } else {
        setVehicles(null)
        setTotal(0)
      }
      setIsLoading(false)
    }
    fetchOccupied()
  }, [])

  return (
    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
          Tipo de Veículo
        </p>
        <Target className="w-4 h-4 text-slate-500" />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[200px]">
          <div className="w-6 h-6 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : !vehicles || vehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[200px] gap-2">
          <Target className="w-8 h-8 text-slate-600" />
          <p className="text-slate-500 text-xs">Nenhum veículo registrado</p>
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pizza
                data={vehicles} cx="50%" cy="50%"
                innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="countVehicles" isAnimationActive={false}
              >
                {vehicles.map((_, i) => (
                  <Cell key={i} fill={VEHICLE_COLORS[i % VEHICLE_COLORS.length]} />
                ))}
              </Pizza>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {vehicles.map((c, i) => {
              const color = VEHICLE_COLORS[i % VEHICLE_COLORS.length]
              return (
                <div key={c.vehicleType} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <span className="text-slate-400">{c.vehicleType}</span>
                  </div>
                  <span className="font-bold" style={{ color }}>
                    {((c.countVehicles / total) * 100).toFixed(0)}%
                  </span>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
