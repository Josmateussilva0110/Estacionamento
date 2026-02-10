import { useEffect } from "react"
import { 
  User, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Car,
  Building2,
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
import EntryDetails from "./components/EntryDetails"

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
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/50">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-600/20 via-emerald-600/20 to-emerald-600/20" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-green-500/10 rounded-full blur-3xl" />

        <div className="relative px-4 sm:px-8 py-6 sm:py-10">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/30 rounded-xl sm:rounded-2xl blur-xl" />
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500/20 backdrop-blur-xl rounded-xl sm:rounded-2xl flex items-center justify-center border border-emerald-400/30">
                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-300" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 tracking-tight">
                Confirmar Alocação
              </h1>
              <p className="text-emerald-200 text-sm sm:text-lg">
                Revise as informações antes de finalizar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Client Card */}
        <div className="group bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden hover:shadow-blue-500/20 transition-all duration-300">
          <div className="bg-slate-700/50 px-4 sm:px-6 py-4 border-b border-slate-600/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 backdrop-blur-xl rounded-xl flex items-center justify-center border border-blue-400/30">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Informações do Cliente
              </h3>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0 border border-blue-500/30">
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 font-medium mb-0.5">Nome Completo</p>
                <p className="font-bold text-white text-base sm:text-lg truncate">
                  {selectedClient?.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center shrink-0 border border-purple-500/30">
                <Phone className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 font-medium mb-0.5">Telefone</p>
                <p className="font-bold text-white text-base sm:text-lg">
                  {formatPhone(selectedClient?.phone)}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-4 mt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center shrink-0 border border-indigo-500/30">
                  <Car className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400 font-medium mb-1">Veículo</p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-white text-base sm:text-lg">
                      {selectedClient?.plate}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 truncate">
                    {selectedClient?.vehicle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spot Card */}
        <div className="group bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden hover:shadow-emerald-500/20 transition-all duration-300">
          <div className="bg-slate-700/50 px-4 sm:px-6 py-4 border-b border-slate-600/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 backdrop-blur-xl rounded-xl flex items-center justify-center border border-emerald-400/30">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Detalhes da Vaga
              </h3>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 font-medium mb-0.5">Tipo de Vaga</p>
                <p className="font-bold text-white text-base sm:text-lg">
                  {selectedSpot && getSpotTypeLabel(selectedSpot.type)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0 border border-blue-500/30">
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 font-medium mb-0.5">Estacionamento</p>
                <p className="font-bold text-white text-base sm:text-lg truncate">
                  {selectedSpot?.parking.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center shrink-0 border border-yellow-500/30">
                <DollarSign className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 font-medium mb-0.5">
                  Tipo de Pagamento
                </p>
                <p className="font-bold text-white text-base sm:text-lg">
                  {PAYMENT_TYPE_LABEL[paymentType]}
                </p>
              </div>
            </div>


            <div className="border-t border-slate-700/50 pt-4 mt-4">
              <div className="flex items-center justify-between px-4 py-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-slate-200">Status</span>
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
      <EntryDetails
        entryDate={entryDate}
        setEntryDate={setEntryDate}
        observations={observations}
        setObservations={setObservations}
      />

      {/* Actions */}
      <div className="bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 border-2 border-slate-600/50 bg-slate-700/50 text-slate-200 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-slate-600/50 hover:border-slate-500/50 transition-all hover:scale-[1.02] active:scale-95"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
            Cancelar
          </button>
          
          <button
            onClick={onBack}
            className="flex-1 flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 border-2 border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-blue-500/20 hover:border-blue-400/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Voltar
          </button>
          
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white text-sm sm:text-base font-bold rounded-lg sm:rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            Confirmar Alocação
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmStep