export interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name?: string
    value?: number
    color?: string
    fill?: string
    payload?: Record<string, unknown>
  }>
  label?: string
}

export function PieTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null

  const p = payload[0]
  const vehicleType = p.payload?.vehicleType as string | undefined
  const countVehicles = p.payload?.countVehicles as number | undefined

  return (
    <div className="bg-slate-800 border border-slate-600/50 rounded-xl p-3 text-xs shadow-2xl">
      <p className="text-slate-400 mb-1 text-white font-medium">{vehicleType}</p>
      <p className="text-slate-400">
        Contagem: <span className="text-white font-bold">{countVehicles}</span>
      </p>
    </div>
  )
}
