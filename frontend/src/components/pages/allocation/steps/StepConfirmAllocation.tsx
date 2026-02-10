import { useEffect } from "react"
import { 
  CheckCircle2, 
  ArrowLeft,
  X,
} from "lucide-react"
import { type ClientVehicle } from "../../../../types/client/clientVehicle"
import { type SelectedSpotInfo } from "../types/selectedSpot"
import { type PaymentType } from "../AllocationClient" 
import EntryDetails from "./components/EntryDetails"
import SummaryCards from "./components/SummaryCard"

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
      <SummaryCards
        selectedClient={selectedClient}
        selectedSpot={selectedSpot}
        paymentType={paymentType}
      />

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