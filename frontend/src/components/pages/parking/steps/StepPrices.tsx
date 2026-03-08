import Input from "../../../ui/Input"
import { TimeRangePicker } from "../../../ui/TimeRangePicker"
import { Controller } from "react-hook-form"
import {
  Clock, Car, Bike, Truck, CreditCard, MoonStar, CalendarRange, SunMedium
} from "lucide-react"
import { type ParkingFormData } from "../../../../types/parking/parkingTypes"
import type { FormStepProps } from "../../../../types/formStep"

export function StepPrices({ register, errors, control }: FormStepProps<ParkingFormData>) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">

      {/* ── Preços Principais ── */}
      <section className="bg-slate-700/20 border border-slate-700/40 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
            <CreditCard className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">Preços Principais</h3>
            <p className="text-xs text-slate-500">Tarifas por hora, diária e mensalidade</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Valor hora *"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<Clock size={16} className="text-blue-400" />}
            {...register("prices.priceHour", { valueAsNumber: true })}
            error={errors.prices?.priceHour?.message}
          />
          <Input
            label="Hora adicional *"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<Clock size={16} className="text-blue-400" />}
            {...register("prices.priceExtraHour", { valueAsNumber: true })}
            error={errors.prices?.priceExtraHour?.message}
          />
          <Input
            label="Diária *"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<SunMedium size={16} className="text-amber-400" />}
            {...register("prices.dailyRate", { valueAsNumber: true })}
            error={errors.prices?.dailyRate?.message}
          />
          <Input
            label="Mensalidade *"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<CalendarRange size={16} className="text-blue-400" />}
            {...register("prices.monthlyRate", { valueAsNumber: true })}
            error={errors.prices?.monthlyRate?.message}
          />
          <Controller
            name="prices.nightPeriod"
            control={control}
            render={({ field }) => (
              <TimeRangePicker
                label="* Período noturno"
                value={field.value}
                onChange={field.onChange}
                error={errors.prices?.nightPeriod?.message}
              />
            )}
          />
          <Input
            label="Valor período noturno"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<MoonStar size={16} className="text-indigo-400" />}
            {...register("prices.nightRate", { valueAsNumber: true })}
            error={errors.prices?.nightRate?.message}
          />
        </div>
      </section>

      {/* ── Preços por Tipo de Veículo ── */}
      <section className="bg-slate-700/20 border border-slate-700/40 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-400/30 flex items-center justify-center shrink-0">
            <Car className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">Preços por Tipo de Veículo</h3>
            <p className="text-xs text-slate-500">Tarifas específicas por categoria</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Valor carro *"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<Car size={16} className="text-violet-400" />}
            {...register("prices.carPrice", { valueAsNumber: true })}
            error={errors.prices?.carPrice?.message}
          />
          <Input
            label="Valor moto *"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<Bike size={16} className="text-violet-400" />}
            {...register("prices.motoPrice", { valueAsNumber: true })}
            error={errors.prices?.motoPrice?.message}
          />
          <Input
            label="Valor caminhonete *"
            type="number"
            step="0.01"
            placeholder="0,00"
            leftIcon={<Truck size={16} className="text-violet-400" />}
            {...register("prices.truckPrice", { valueAsNumber: true })}
            error={errors.prices?.truckPrice?.message}
          />
        </div>
      </section>

    </div>
  )
}
