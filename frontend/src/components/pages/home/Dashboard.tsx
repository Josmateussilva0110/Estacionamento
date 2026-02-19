import { useState, useEffect } from "react"
import {
  Car,
  Bike,
  Truck,
  Activity,
  DollarSign,
  ParkingCircle,
  TrendingUp,
  Clock,
  Users,
  BarChart3,
  CalendarDays,
  ArrowRight,
  RefreshCw,
  Plus,
  Zap,
  Target,
  AlertCircle,
  CreditCard,
  CheckCircle2,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// ── Types ──────────────────────────────────────────────────────────────────────
type VehicleType = "carro" | "moto" | "caminhonete" | "pcd" | "elderly"
type AllocationStatus = "ativo" | "encerrado"
type TrendType = "up" | "down" | "activity"

interface OccupancyPoint {
  time: string
  ocupados: number
}

interface WeeklyPoint {
  dia: string
  entradas: number
  saidas: number
}

interface VehicleShareItem {
  name: string
  value: number
  color: string
}

interface RecentAllocation {
  plate: string
  client: string
  type: VehicleType
  parking: string
  time: string
  cost: number
  status: AllocationStatus
}

interface RevenueByType {
  label: string
  type: "hour" | "day" | "month"
  revenue: number
  count: number
  pct: number
  color: string
  textColor: string
  iconBg: string
  borderColor: string
}

interface KpiCardProps {
  icon: React.ElementType
  iconBg: string
  iconColor: string
  label: string
  value: string | number
  sub?: string
  subColor?: string
  trend?: TrendType
}

interface VehicleIconProps {
  type: VehicleType
  className?: string
}

// ── Mock data ──────────────────────────────────────────────────────────────────
const occupancyHourly: OccupancyPoint[] = [
  { time: "00h", ocupados: 10 },
  { time: "03h", ocupados: 6 },
  { time: "06h", ocupados: 22 },
  { time: "09h", ocupados: 74 },
  { time: "12h", ocupados: 91 },
  { time: "15h", ocupados: 85 },
  { time: "18h", ocupados: 68 },
  { time: "21h", ocupados: 42 },
  { time: "Agora", ocupados: 61 },
]

const weeklyFlow: WeeklyPoint[] = [
  { dia: "Seg", entradas: 143, saidas: 138 },
  { dia: "Ter", entradas: 167, saidas: 162 },
  { dia: "Qua", entradas: 155, saidas: 150 },
  { dia: "Qui", entradas: 189, saidas: 184 },
  { dia: "Sex", entradas: 212, saidas: 208 },
  { dia: "Sáb", entradas: 98, saidas: 95 },
  { dia: "Dom", entradas: 54, saidas: 52 },
]

const vehicleShare: VehicleShareItem[] = [
  { name: "Carro", value: 58, color: "#3b82f6" },
  { name: "Moto", value: 22, color: "#10b981" },
  { name: "Caminhonete", value: 12, color: "#f59e0b" },
  { name: "PCD / Idoso", value: 8, color: "#8b5cf6" },
]

const recentAllocations: RecentAllocation[] = [
  { plate: "ABC-1234", client: "Carlos Silva", type: "carro", parking: "Setor A", time: "2 min", cost: 12.5, status: "ativo" },
  { plate: "DEF-5678", client: "Ana Souza", type: "moto", parking: "Setor B", time: "18 min", cost: 6.0, status: "ativo" },
  { plate: "GHI-9012", client: "Pedro Lima", type: "carro", parking: "Setor C", time: "45 min", cost: 28.0, status: "ativo" },
  { plate: "JKL-3456", client: "Maria Costa", type: "caminhonete", parking: "Setor A", time: "1h 10m", cost: 42.0, status: "ativo" },
  { plate: "MNO-7890", client: "João Pereira", type: "moto", parking: "Setor D", time: "2h 05m", cost: 18.0, status: "ativo" },
]

const revenueByType: RevenueByType[] = [
  {
    label: "Por Hora",
    type: "hour",
    revenue: 1240,
    count: 98,
    pct: 32,
    color: "#ef4444",
    textColor: "text-red-300",
    iconBg: "bg-red-500/20 border-red-500/30",
    borderColor: "#ef4444",
  },
  {
    label: "Por Dia",
    type: "day",
    revenue: 1860,
    count: 54,
    pct: 48,
    color: "#3b82f6",
    textColor: "text-blue-300",
    iconBg: "bg-blue-500/20 border-blue-500/30",
    borderColor: "#3b82f6",
  },
  {
    label: "Mensalistas",
    type: "month",
    revenue: 740,
    count: 34,
    pct: 20,
    color: "#10b981",
    textColor: "text-emerald-300",
    iconBg: "bg-emerald-500/20 border-emerald-500/30",
    borderColor: "#10b981",
  },
]

const totalRevenue = revenueByType.reduce((acc, r) => acc + r.revenue, 0)

// ── Helpers ────────────────────────────────────────────────────────────────────
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

const vehicleTypeBadge: Record<VehicleType, string> = {
  carro: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  moto: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  caminhonete: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  pcd: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  elderly: "bg-pink-500/20 text-pink-300 border-pink-500/30",
}



// ── Custom Tooltip ─────────────────────────────────────────────────────────────
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

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
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

// ── KPI Card ───────────────────────────────────────────────────────────────────
function KpiCard({ icon: Icon, iconBg, iconColor, label, value, sub, subColor = "text-slate-400", trend }: KpiCardProps) {
  return (
    <div className="bg-slate-700/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-slate-300 text-sm font-medium">{label}</p>
        <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center border border-white/10`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <p className="text-4xl font-bold text-white">{value}</p>
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

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ParkingHome() {
  const [now, setNow] = useState<Date>(new Date())
  const [refreshed, setRefreshed] = useState<boolean>(false)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  function handleRefresh(): void {
    setRefreshed(true)
    setTimeout(() => setRefreshed(false), 1000)
  }

  const totalVagas = 200
  const totalOcupadas = 61
  const occupancyPct = Math.round((totalOcupadas / totalVagas) * 100)

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── HEADER ──────────────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-blue-600/10 to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative px-8 py-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl" />
                  <div className="relative w-16 h-16 bg-blue-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-blue-400/30">
                    <BarChart3 className="w-8 h-8 text-blue-300" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">Dashboard</h1>
                  <p className="text-blue-200 text-lg">Visão geral do estacionamento</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="text-right mr-2">
                  <p className="text-xs text-slate-500">Última atualização</p>
                  <p className="text-sm text-blue-300 tabular-nums font-semibold">
                    {now.toLocaleTimeString("pt-BR")}
                  </p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 mr-2">ONLINE</span>

                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-700/80 backdrop-blur-xl text-white font-semibold px-5 py-3 rounded-xl transition-all border border-slate-600/50 hover:scale-105"
                >
                  <RefreshCw size={18} className={refreshed ? "animate-spin" : ""} />
                  Atualizar
                </button>

                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-5 py-3 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/30">
                  <Plus size={18} />
                  Nova Alocação
                </button>
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <KpiCard
                icon={Car} iconBg="bg-blue-500/20" iconColor="text-blue-300"
                label="Vagas Ocupadas" value={totalOcupadas}
                sub={`${occupancyPct}% de ocupação`} subColor="text-blue-300" trend="activity"
              />
              <KpiCard
                icon={ParkingCircle} iconBg="bg-emerald-500/20" iconColor="text-emerald-300"
                label="Vagas Livres" value={totalVagas - totalOcupadas}
                sub={`de ${totalVagas} vagas totais`} subColor="text-emerald-300" trend="activity"
              />
              <KpiCard
                icon={Activity} iconBg="bg-orange-500/20" iconColor="text-orange-300"
                label="Entradas Hoje" value="212"
                sub="+8.4% vs. ontem" subColor="text-orange-300" trend="up"
              />
              <KpiCard
                icon={DollarSign} iconBg="bg-violet-500/20" iconColor="text-violet-300"
                label="Receita do Dia" value="R$ 3.840"
                sub="Meta: R$ 4.000" subColor="text-violet-300" trend="up"
              />
            </div>
          </div>
        </div>

        {/* ── ROW 2: Gauge + Receita por Tipo ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gauge */}
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 flex flex-col items-center justify-center">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-6">
              Ocupação Geral
            </p>
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={occupancyPct > 80 ? "#ef4444" : occupancyPct > 50 ? "#f59e0b" : "#10b981"}
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - occupancyPct / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-white">{occupancyPct}%</span>
                <span className="text-xs text-slate-400 mt-1">ocupado</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6 w-full">
              <div className="bg-slate-700/30 rounded-xl p-3 text-center border border-slate-600/30">
                <p className="text-2xl font-bold text-emerald-400">{totalVagas - totalOcupadas}</p>
                <p className="text-xs text-slate-400 mt-0.5">Livres</p>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-3 text-center border border-slate-600/30">
                <p className="text-2xl font-bold text-blue-400">{totalOcupadas}</p>
                <p className="text-xs text-slate-400 mt-0.5">Ocupadas</p>
              </div>
            </div>
          </div>

          {/* Receita por Tipo de Cobrança */}
          <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Receita por Tipo de Cobrança
              </p>
              <CreditCard className="w-4 h-4 text-slate-500" />
            </div>

            {/* Cards por tipo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[calc(100%-2.5rem)]">
              {revenueByType.map((r) => (
                <div
                  key={r.type}
                  className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30 flex flex-col justify-between"
                  style={{ borderLeft: `3px solid ${r.borderColor}` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-semibold ${r.textColor}`}>{r.label}</span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${r.iconBg}`}>
                      <DollarSign className={`w-4 h-4 ${r.textColor}`} />
                    </div>
                  </div>

                  <div>
                    <p className="text-3xl font-bold text-white mb-1">
                      R$ {r.revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-slate-400 mb-4">{r.count} veículos hoje</p>
                  </div>

                  <div>
                    <div className="w-full h-1.5 bg-slate-600/50 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${r.pct}%`, background: r.color }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-medium ${r.textColor}`}>{r.pct}% da receita</p>
                      <p className="text-xs text-slate-500">
                        R$ {(r.revenue / r.count).toFixed(2)} / veíc.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 3: Area chart + Pie ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Ocupação ao Longo do Dia
              </p>
              <Clock className="w-4 h-4 text-slate-500" />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={occupancyHourly}>
                <defs>
                  <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="time" stroke="#475569" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <YAxis stroke="#475569" tick={{ fontSize: 10, fill: "#94a3b8" }} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone" dataKey="ocupados" name="Ocupação %"
                  stroke="#3b82f6" fill="url(#gradBlue)" strokeWidth={2} dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Tipo de Veículo
              </p>
              <Target className="w-4 h-4 text-slate-500" />
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={vehicleShare} cx="50%" cy="50%"
                  innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value"
                >
                  {vehicleShare.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-3">
              {vehicleShare.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                    <span className="text-slate-400">{c.name}</span>
                  </div>
                  <span className="font-bold" style={{ color: c.color }}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 4: Bar chart + Recent ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Movimentação Semanal
              </p>
              <CalendarDays className="w-4 h-4 text-slate-500" />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyFlow} barSize={10} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="dia" stroke="#475569" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <YAxis stroke="#475569" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="entradas" name="Entradas" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="saidas" name="Saídas" fill="#10b981" radius={[3, 3, 0, 0]} />
                <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

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
        </div>

        {/* ── ROW 5: Quick stats bar ───────────────────────────────────────────── */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                <Zap className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Média de veículos / hora</p>
                <p className="text-lg font-bold text-white">27 veíc./h</p>
              </div>
            </div>
            <div className="w-px h-10 bg-slate-600/50 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30">
                <TrendingUp className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Pico do dia</p>
                <p className="text-lg font-bold text-white">95% às 12h</p>
              </div>
            </div>
            <div className="w-px h-10 bg-slate-600/50 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-400/30">
                <Users className="w-5 h-5 text-orange-300" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Mensalistas ativos</p>
                <p className="text-lg font-bold text-white">34</p>
              </div>
            </div>
            <div className="w-px h-10 bg-slate-600/50 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center border border-violet-400/30">
                <CheckCircle2 className="w-5 h-5 text-violet-300" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Saídas hoje</p>
                <p className="text-lg font-bold text-white">208</p>
              </div>
            </div>
            <div className="w-px h-10 bg-slate-600/50 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-400/30">
                <AlertCircle className="w-5 h-5 text-red-300" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Receita ontem vs hoje</p>
                <p className="text-lg font-bold text-white flex items-center gap-1.5">
                  R$ 3.840
                  <span className="text-sm font-semibold text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" />+12%
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
