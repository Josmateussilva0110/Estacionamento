import Input from "../../../ui/Input"
import {
  Clock, Car, Bike, Truck, CreditCard, MoonStar, CalendarRange, SunMedium
} from "lucide-react"
import { type ParkingFormData } from "../../../../types/parkingTypes"
import type { FormStepProps } from "../../../../types/formStep"


export function StepPrices({ register, errors }: FormStepProps<ParkingFormData>) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-lg">Preços Principais</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Valor hora"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<Clock size={18} className="text-blue-600" />}
            {...register("prices.priceHour", { valueAsNumber: true })}
            error={errors.prices?.priceHour?.message}
          />
          <Input
            label="Hora adicional"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<Clock size={18} className="text-blue-600" />}
            {...register("prices.priceExtraHour", { valueAsNumber: true })}
            error={errors.prices?.priceExtraHour?.message}
          />
          <Input
            label="Diária"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<SunMedium size={18} className="text-amber-500" />}
            {...register("prices.dailyRate", { valueAsNumber: true })}
            error={errors.prices?.dailyRate?.message}
          />
          <Input
            label="Mensalidade"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<CalendarRange size={18} className="text-blue-600" />}
            {...register("prices.monthlyRate", { valueAsNumber: true })}
            error={errors.prices?.monthlyRate?.message}
          />
          <Input
            label="Período noturno (ex.: 20h às 08h)"
            placeholder="20h às 08h"
            leftIcon={<MoonStar size={18} className="text-indigo-600" />}
            {...register("prices.nightPeriod")}
            error={errors.prices?.nightPeriod?.message}
          />
          <Input
            label="Valor período noturno"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<MoonStar size={18} className="text-indigo-600" />}
            {...register("prices.nightRate", { valueAsNumber: true })}
            error={errors.prices?.nightRate?.message}
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <Car className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-lg">Preços por Tipo de Veículo</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Valor carro"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<Car size={18} className="text-blue-600" />}
            {...register("prices.carPrice", { valueAsNumber: true })}
            error={errors.prices?.carPrice?.message}
          />
          <Input
            label="Valor moto"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<Bike size={18} className="text-blue-600" />}
            {...register("prices.motoPrice", { valueAsNumber: true })}
            error={errors.prices?.motoPrice?.message}
          />
          <Input
            label="Valor caminhonete"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<Truck size={18} className="text-blue-600" />}
            {...register("prices.truckPrice", { valueAsNumber: true })}
            error={errors.prices?.truckPrice?.message}
          />
        </div>
      </div>
    </div>
  )
}
