import { useState, useEffect } from "react"
import { 
  User, 
  AlertCircle, 
  X, 
  Car, 
  Bike, 
  Truck, 
  Users, 
  MapPin,
  CheckCircle2,
  Sparkles,
  Building2,
  Clock,
  Calendar,
  CalendarDays,
  DollarSign
} from "lucide-react"
import { type VehicleType } from "../utils/vehicleUtils"
import { type ClientVehicle } from "../../../../types/client/clientVehicle"
import { useUser } from "../../../../context/useUser"
import { requestData } from "../../../../services/requestApi"
import useFlashMessage from "../../../../hooks/useFlashMessage"
import { type Spots } from "../../../../types/parking/spots"
import { type ListSpotsData } from "../../../../types/parking/spotsList"
import { type Parking } from "../../../../types/parking/parking"
import { type ListParkingsData } from "../../../../types/parking/listParkingData"
import { SearchSelect } from "../../../ui/SelectSearch"
import { type SelectedSpotInfo } from "../types/selectedSpot"

export type PaymentType = "hour" | "day" | "month"

interface SelectSpotStepProps {
  selectedClient: ClientVehicle | null
  vehicleType: VehicleType
  setVehicleType: (type: VehicleType) => void
  filterFloor: string
  setFilterFloor: (floor: string) => void
  onSpotSelect: (spotInfo: SelectedSpotInfo) => void
  onChangeClient: () => void

  paymentType: PaymentType
  setPaymentType: (type: PaymentType) => void
}

function SelectSpotStep({
  selectedClient,
  setVehicleType,
  onSpotSelect,
  onChangeClient,
  paymentType,
  setPaymentType
}: SelectSpotStepProps) {
  const { user } = useUser()
  const { setFlashMessage } = useFlashMessage()
  const [isLoadingSpots, setIsLoadingSpots] = useState<boolean>(false)
  const [isLoadingParkings, setIsLoadingParkings] = useState<boolean>(false)
  const [spotsData, setSpotsData] = useState<Spots | null>(null)
  const [parkings, setParkings] = useState<Parking[]>([])
  const [selectedParking, setSelectedParking] = useState<Parking | null>(null)
  const [parkingError, setParkingError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setFlashMessage("Usuário não autenticado", "error")
      return
    }
    
    async function fetchParkingSpots() {
      setIsLoadingSpots(true)
      const response = await requestData<ListSpotsData>(`/allocation/spots/${user?.id}`, "GET", {}, true)
      
      if (response.success && response.data?.spots && response.data.spots.length > 0) {
        setSpotsData(response.data.spots[0])
      } else {
        setSpotsData(null)
        setFlashMessage("Nenhuma vaga disponível no momento", "warning")
      }
      
      setIsLoadingSpots(false)
    }
    
    fetchParkingSpots()
  }, [user, setFlashMessage])

  useEffect(() => {
    if (!user) {
      setFlashMessage("Usuário não autenticado", "error")
      return
    }
    
    async function fetchParking() {
      setIsLoadingParkings(true)
      const response = await requestData<ListParkingsData>(`/parking/names/${user?.id}`, "GET", {}, true)
      
      if (response.success && response.data?.parking) {
        setParkings(response.data.parking)
      } else {
        setParkings([])
      }
      
      setIsLoadingParkings(false)
    }
    
    fetchParking()
  }, [user, setFlashMessage])

  const getAvailableSpots = (type: VehicleType): number => {
    if (!spotsData) return 0
    
    switch (type) {
      case "car":
        return spotsData.carSpots
      case "moto":
        return spotsData.motoSpots
      case "truck":
        return spotsData.truckSpots
      case "pcd":
        return spotsData.pcdSpots
      case "elderly":
        return spotsData.elderlySpots
      default:
        return 0
    }
  }

  const handleSpotSelection = (type: VehicleType) => {
    if (!selectedParking) {
      setParkingError("Selecione um estacionamento antes de escolher a vaga.")
      return
    }

    if (!spotsData) return

    const available = getAvailableSpots(type)
    if (available > 0) {
      setParkingError(null)
      setVehicleType(type)

      onSpotSelect({
        type,
        parking: {
          id: selectedParking.id,
          name: selectedParking.parkingName,
        },
      })
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 px-3 sm:px-4 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Client Info Card */}
        <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/60">
          <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 opacity-[0.97]" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-400/20 rounded-full blur-3xl" />

          <div className="relative px-4 sm:px-8 py-6 sm:py-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 rounded-xl sm:rounded-2xl blur-xl" />
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/30">
                    <User className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-blue-100 text-xs sm:text-sm font-medium mb-1">
                    Cliente Selecionado
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {selectedClient?.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span className="text-emerald-200 text-xs sm:text-sm font-medium">
                      Confirmado
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onChangeClient}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/20 hover:bg-white/30 backdrop-blur-xl text-white font-semibold rounded-xl transition-all border border-white/30 hover:scale-105"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Alterar Cliente</span>
                <span className="xs:hidden">Alterar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Parking Selection */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/60 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                Selecione o Estacionamento
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Escolha onde o veículo será alocado
              </p>
            </div>
          </div>

          <SearchSelect<Parking, number>
            label="Estacionamento *"
            placeholder="Buscar pelo nome ou gerente"
            size="lg"
            isLoading={isLoadingParkings}
            items={parkings}
            value={selectedParking?.id ?? null}
            onChange={(id) => {
              const parking = parkings.find(p => p.id === id) || null
              setSelectedParking(parking)
              setParkingError(null)
            }}
            getId={(p) => p.id}
            getLabel={(p) => p.parkingName}
            filterBy={(p, search) =>
              p.parkingName.toLowerCase().includes(search.toLowerCase()) ||
              p.managerName.toLowerCase().includes(search.toLowerCase())
            }
            renderItem={(parking) => (
              <div>
                <div className="font-medium">{parking.parkingName}</div>
                <div className="text-xs text-gray-500">
                  Gerente: {parking.managerName}
                </div>
              </div>
            )}
          />

          {parkingError && (
            <div className="mt-3 sm:mt-4 flex items-center gap-2 px-4 py-3 bg-red-50 border-2 border-red-200 rounded-xl text-sm text-red-700">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>{parkingError}</span>
            </div>
          )}

          {selectedParking && (
            <div className="mt-3 sm:mt-4 flex items-center gap-2 px-4 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-emerald-800 truncate">
                  {selectedParking.parkingName}
                </p>
                <p className="text-xs text-emerald-600">
                  Gerente: {selectedParking.managerName}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Payment Type Selection */}
        {setPaymentType && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/60 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Tipo de Pagamento
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Escolha o período de cobrança
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* Hourly */}
              <button
                onClick={() => setPaymentType("hour")}
                className={`group relative overflow-hidden p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all ${
                  paymentType === "hour"
                    ? "bg-linear-to-br from-blue-50 to-indigo-50 border-blue-400 shadow-lg shadow-blue-500/20"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
                    paymentType === "hour"
                      ? "bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30"
                      : "bg-slate-200 group-hover:bg-slate-300"
                  }`}>
                    <Clock className={`w-6 h-6 sm:w-7 sm:h-7 ${
                      paymentType === "hour" ? "text-white" : "text-slate-600"
                    }`} />
                  </div>
                  <div className="text-center">
                    <p className={`font-bold text-base sm:text-lg ${
                      paymentType === "hour" ? "text-blue-700" : "text-slate-700"
                    }`}>
                      Por Hora
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Cobrança horária
                    </p>
                  </div>
                  {paymentType === "hour" && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                </div>
              </button>

              {/* Daily */}
              <button
                onClick={() => setPaymentType("day")}
                className={`group relative overflow-hidden p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all ${
                  paymentType === "day"
                    ? "bg-linear-to-br from-emerald-50 to-green-50 border-emerald-400 shadow-lg shadow-emerald-500/20"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
                    paymentType === "day"
                      ? "bg-linear-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30"
                      : "bg-slate-200 group-hover:bg-slate-300"
                  }`}>
                    <Calendar className={`w-6 h-6 sm:w-7 sm:h-7 ${
                      paymentType === "day" ? "text-white" : "text-slate-600"
                    }`} />
                  </div>
                  <div className="text-center">
                    <p className={`font-bold text-base sm:text-lg ${
                      paymentType === "day" ? "text-emerald-700" : "text-slate-700"
                    }`}>
                      Por Dia
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Diária completa
                    </p>
                  </div>
                  {paymentType === "day" && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                  )}
                </div>
              </button>

              {/* Monthly */}
              <button
                onClick={() => setPaymentType("month")}
                className={`group relative overflow-hidden p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all ${
                  paymentType === "month"
                    ? "bg-linear-to-br from-purple-50 to-pink-50 border-purple-400 shadow-lg shadow-purple-500/20"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
                    paymentType === "month"
                      ? "bg-linear-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30"
                      : "bg-slate-200 group-hover:bg-slate-300"
                  }`}>
                    <CalendarDays className={`w-6 h-6 sm:w-7 sm:h-7 ${
                      paymentType === "month" ? "text-white" : "text-slate-600"
                    }`} />
                  </div>
                  <div className="text-center">
                    <p className={`font-bold text-base sm:text-lg ${
                      paymentType === "month" ? "text-purple-700" : "text-slate-700"
                    }`}>
                      Por Mês
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Mensalidade
                    </p>
                  </div>
                  {paymentType === "month" && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600" />
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Info Banner */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-blue-800 font-medium">
                    {paymentType === "hour" && "A cobrança será calculada por hora de permanência no estacionamento."}
                    {paymentType === "day" && "Valor fixo por dia, independente do horário de entrada ou saída."}
                    {paymentType === "month" && "Mensalidade com acesso irrestrito durante todo o mês."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Spot Selection */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/60 p-4 sm:p-6">
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
                    onClick={() => handleSpotSelection("car")}
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
                    onClick={() => handleSpotSelection("moto")}
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
                    onClick={() => handleSpotSelection("truck")}
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
                    onClick={() => handleSpotSelection("pcd" as VehicleType)}
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
                    onClick={() => handleSpotSelection("elderly" as VehicleType)}
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
      </div>
    </div>
  )
}

export default SelectSpotStep