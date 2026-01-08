import Input from "../../../ui/Input"
import { Building2, User } from "lucide-react"
import { type ParkingFormData } from "../../../../types/parking/parkingTypes"
import type { FormStepProps } from "../../../../types/formStep"

export function StepIdentification({ register, errors }: FormStepProps<ParkingFormData>) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <Input
        label="* Nome do estacionamento"
        placeholder="Ex.: Estacionamento Centro"
        leftIcon={<Building2 size={18} className="text-blue-600" />}
        {...register("parkingName")}
        error={errors.parkingName?.message}
      />

      <Input
        label="* Responsável / gerente"
        placeholder="Nome completo"
        leftIcon={<User size={18} className="text-blue-600" />}
        {...register("managerName")}
        error={errors.managerName?.message}
      />
    </div>
  )
}
