import { useEffect } from "react"
import { User, MapPin, Calendar, CheckCircle2 } from "lucide-react"
import { getVehicleLabel } from "../utils/vehicleUtils"
import { type ClientVehicle } from "../../../../types/client/clientVehicle"
import { type VehicleType } from "../utils/vehicleUtils"
import { type SelectedSpotInfo } from "../types/selectedSpot"



interface ConfirmStepProps {
  selectedClient: ClientVehicle | null
  selectedSpot: SelectedSpotInfo | null  
  entryDate: string
  setEntryDate: (date: string) => void
  observations: string
  setObservations: (obs: string) => void
  onConfirm: () => void
  onCancel: () => void
  onBack: () => void
}

function ConfirmStep({
  selectedClient,
  selectedSpot,
  entryDate,
  setEntryDate,
  observations,
  setObservations,
  onConfirm,
  onCancel,
  onBack
}: ConfirmStepProps) {
  const getSpotTypeLabel = (type: VehicleType) => {
    return getVehicleLabel(type as VehicleType)
  }

    useEffect(() => {
      if (!entryDate) {
        const now = new Date()
        const timezoneOffset = now.getTimezoneOffset() * 60000
        const localTime = new Date(now.getTime() - timezoneOffset)
        const localDateTime = localTime.toISOString().slice(0, 16)

        setEntryDate(localDateTime)
      }
    }, [entryDate, setEntryDate])




  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Confirmar Alocação
        </h2>
        <p className="text-gray-600">
          Revise as informações antes de finalizar
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Cliente */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Cliente</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="font-semibold">Nome:</span> {selectedClient?.name}</p>
            <p><span className="font-semibold">Telefone:</span> {selectedClient?.phone}</p>
            <p><span className="font-semibold">Placa:</span> {selectedClient?.plate}</p>
            <p><span className="font-semibold">Veículo:</span> {selectedClient?.vehicle}</p>
          </div>
        </div>

        {/* Vaga */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Vaga</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="font-semibold">Tipo:</span> {selectedSpot && getSpotTypeLabel(selectedSpot.type)}</p>
            <p><span className="font-semibold">Estacionamento:</span> {selectedSpot?.parking.name}</p>
            <p><span className="font-semibold">Status:</span> <span className="text-green-600 font-semibold">Disponível</span></p>
          </div>
        </div>
      </div>

      {/* Entry Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Data e Hora de Entrada
          </label>
          <input
            type="datetime-local"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Observações (opcional)
          </label>
          <textarea
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            placeholder="Ex: Cliente solicitou vaga próxima à saída"
            rows={3}
            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          onClick={onCancel}
          className="flex-1 px-6 py-4 border-2 border-gray-300 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
        >
          Cancelar
        </button>
        <button
          onClick={onBack}
          className="flex-1 px-6 py-4 border-2 border-blue-300 bg-blue-50 text-blue-700 font-semibold rounded-xl hover:bg-blue-100 transition-all"
        >
          Voltar
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-6 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={20} />
          Confirmar Alocação
        </button>
      </div>
    </div>
  )
}

export default ConfirmStep
