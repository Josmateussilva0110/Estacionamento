import { MapPin, ArrowLeft, Activity } from "lucide-react"

interface HeaderProps {
  onBack: () => void
}

function Header({ onBack }: HeaderProps) {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-xl mb-4 sm:mb-6">
      <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 opacity-[0.97]" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-400/20 rounded-full blur-3xl" />

      <div className="relative px-4 sm:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/30 rounded-xl sm:rounded-2xl blur-xl" />
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/30 transition-all group-hover:scale-110">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">
                Alocar Cliente
              </h1>
              <p className="text-blue-100 text-sm sm:text-base flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Registre a entrada de veículos no estacionamento
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="
              group/btn
              flex items-center justify-center gap-2
              w-full sm:w-auto
              bg-white/20 hover:bg-white/30 
              backdrop-blur-xl 
              text-white font-semibold 
              px-5 sm:px-6 py-3 
              rounded-xl 
              transition-all 
              border border-white/30
              hover:scale-105 
              active:scale-95
              shadow-lg shadow-black/10
            "
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:-translate-x-1 transition-transform" />
            <span className="hidden xs:inline">Voltar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
