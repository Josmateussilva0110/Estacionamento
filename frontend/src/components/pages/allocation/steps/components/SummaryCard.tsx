import { 
  User, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Car,
  Building2,
  Sparkles,
  DollarSign,
} from "lucide-react"
import { type ClientVehicle } from "../../../../../types/client/clientVehicle"
import { type VehicleType } from "../../utils/vehicleUtils"
import { type SelectedSpotInfo } from "../../types/selectedSpot"
import { formatPhone } from "../../../../../utils/formations"
import { type PaymentType } from "../../types/paymentType" 
import { PAYMENT_TYPE_LABEL } from "../../utils/paymentLabel"
import { getVehicleLabel } from "../../utils/vehicleUtils"

interface SummaryCardsProps {
  selectedClient: ClientVehicle
  selectedSpot: SelectedSpotInfo
  paymentType: PaymentType
}

function SummaryCards({
  selectedClient,
  selectedSpot,
  paymentType
}: SummaryCardsProps) {
  const getSpotTypeLabel = (type: VehicleType) => {
    return getVehicleLabel(type as VehicleType)
  }

  return (
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
  )
}

export default SummaryCards
