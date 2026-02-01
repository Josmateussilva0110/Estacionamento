import { useEffect } from "react"
import { 
  User, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Phone, 
  Car,
  Building2,
  Clock,
  FileText,
  ArrowLeft,
  X,
  Sparkles,
  DollarSign,
} from "lucide-react"
import { getVehicleLabel } from "../utils/vehicleUtils"
import { type ClientVehicle } from "../../../../types/client/clientVehicle"
import { type VehicleType } from "../utils/vehicleUtils"
import { type SelectedSpotInfo } from "../types/selectedSpot"
import { formatPhone } from "../../../../utils/formatations"
import { type PaymentType } from "../AllocationClient" 
import { PAYMENT_TYPE_LABEL } from "../utils/paymentLabel"

interface ConfirmStepProps {
  selectedClient: ClientVehicle
  selectedSpot: SelectedSpotInfo
  paymentType: PaymentType  
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
  paymentType,
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
      const offset = now.getTimezoneOffset()
      const localDate = new Date(now.getTime() - offset * 60 * 1000)
      setEntryDate(localDate.toISOString().slice(0, 16))
    }
  }, [entryDate, setEntryDate])


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 px-3 sm:px-4 py-4 sm:py-8">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/60">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-600 via-emerald-700 to-green-800 opacity-[0.97]" />

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-green-400/20 rounded-full blur-3xl" />

          <div className="relative px-4 sm:px-8 py-6 sm:py-10">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-xl sm:rounded-2xl blur-xl" />
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/30">
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 tracking-tight">
                  Confirmar Alocação
                </h1>
                <p className="text-emerald-100 text-sm sm:text-lg">
                  Revise as informações antes de finalizar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Client Card */}
          <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-linear-to-r from-blue-500 to-blue-600 px-4 sm:px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/30">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Informações do Cliente
                </h3>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Nome Completo</p>
                  <p className="font-bold text-slate-800 text-base sm:text-lg truncate">
                    {selectedClient?.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Telefone</p>
                  <p className="font-bold text-slate-800 text-base sm:text-lg">
                    {formatPhone(selectedClient?.phone)}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium mb-1">Veículo</p>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-slate-800 text-base sm:text-lg">
                        {selectedClient?.plate}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 truncate">
                      {selectedClient?.vehicle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spot Card */}
          <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-linear-to-r from-emerald-500 to-emerald-600 px-4 sm:px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/30">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Detalhes da Vaga
                </h3>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Tipo de Vaga</p>
                  <p className="font-bold text-slate-800 text-base sm:text-lg">
                    {selectedSpot && getSpotTypeLabel(selectedSpot.type)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Estacionamento</p>
                  <p className="font-bold text-slate-800 text-base sm:text-lg truncate">
                    {selectedSpot?.parking.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 font-medium mb-0.5">
                    Tipo de Pagamento
                  </p>
                  <p className="font-bold text-slate-800 text-base sm:text-lg">
                    {PAYMENT_TYPE_LABEL[paymentType]}
                  </p>
                </div>
              </div>


              <div className="border-t border-slate-100 pt-4 mt-4">
                <div className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-semibold text-slate-700">Status</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-emerald-500/30">
                    DISPONÍVEL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Entry Details */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/60 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                Detalhes da Entrada
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Configure data, hora e observações
              </p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2 sm:mb-3">
                <Calendar className="w-4 h-4" />
                Data e Hora de Entrada
              </label>
              <input
                type="datetime-local"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 bg-slate-50 border-2 border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base text-slate-700"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2 sm:mb-3">
                <FileText className="w-4 h-4" />
                Observações
                <span className="text-xs text-slate-500 font-normal">(opcional)</span>
              </label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Ex: Cliente solicitou vaga próxima à saída, veículo com arranhão na porta traseira, etc."
                rows={4}
                className="w-full px-4 py-3 sm:py-4 bg-slate-50 border-2 border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all text-base text-slate-700 placeholder:text-slate-400"
              />
              <p className="mt-2 text-xs text-slate-500">
                Adicione informações relevantes sobre a alocação ou o veículo
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/60 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onCancel}
              className="flex-1 flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 border-2 border-slate-300 bg-white text-slate-700 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all hover:scale-[1.02] active:scale-95"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
              Cancelar
            </button>
            
            <button
              onClick={onBack}
              className="flex-1 flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 border-2 border-blue-300 bg-blue-50 text-blue-700 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-blue-100 hover:border-blue-400 transition-all hover:scale-[1.02] active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Voltar
            </button>
            
            <button
              onClick={onConfirm}
              className="flex-1 flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white text-sm sm:text-base font-bold rounded-lg sm:rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Confirmar Alocação
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmStep
