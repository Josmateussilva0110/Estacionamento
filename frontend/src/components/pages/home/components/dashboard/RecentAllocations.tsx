import { Clock, ArrowRight, Bike, Truck, Car } from "lucide-react"

type VehicleType = "carro" | "moto" | "caminhonete" | "pcd" | "elderly"
type AllocationStatus = "ativo" | "encerrado"

interface RecentAllocation {
  plate: string
  client: string
  type: VehicleType
  time: string
  status: AllocationStatus
}

interface VehicleIconProps {
  type: VehicleType
  className?: string
}

const recentAllocations: RecentAllocation[] = [
  { plate: "ABC-1234", client: "Carlos Silva", type: "carro", time: "2 min", status: "ativo" },
  { plate: "DEF-5678", client: "Ana Souza", type: "moto", time: "18 min",status: "ativo" },
  { plate: "GHI-9012", client: "Pedro Lima", type: "carro", time: "45 min", status: "ativo" },
  { plate: "JKL-3456", client: "Maria Costa", type: "caminhonete", time: "1h 10m", status: "ativo" },
  { plate: "MNO-7890", client: "João Pereira", type: "moto", time: "2h 05m", status: "ativo" },
]

const vehicleTypeBadge: Record<VehicleType, string> = {
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
  return (
    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
          Alocações Recentes
        </p>
        <button className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
          Ver todas <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {recentAllocations.map((a, i) => (
          <div
            key={i}
            className="bg-slate-700/30 hover:bg-slate-700/60 rounded-xl px-3 md:px-4 py-3 border border-slate-600/30 transition-all"
          >
            {/* Mobile: two rows. Desktop: single row */}
            <div className="flex items-center justify-between gap-2">
              {/* Left: status dot + plate badge + name */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />

                <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border shrink-0 ${vehicleTypeBadge[a.type]}`}>
                  <VehicleIcon type={a.type} />
                  {a.plate}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {/* Plate badge — inline on mobile */}
                    <div className={`flex sm:hidden items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border shrink-0 ${vehicleTypeBadge[a.type]}`}>
                      <VehicleIcon type={a.type} className="w-3 h-3" />
                      {a.plate}
                    </div>
                    <p className="text-sm font-semibold text-slate-200 truncate">{a.client}</p>
                  </div>
                </div>
              </div>

              {/* Right: cost + time */}
              <div className="text-right shrink-0">
                <p className="text-xs text-orange-400 flex items-center justify-end gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  {a.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
