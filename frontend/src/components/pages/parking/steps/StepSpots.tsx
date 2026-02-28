import Input from "../../../ui/Input"
import {
  Settings, Car, Bike, Truck, Camera, Home, Package,
  Accessibility, HeartPulse, ShowerHead, CheckCircle, X,
} from "lucide-react"
import { type ParkingFormData } from "../../../../types/parking/parkingTypes"
import type { FormStepProps } from "../../../../types/formStep"

export function StepSpots({ register, errors, watch, setValue }: FormStepProps<ParkingFormData>) {
  const operations = watch?.("operations")
  if (!operations || !setValue) return null

  const spotTypes = [
    { label: "Total de vagas",    field: "operations.totalSpots",   icon: Package,      color: "text-blue-400",   iconBg: "bg-blue-500/20 border-blue-400/30" },
    { label: "Vagas — Carro",     field: "operations.carSpots",     icon: Car,          color: "text-blue-400",   iconBg: "bg-blue-500/20 border-blue-400/30" },
    { label: "Vagas — Moto",      field: "operations.motoSpots",    icon: Bike,         color: "text-emerald-400",iconBg: "bg-emerald-500/20 border-emerald-400/30" },
    { label: "Vagas — Caminhonete",field: "operations.truckSpots",  icon: Truck,        color: "text-orange-400", iconBg: "bg-orange-500/20 border-orange-400/30" },
    { label: "Vagas — PCD",       field: "operations.pcdSpots",     icon: Accessibility,color: "text-violet-400", iconBg: "bg-violet-500/20 border-violet-400/30" },
    { label: "Vagas — Idoso",     field: "operations.elderlySpots", icon: HeartPulse,   color: "text-pink-400",   iconBg: "bg-pink-500/20 border-pink-400/30" },
  ] as const

  const toggles = [
    { label: "Câmeras de segurança", field: "hasCameras" as const, icon: Camera,     active: operations.hasCameras },
    { label: "Serviço de lavagem",   field: "hasWashing" as const, icon: ShowerHead, active: operations.hasWashing },
  ]

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">

      {/* ── Vagas ── */}
      <section className="bg-slate-700/20 border border-slate-700/40 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
            <Package className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">Vagas disponíveis</h3>
            <p className="text-xs text-slate-500">Quantidade por categoria de veículo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {spotTypes.map(({ label, field, icon: Icon, color, iconBg }) => (
            <Input
              key={field}
              label={label}
              type="number"
              placeholder="0"
              leftIcon={
                <div className={`w-5 h-5 rounded flex items-center justify-center border ${iconBg}`}>
                  <Icon size={12} className={color} />
                </div>
              }
              {...register(field as any, { valueAsNumber: true })}
              error={(errors as any).operations?.[field.split(".")[1]]?.message}
            />
          ))}
        </div>
      </section>

      {/* ── Estrutura ── */}
      <section className="bg-slate-700/20 border border-slate-700/40 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-400/30 flex items-center justify-center shrink-0">
            <Settings className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">Estrutura e recursos</h3>
            <p className="text-xs text-slate-500">Diferenciais e tipo de área</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          {/* Toggle buttons — wrapped in same label+control structure as the select */}
          {toggles.map(({ label, field, icon: Icon, active }) => (
            <div key={field} className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Icon size={12} className="text-emerald-400" />
                {label}
              </label>
              <button
                type="button"
                onClick={() => setValue(`operations.${field}`, !active, { shouldDirty: true })}
                className={`
                  w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border
                  text-sm font-semibold transition-all duration-200 active:scale-95
                  ${active
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-500/10"
                    : "bg-slate-700/40 border-slate-600/40 text-slate-400 hover:border-slate-500/60 hover:bg-slate-700/60"
                  }
                `}
              >
                <span>{active ? "Sim, possui" : "Não possui"}</span>
                <div className={`
                  w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all
                  ${active ? "bg-emerald-500/30" : "bg-slate-600/60"}
                `}>
                  {active
                    ? <CheckCircle size={12} className="text-emerald-400" />
                    : <X size={10} className="text-slate-500" />
                  }
                </div>
              </button>
            </div>
          ))}

          {/* Area type select */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Home size={12} className="text-orange-400" />
              Tipo de área
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400 pointer-events-none" />
              <select
                className="
                  w-full rounded-xl border border-slate-600/50 bg-slate-700/50
                  pl-9 pr-4 py-3 text-sm text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                  hover:border-slate-500/70 transition-all duration-200
                  appearance-none cursor-pointer
                  scheme-dark
                "
                {...register("operations.areaType")}
                defaultValue="coberta"
              >
                <option value="coberta">Coberta</option>
                <option value="descoberta">Descoberta</option>
                <option value="mista">Mista</option>
              </select>
              {/* Custom chevron */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.operations?.areaType?.message && (
              <p className="text-xs text-red-400">{errors.operations.areaType.message}</p>
            )}
          </div>

        </div>
      </section>

    </div>
  )
}
