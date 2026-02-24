import { type ReactNode } from "react"

interface StatItemProps {
  icon: ReactNode
  label: string
  value: ReactNode
  iconBgColor: string
  iconBorderColor: string
}

export function StatItem({
  icon,
  label,
  value,
  iconBgColor,
  iconBorderColor,
}: StatItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 ${iconBgColor} rounded-xl flex items-center justify-center border ${iconBorderColor}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <div className="text-lg font-bold text-white">{value}</div>
      </div>
    </div>
  )
}
