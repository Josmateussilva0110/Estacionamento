import { Calendar, Clock, FileText } from "lucide-react"

interface EntryDetailsProps {
  entryDate: string
  setEntryDate: (date: string) => void
  observations: string
  setObservations: (obs: string) => void
}

function EntryDetails({
  entryDate,
  setEntryDate,
  observations,
  setObservations
}: EntryDetailsProps) {
  return (
    <div className="bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50 p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Detalhes da Entrada
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Configure data, hora e observações
          </p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2 sm:mb-3">
            <Calendar className="w-4 h-4" />
            Data e Hora de Entrada
          </label>
          <input
            type="datetime-local"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="w-full px-4 py-3 sm:py-4 bg-slate-700/50 border-2 border-slate-600/50 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base text-white"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2 sm:mb-3">
            <FileText className="w-4 h-4" />
            Observações
            <span className="text-xs text-slate-400 font-normal">(opcional)</span>
          </label>
          <textarea
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            placeholder="Ex: Cliente solicitou vaga próxima à saída, veículo com arranhão na porta traseira, etc."
            rows={4}
            className="w-full px-4 py-3 sm:py-4 bg-slate-700/50 border-2 border-slate-600/50 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all text-base text-white placeholder:text-slate-400"
          />
          <p className="mt-2 text-xs text-slate-400">
            Adicione informações relevantes sobre a alocação ou o veículo
          </p>
        </div>
      </div>
    </div>
  )
}

export default EntryDetails
