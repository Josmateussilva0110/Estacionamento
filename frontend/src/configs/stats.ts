import {
  Zap,
  Clock,
  Activity,
  ParkingCircle,
} from "lucide-react"

export interface Stat {
  value: string
  label: string
  icon: React.ElementType
  color: string
}

export const stats: Stat[] = [
  { value: "200+", label: "Vagas gerenciadas", icon: ParkingCircle, color: "text-blue-300" },
  { value: "98%", label: "Uptime garantido", icon: Activity, color: "text-emerald-300" },
  { value: "3x", label: "Mais rápido que planilhas", icon: Zap, color: "text-orange-300" },
  { value: "24/7", label: "Suporte disponível", icon: Clock, color: "text-violet-300" },
]
