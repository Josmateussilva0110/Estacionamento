import { TrendingUp, Activity } from "lucide-react"

type TrendType = "up" | "down" | "activity"

interface KpiCardProps {
  icon: React.ElementType
  iconBg: string
  iconColor: string
  label: string
  value: number | null
  valueText?: string  
  sub?: string
  subColor?: string
  trend?: TrendType
}

export function KpiCard({ icon: Icon, iconBg, iconColor, label, value, valueText, sub, subColor = "text-slate-400", trend }: KpiCardProps) {
  return (
    <div className="bg-slate-700/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-slate-300 text-sm font-medium">{label}</p>
        <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center border border-white/10`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <p className="text-4xl font-bold text-white">{valueText ?? value ?? "-"}</p>
      {sub && (
        <p className={`text-sm flex items-center gap-1 ${subColor}`}>
          {trend === "up" && <TrendingUp className="w-4 h-4" />}
          {trend === "activity" && <Activity className="w-4 h-4" />}
          {sub}
        </p>
      )}
    </div>
  )
}
