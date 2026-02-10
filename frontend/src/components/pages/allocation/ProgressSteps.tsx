import { Search, MapPin, CheckCircle } from "lucide-react"
import { type Step } from "./types"
import { type ClientVehicle } from "../../../types/client/clientVehicle"
import { type SelectedSpotInfo } from "../allocation/types/selectedSpot"

interface ProgressStepsProps {
  step: Step
  selectedClient: ClientVehicle | null
  selectedSpot: SelectedSpotInfo | null
}

export default function ProgressSteps({
  step,
  selectedClient,
  selectedSpot,
}: ProgressStepsProps) {
  const steps = [
    {
      id: "search" as Step,
      label: "Buscar Cliente",
      icon: Search,
      completed: !!selectedClient,
    },
    {
      id: "select-spot" as Step,
      label: "Selecionar Vaga",
      icon: MapPin,
      completed: !!selectedSpot,
    },
    {
      id: "confirm" as Step,
      label: "Confirmar",
      icon: CheckCircle,
      completed: false,
    },
  ]

  return (
    <div className="px-4 py-4 sm:px-8 sm:py-6">
      <div className="relative">
        
        {/* Steps */}
        <div className="grid grid-cols-3 place-items-center relative z-10 gap-2 sm:gap-4">
          {steps.map((s) => {
            const Icon = s.icon
            const isActive = step === s.id
            const isCompleted = s.completed

            return (
              <div
                key={s.id}
                className="flex flex-col items-center gap-1.5 sm:gap-2 w-full"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted || isActive
                      ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30"
                      : "bg-slate-700/50 border-slate-600/50 text-slate-400"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                <span
                  className={`text-xs sm:text-sm font-semibold text-center leading-tight px-1 ${
                    isActive
                      ? "text-blue-400"
                      : isCompleted
                      ? "text-slate-200"
                      : "text-slate-500"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
