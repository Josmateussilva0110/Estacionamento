import {
  Sparkles,
  Car,
  Bike,
  Truck,
  User,
  Users,
  AlertCircle
} from "lucide-react"
import { type VehicleType } from "../../utils/vehicleUtils"
import { type Spots } from "../../types/spots"

interface SpotSelectorProps {
  spotsData: Spots | null
  isLoadingSpots: boolean
  onSpotSelect: (type: VehicleType) => void
  className?: string
}

function SpotSelector({
  spotsData,
  isLoadingSpots,
  onSpotSelect,
  className = ""
}: SpotSelectorProps) {
  return (
    <div className={`bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/60 p-4 sm:p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Tipo de Vaga
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Escolha a vaga disponível para o veículo
          </p>
        </div>
      </div>

      {isLoadingSpots ? (
        <div className="py-12 sm:py-16">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-slate-200 border-t-blue-600"></div>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Carregando vagas disponíveis...
            </p>
          </div>
        </div>
      ) : !spotsData ? (
        <div className="py-12 sm:py-16 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">
            Nenhuma vaga disponível
          </h3>
          <p className="text-sm sm:text-base text-slate-500">
            Não há informações de vagas no momento
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {/* Standard Spots */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-700 mb-3 sm:mb-4 flex items-center gap-2">
              <Car className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Vagas Padrão
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Cars */}
              <button
                type="button"
                onClick={() => onSpotSelect("car")}
                disabled={spotsData.carSpots === 0}
                className={`group relative overflow-hidden p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all ${
                  spotsData.carSpots > 0
                    ? "bg-linear-to-br from-emerald-50 to-green-50 border-emerald-300 hover:border-emerald-400 hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer"
                    : "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all ${
                    spotsData.carSpots > 0 
                      ? "bg-linear-to-br from-emerald-400 to-emerald-500 group-hover:scale-110 shadow-lg shadow-emerald-500/30" 
                      : "bg-slate-200"
                  }`}>
                    <Car className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-base sm:text-lg text-slate-800">
                      Carros
                    </p>
                    <p className={`text-3xl sm:text-4xl font-bold mt-1 ${
                      spotsData.carSpots > 0 ? "text-emerald-600" : "text-slate-400"
                    }`}>
                      {spotsData.carSpots}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {spotsData.carSpots === 1 ? "vaga disponível" : "vagas disponíveis"}
                    </p>
                  </div>
                </div>
              </button>

              {/* Motos */}
              <button
                type="button"
                onClick={() => onSpotSelect("moto")}
                disabled={spotsData.motoSpots === 0}
                className={`group relative overflow-hidden p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all ${
                  spotsData.motoSpots > 0
                    ? "bg-linear-to-br from-cyan-50 to-blue-50 border-cyan-300 hover:border-cyan-400 hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer"
                    : "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all ${
                    spotsData.motoSpots > 0 
                      ? "bg-linear-to-br from-cyan-400 to-cyan-500 group-hover:scale-110 shadow-lg shadow-cyan-500/30" 
                      : "bg-slate-200"
                  }`}>
                    <Bike className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-base sm:text-lg text-slate-800">
                      Motos
                    </p>
                    <p className={`text-3xl sm:text-4xl font-bold mt-1 ${
                      spotsData.motoSpots > 0 ? "text-cyan-600" : "text-slate-400"
                    }`}>
                      {spotsData.motoSpots}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {spotsData.motoSpots === 1 ? "vaga disponível" : "vagas disponíveis"}
                    </p>
                  </div>
                </div>
              </button>

              {/* Trucks */}
              <button
                type="button"
                onClick={() => onSpotSelect("truck")}
                disabled={spotsData.truckSpots === 0}
                className={`group relative overflow-hidden p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all ${
                  spotsData.truckSpots > 0
                    ? "bg-linear-to-br from-orange-50 to-amber-50 border-orange-300 hover:border-orange-400 hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer"
                    : "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all ${
                    spotsData.truckSpots > 0 
                      ? "bg-linear-to-br from-orange-400 to-orange-500 group-hover:scale-110 shadow-lg shadow-orange-500/30" 
                      : "bg-slate-200"
                  }`}>
                    <Truck className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-base sm:text-lg text-slate-800">
                      Caminhões
                    </p>
                    <p className={`text-3xl sm:text-4xl font-bold mt-1 ${
                      spotsData.truckSpots > 0 ? "text-orange-600" : "text-slate-400"
                    }`}>
                      {spotsData.truckSpots}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {spotsData.truckSpots === 1 ? "vaga disponível" : "vagas disponíveis"}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Special Spots */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-700 mb-3 sm:mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              Vagas Especiais
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* PCD */}
              <button
                type="button"
                onClick={() => onSpotSelect("pcd" as VehicleType)}
                disabled={spotsData.pcdSpots === 0}
                className={`group p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all ${
                  spotsData.pcdSpots > 0
                    ? "bg-linear-to-br from-blue-50 to-indigo-50 border-blue-300 hover:border-blue-400 hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer"
                    : "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all ${
                    spotsData.pcdSpots > 0 
                      ? "bg-linear-to-br from-blue-400 to-blue-500 group-hover:scale-110 shadow-lg shadow-blue-500/30" 
                      : "bg-slate-200"
                  }`}>
                    <User className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-base sm:text-lg text-slate-800 mb-1">
                      PCD
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className={`text-3xl sm:text-4xl font-bold ${
                        spotsData.pcdSpots > 0 ? "text-blue-600" : "text-slate-400"
                      }`}>
                        {spotsData.pcdSpots}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600">
                        {spotsData.pcdSpots === 1 ? "vaga" : "vagas"}
                      </p>
                    </div>
                  </div>
                </div>
              </button>

              {/* Elderly */}
              <button
                type="button"
                onClick={() => onSpotSelect("elderly" as VehicleType)}
                disabled={spotsData.elderlySpots === 0}
                className={`group p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all ${
                  spotsData.elderlySpots > 0
                    ? "bg-linear-to-br from-purple-50 to-pink-50 border-purple-300 hover:border-purple-400 hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer"
                    : "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all ${
                    spotsData.elderlySpots > 0 
                      ? "bg-linear-to-br from-purple-400 to-purple-500 group-hover:scale-110 shadow-lg shadow-purple-500/30" 
                      : "bg-slate-200"
                  }`}>
                    <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-base sm:text-lg text-slate-800 mb-1">
                      Idosos
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className={`text-3xl sm:text-4xl font-bold ${
                        spotsData.elderlySpots > 0 ? "text-purple-600" : "text-slate-400"
                      }`}>
                        {spotsData.elderlySpots}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600">
                        {spotsData.elderlySpots === 1 ? "vaga" : "vagas"}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpotSelector
