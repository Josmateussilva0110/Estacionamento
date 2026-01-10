import { MapPin, ArrowLeft } from "lucide-react"

function Header({ onBack }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
      <div className="bg-linear-to-r from-blue-600 to-blue-500 px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Alocar Cliente
              </h1>
              <p className="text-blue-100">
                Registre a entrada de veículos no estacionamento
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
