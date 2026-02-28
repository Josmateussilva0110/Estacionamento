import {
  Zap,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

import { StatItem } from "./StatItem"

interface StatsOverviewProps {
  avgPerHour: number
  peakPercentage: number
  peakHour: string
  activeSubscribers: number
  exitsToday: number
  revenueToday: number
  revenueGrowth: number
}

export function StatsOverview({
  avgPerHour,
  peakPercentage,
  peakHour,
  activeSubscribers,
  exitsToday,
  revenueToday,
  revenueGrowth,
}: StatsOverviewProps) {
  const isGrowthPositive = revenueGrowth >= 0

  return (
    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-4 md:p-6">
      {/* Mobile: coluna única com dividers / Desktop: linha única com dividers verticais */}
      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-700/50">

        <div className="flex-1 py-3 lg:py-0 lg:px-4 first:pt-0 last:pb-0 lg:first:pl-0 lg:last:pr-0">
          <StatItem
            icon={<Zap className="w-4 h-4 md:w-5 md:h-5 text-blue-300" />}
            label="Média / hora"
            value={`${avgPerHour} veíc./h`}
            iconBgColor="bg-blue-500/20"
            iconBorderColor="border-blue-400/30"
          />
        </div>

        <div className="flex-1 py-3 lg:py-0 lg:px-4">
          <StatItem
            icon={<TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-300" />}
            label="Pico do dia"
            value={`${peakPercentage}% às ${peakHour}`}
            iconBgColor="bg-emerald-500/20"
            iconBorderColor="border-emerald-400/30"
          />
        </div>

        <div className="flex-1 py-3 lg:py-0 lg:px-4">
          <StatItem
            icon={<Users className="w-4 h-4 md:w-5 md:h-5 text-orange-300" />}
            label="Mensalistas ativos"
            value={activeSubscribers}
            iconBgColor="bg-orange-500/20"
            iconBorderColor="border-orange-400/30"
          />
        </div>

        <div className="flex-1 py-3 lg:py-0 lg:px-4">
          <StatItem
            icon={<CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-violet-300" />}
            label="Saídas hoje"
            value={exitsToday}
            iconBgColor="bg-violet-500/20"
            iconBorderColor="border-violet-400/30"
          />
        </div>

        <div className="flex-1 py-3 lg:py-0 lg:px-4">
          <StatItem
            icon={<AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-300" />}
            label="Receita ontem vs hoje"
            value={
              <div className="flex items-center gap-1.5 flex-wrap">
                {`R$ ${revenueToday.toLocaleString("pt-BR")}`}
                <span className={`text-sm font-semibold flex items-center gap-0.5 ${isGrowthPositive ? "text-emerald-400" : "text-red-400"}`}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  {`${isGrowthPositive ? "+" : ""}${revenueGrowth}%`}
                </span>
              </div>
            }
            iconBgColor="bg-red-500/20"
            iconBorderColor="border-red-400/30"
          />
        </div>

      </div>
    </div>
  )
}
