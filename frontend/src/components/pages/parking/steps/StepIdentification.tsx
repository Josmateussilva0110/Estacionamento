import Input from "../../../ui/Input"
import { Building2, User, ClipboardCheck } from "lucide-react"
import { type ParkingFormData } from "../../../../types/parking/parkingTypes"
import type { FormStepProps } from "../../../../types/formStep"

export function StepIdentification({ register, errors }: FormStepProps<ParkingFormData>) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">

      {/* Section card */}
      <section className="bg-slate-700/20 border border-slate-700/40 rounded-2xl p-5 space-y-4">

        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">Identificação</h3>
            <p className="text-xs text-slate-500">Informações básicas do estacionamento</p>
          </div>
        </div>

        <Input
          label="* Nome do estacionamento"
          placeholder="Ex.: Estacionamento Centro"
          leftIcon={<Building2 size={16} className="text-blue-400" />}
          {...register("parkingName")}
          error={errors.parkingName?.message}
        />

        <Input
          label="* Responsável / gerente"
          placeholder="Nome completo"
          leftIcon={<User size={16} className="text-blue-400" />}
          {...register("managerName")}
          error={errors.managerName?.message}
        />

      </section>
    </div>
  )
}
