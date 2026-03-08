import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Car,
  Activity,
  DollarSign,
  ParkingCircle,
  BarChart3,
  RefreshCw,
  Plus,
} from "lucide-react"

import { KpiCard } from "./components/dashboard/KpiCard"
import { Gauge } from "./components/dashboard/Gauge"
import { ChargesCard } from "./components/dashboard/chargesCard"
import { AreaChart } from "./components/dashboard/AreaChart"
import { Pie } from "./components/dashboard/Pie"
import { BarChart } from "./components/dashboard/BarChart"
import { RecentAllocations } from "./components/dashboard/RecentAllocations"
import { StatsOverview } from "./components/dashboard/StatsOverview"



export default function ParkingHome() {
  const [now, setNow] = useState<Date>(new Date())
  const [refreshed, setRefreshed] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  function handleRefresh(): void {
    setRefreshed(true)
    setTimeout(() => setRefreshed(false), 1000)
  }

  function handleRegister() {
        navigate("/parking/allocation")
  }

  const totalVagas = 200
  const totalOcupadas = 61
  const occupancyPct = Math.round((totalOcupadas / totalVagas) * 100)

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── HEADER ──────────────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-slate-800/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-slate-700/50">
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-blue-600/10 to-transparent" />
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative px-4 sm:px-6 md:px-8 py-5 md:py-10">

            {/* ── Top row: icon + title / status + actions ── */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6">

              {/* Left: icon + title */}
              <div className="flex items-center gap-3 md:gap-5">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-xl md:rounded-2xl blur-xl" />
                  <div className="relative w-12 h-12 md:w-16 md:h-16 bg-blue-500/20 backdrop-blur-xl rounded-xl md:rounded-2xl flex items-center justify-center border border-blue-400/30">
                    <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-blue-300" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-0.5 tracking-tight">Dashboard</h1>
                  <p className="text-blue-200 text-sm md:text-lg">Visão geral do estacionamento</p>
                </div>
              </div>

              {/* Right: status + buttons */}
              <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">

                {/* Status pill */}
                <div className="flex items-center gap-2 bg-slate-700/40 border border-slate-600/40 rounded-xl px-3 py-2 sm:mr-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-xs text-emerald-400 font-semibold tracking-wide">ONLINE</span>
                  <span className="text-slate-500 text-xs">·</span>
                  <p className="text-xs text-blue-300 tabular-nums font-semibold">
                    {now.toLocaleTimeString("pt-BR")}
                  </p>
                </div>

                {/* Action buttons — full-width on mobile */}
                <div className="flex w-full sm:w-auto gap-2">
                  <button
                    onClick={handleRefresh}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-700/80 backdrop-blur-xl text-white font-semibold px-4 py-2.5 rounded-xl transition-all border border-slate-600/50 active:scale-95 hover:scale-105 text-sm"
                  >
                    <RefreshCw size={16} className={refreshed ? "animate-spin" : ""} />
                    <span>Atualizar</span>
                  </button>

                  <button onClick={() => handleRegister() } className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95 hover:scale-105 shadow-lg shadow-blue-500/30 text-sm">
                    <Plus size={16} />
                    <span>Nova Alocação</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ── KPI row ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-5 md:mt-8">
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
          <Gauge occupancyPercentage={occupancyPct} totalSpots={totalVagas} occupiedSpots={totalOcupadas}/>
          <ChargesCard/>
        </div>

        {/* ── ROW 3: Area chart + Pie ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AreaChart/>
          <Pie/>
        </div>

        {/* ── ROW 4: Bar chart + Recent ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart/>
          <RecentAllocations/>
        </div>

        {/* ── ROW 5: Quick stats bar ───────────────────────────────────────────── */}
        <StatsOverview
          avgPerHour={27}
          peakPercentage={95}
          peakHour="12h"
          activeSubscribers={34}
          exitsToday={208}
          revenueToday={3840}
          revenueGrowth={12}
        />
      </div>
    </div>
  )
}
