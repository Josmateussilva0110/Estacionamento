import Input from "../../../ui/Input"
import {
  Settings, Car, Bike, Truck, Camera, Home, Package, Accessibility, HeartPulse, ShowerHead
} from "lucide-react"
import { type ParkingFormData } from "../../../../types/parkingTypes"
import type { FormStepProps } from "../../../../types/formStep"





export function StepSpots({ register, errors, watch, setValue }: FormStepProps<ParkingFormData>) {
  const operations = watch?.("operations")
  if (!operations || !setValue) return null

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <Package className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-lg">Vagas Disponíveis</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Total de vagas"
            type="number"
            placeholder="0"
            leftIcon={<Package size={18} className="text-blue-600" />}
            {...register("operations.totalSpots", { valueAsNumber: true })}
            error={errors.operations?.totalSpots?.message}
          />
          <Input
            label="Vagas - Carro"
            type="number"
            placeholder="0"
            leftIcon={<Car size={18} className="text-blue-600" />}
            {...register("operations.carSpots", { valueAsNumber: true })}
            error={errors.operations?.carSpots?.message}
          />
          <Input
            label="Vagas - Moto"
            type="number"
            placeholder="0"
            leftIcon={<Bike size={18} className="text-blue-600" />}
            {...register("operations.motoSpots", { valueAsNumber: true })}
            error={errors.operations?.motoSpots?.message}
          />
          <Input
            label="Vagas - Caminhonete"
            type="number"
            placeholder="0"
            leftIcon={<Truck size={18} className="text-blue-600" />}
            {...register("operations.truckSpots", { valueAsNumber: true })}
            error={errors.operations?.truckSpots?.message}
          />
          <Input
            label="Vagas - PCD"
            type="number"
            placeholder="0"
            leftIcon={<Accessibility size={18} className="text-blue-600" />}
            {...register("operations.pcdSpots", { valueAsNumber: true })}
            error={errors.operations?.pcdSpots?.message}
          />
          <Input
            label="Vagas - Idoso"
            type="number"
            placeholder="0"
            leftIcon={<HeartPulse size={18} className="text-blue-600" />}
            {...register("operations.elderlySpots", { valueAsNumber: true })}
            error={errors.operations?.elderlySpots?.message}
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-lg">Estrutura e Recursos</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Camera className="w-4 h-4" />
              Possui câmeras?
            </label>
            <button
              type="button"
              onClick={() => {
                const current = operations.hasCameras
                setValue("operations.hasCameras", !current, { shouldDirty: true })
              }}
              className={`w-full rounded-lg px-3 py-3 border text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] ${operations.hasCameras
                  ? "bg-emerald-500 text-white border-emerald-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
            >
              {operations.hasCameras ? "✓ Sim" : "Não"}
            </button>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ShowerHead className="w-4 h-4" />
              Possui lavagem?
            </label>
            <button
              type="button"
              onClick={() => {
                const current = operations.hasWashing
                setValue("operations.hasWashing", !current, { shouldDirty: true })
              }}
              className={`w-full rounded-lg px-3 py-3 border text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] ${operations.hasWashing
                  ? "bg-emerald-500 text-white border-emerald-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
            >
              {operations.hasWashing ? "✓ Sim" : "Não"}
            </button>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Home className="w-4 h-4" />
              Tipo de Área
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <select
                className="w-full rounded-lg border border-gray-300 bg-white px-3 pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                {...register("operations.areaType")}
                defaultValue="coberta"
              >
                <option value="coberta">Coberta</option>
                <option value="descoberta">Descoberta</option>
                <option value="mista">Mista</option>
              </select>
            </div>
            {errors.operations?.areaType?.message && (
              <p className="text-sm text-red-600">{errors.operations.areaType.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
