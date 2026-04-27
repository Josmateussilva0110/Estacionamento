import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Clock, ArrowRight, Bike, Truck, Car, Calendar } from "lucide-react"
import { type RecentsAllocationsResponse } from "../../../../../types/stats/recents"
import { requestData } from "../../../../../services/requestApi"
import { formatMinutesToDaysHHMM, formatDateTime } from "../../../../../utils/formations"


interface VehicleIconProps {
  type: string
  className?: string
}


const vehicleTypeBadge: Record<string, string> = {
  carro: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  moto: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  caminhonete: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  pcd: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  elderly: "bg-pink-500/20 text-pink-300 border-pink-500/30",
}

function VehicleIcon({ type, className = "w-4 h-4" }: VehicleIconProps) {
  switch (type) {
    case "moto":
      return <Bike className={className} />
    case "caminhonete":
      return <Truck className={className} />
    default:
      return <Car className={className} />
  }
}

export function RecentAllocations() {
  const navigate = useNavigate()
  const [recentsAllocations, setRecents] = useState<RecentsAllocationsResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOccupied() {
      setIsLoading(true)
      const response = await requestData<RecentsAllocationsResponse[]>("/stats/recents", "GET", {}, true)
      setRecents(response.success && response.data ? response.data : [])
      setIsLoading(false)
    }
    fetchOccupied()
  }, [])

    return (
    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
          Alocações Recentes
        </p>
        <button onClick={() => navigate("/parking/management")} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
          Ver todas <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-700/30 rounded-xl px-3 md:px-4 py-3 border border-slate-600/30 animate-pulse"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-slate-600 shrink-0" />
                    <div className="hidden sm:block w-24 h-6 rounded-lg bg-slate-600/60 shrink-0" />
                    <div className="w-32 h-4 rounded-md bg-slate-600/60" />
                  </div>
                  <div className="w-14 h-4 rounded-md bg-slate-600/60 shrink-0" />
                </div>
              </div>
            ))
          : recentsAllocations.map((a, i) => (
              <div
                key={i}
                className="bg-slate-700/30 hover:bg-slate-700/60 rounded-xl px-3 md:px-4 py-3 border border-slate-600/30 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border shrink-0 ${vehicleTypeBadge[a.vehicleType]}`}>
                      <VehicleIcon type={a.vehicleType} />
                      {a.plate}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className={`flex sm:hidden items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border shrink-0 ${vehicleTypeBadge[a.vehicleType]}`}>
                          <VehicleIcon type={a.vehicleType} className="w-3 h-3" />
                          {a.plate}
                        </div>
                        <p className="text-sm font-semibold text-slate-200 truncate">{a.clientName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-orange-400 flex items-center justify-end gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {formatMinutesToDaysHHMM(a.time)}
                    </p>
                    <p className="text-xs text-orange-400 flex items-center justify-end gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {formatDateTime(a.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
