interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name?: string
    value?: number
    color?: string
    fill?: string
  }>
  label?: string
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-slate-600/50 rounded-xl p-3 text-xs shadow-2xl">
      <p className="text-slate-400 mb-1 font-medium">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color ?? p.fill }}>
          {p.name}:{" "}
          <span className="text-white font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  )
}
