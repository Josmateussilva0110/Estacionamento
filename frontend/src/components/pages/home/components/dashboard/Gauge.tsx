interface GaugeProps {
  occupancyPercentage?: number | null
  totalSpots?: number | null
  occupiedSpots?: number | null
}

export function Gauge({occupancyPercentage, totalSpots, occupiedSpots,}: GaugeProps) {
  const occupancy = occupancyPercentage ?? 0
  const total = totalSpots ?? 0
  const occupied = occupiedSpots ?? 0

  const hasData =
    occupancyPercentage != null &&
    totalSpots != null &&
    occupiedSpots != null

  return (
    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 flex flex-col items-center justify-center">
      <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-6">
        Ocupação Geral
      </p>

      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#1e293b"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={
              hasData
                ? occupancy > 80
                  ? "#ef4444"
                  : occupancy > 50
                  ? "#f59e0b"
                  : "#10b981"
                : "#374151" 
            }
            strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - occupancy / 100)}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">
            {hasData ? `${occupancy}%` : "—"}
          </span>
          <span className="text-xs text-slate-400 mt-1">ocupado</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6 w-full">
        <div className="bg-slate-700/30 rounded-xl p-3 text-center border border-slate-600/30">
          <p className="text-2xl font-bold text-emerald-400">
            {hasData ? total - occupied : "—"}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">Livres</p>
        </div>
        <div className="bg-slate-700/30 rounded-xl p-3 text-center border border-slate-600/30">
          <p className="text-2xl font-bold text-blue-400">
            {hasData ? occupied : "—"}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">Ocupadas</p>
        </div>
      </div>
    </div>
  )
}
