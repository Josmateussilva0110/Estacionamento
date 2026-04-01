import { type Revenue } from "../types/stats/revenue"


export const TYPE_CONFIG_REVENUE: Record<string, {
  label: string
  color: string
  textColor: string
  iconBg: string
  borderColor: string
}> = {
  hour: {
    label: "Por Hora",
    color: "#ef4444",
    textColor: "text-red-300",
    iconBg: "bg-red-500/20 border-red-500/30",
    borderColor: "#ef4444",
  },
  day: {
    label: "Por Dia",
    color: "#3b82f6",
    textColor: "text-blue-300",
    iconBg: "bg-blue-500/20 border-blue-500/30",
    borderColor: "#3b82f6",
  },
  month: {
    label: "Mensalistas",
    color: "#10b981",
    textColor: "text-emerald-300",
    iconBg: "bg-emerald-500/20 border-emerald-500/30",
    borderColor: "#10b981",
  },
}

export const EMPTY_REVENUE: Omit<Revenue, "paymentType"> = {
  revenue: 0,
  vehicleCount: 0,
  pct: 0,
}
