import { Search, MapPin, CheckCircle } from "lucide-react"
import { type Step } from "./types"
import { type ClientVehicle } from "../../../types/client/clientVehicle"
import { type VehicleType } from "./utils/vehicleUtils"

interface SelectedSpotInfo {
  type: VehicleType | "pcd" | "elderly"
  parkingId: string
}

interface ProgressStepsProps {
  step: Step
  selectedClient: ClientVehicle | null
  selectedSpot: SelectedSpotInfo | null
}

function ProgressSteps({
  step,
  selectedClient,
  selectedSpot,
}: ProgressStepsProps) {
  const steps = [
    {
      id: "search",
      label: "Buscar Cliente",
      icon: Search,
      completed: !!selectedClient,
    },
    {
      id: "select-spot",
      label: "Selecionar Vaga",
      icon: MapPin,
      completed: !!selectedSpot,
    },
    {
      id: "confirm",
      label: "Confirmar",
      icon: CheckCircle,
      completed: false,
    },
  ]

  return (
    <div className="px-8 py-6">
      <div className="relative">
        {/* Steps */}
        <div className="grid grid-cols-3 place-items-center relative z-10">
          {steps.map((s) => {
            const Icon = s.icon
            const isActive = step === s.id
            const isCompleted = s.completed

            return (
              <div
                key={s.id}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted || isActive
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <span
                  className={`text-sm font-semibold text-center ${
                    isActive
                      ? "text-blue-600"
                      : isCompleted
                      ? "text-gray-700"
                      : "text-gray-400"
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

export default ProgressSteps
