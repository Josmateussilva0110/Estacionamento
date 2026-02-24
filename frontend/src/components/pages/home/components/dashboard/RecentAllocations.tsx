import { Clock, ArrowRight, Bike, Truck, Car } from "lucide-react"

type VehicleType = "carro" | "moto" | "caminhonete" | "pcd" | "elderly"
type AllocationStatus = "ativo" | "encerrado"

interface RecentAllocation {
  plate: string
  client: string
  type: VehicleType
  parking: string
  time: string
  cost: number
  status: AllocationStatus
}

interface VehicleIconProps {
  type: VehicleType
  className?: string
}


const recentAllocations: RecentAllocation[] = [
  { plate: "ABC-1234", client: "Carlos Silva", type: "carro", parking: "Setor A", time: "2 min", cost: 12.5, status: "ativo" },
  { plate: "DEF-5678", client: "Ana Souza", type: "moto", parking: "Setor B", time: "18 min", cost: 6.0, status: "ativo" },
  { plate: "GHI-9012", client: "Pedro Lima", type: "carro", parking: "Setor C", time: "45 min", cost: 28.0, status: "ativo" },
  { plate: "JKL-3456", client: "Maria Costa", type: "caminhonete", parking: "Setor A", time: "1h 10m", cost: 42.0, status: "ativo" },
  { plate: "MNO-7890", client: "João Pereira", type: "moto", parking: "Setor D", time: "2h 05m", cost: 18.0, status: "ativo" },
]


const vehicleTypeBadge: Record<VehicleType, string> = {
  carro: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  moto: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  caminhonete: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  pcd: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  elderly: "bg-pink-500/20 text-pink-300 border-pink-500/30",
}




export function RecentAllocations() {

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
    return (
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Alocações Recentes
              </p>
              <button className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Ver todas <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {recentAllocations.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-slate-700/30 hover:bg-slate-700/60 rounded-xl px-4 py-3 border border-slate-600/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${vehicleTypeBadge[a.type]}`}>
                      <VehicleIcon type={a.type} />
                      {a.plate}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{a.client}</p>
                      <p className="text-xs text-slate-500">{a.parking}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">R$ {a.cost.toFixed(2)}</p>
                    <p className="text-xs text-orange-400 flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3" />
                      {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        </div>
    )
}
