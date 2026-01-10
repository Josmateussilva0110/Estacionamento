import { CheckCircle2 } from "lucide-react"

function ProgressSteps({ step, selectedClient, selectedSpot }) {
  return (
    <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
            step === "search" ? "bg-blue-600 text-white scale-110" :
            selectedClient ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
          }`}>
            {selectedClient ? <CheckCircle2 size={20} /> : "1"}
          </div>
          <span className={`text-sm font-medium ${step === "search" ? "text-blue-600" : "text-gray-500"}`}>
            Cliente
          </span>
        </div>

        <div className={`h-1 flex-1 mx-2 rounded ${selectedClient ? "bg-green-500" : "bg-gray-200"}`} />

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
            step === "select-spot" ? "bg-blue-600 text-white scale-110" :
            selectedSpot ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
          }`}>
            {selectedSpot ? <CheckCircle2 size={20} /> : "2"}
          </div>
          <span className={`text-sm font-medium ${step === "select-spot" ? "text-blue-600" : "text-gray-500"}`}>
            Vaga
          </span>
        </div>

        <div className={`h-1 flex-1 mx-2 rounded ${selectedSpot ? "bg-green-500" : "bg-gray-200"}`} />

        {/* Step 3 */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
            step === "confirm" ? "bg-blue-600 text-white scale-110" : "bg-gray-200 text-gray-500"
          }`}>
            3
          </div>
          <span className={`text-sm font-medium ${step === "confirm" ? "text-blue-600" : "text-gray-500"}`}>
            Confirmar
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProgressSteps
