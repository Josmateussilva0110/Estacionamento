import { useState, useEffect } from "react"
import { 
  User, 
  AlertCircle, 
  X,  
  MapPin,
  CheckCircle2,
  Building2,
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
import PaymentTypeSelector from "./components/PaymentTypeSelector"
import SpotSelector from "./components/SpotSelector"

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
    <div className="min-h-screen px-3 sm:px-4 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Client Info Card */}
        <div className="relative overflow-hidden bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/50">
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-blue-600/20 to-indigo-600/20" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="relative px-4 sm:px-8 py-6 sm:py-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-xl sm:rounded-2xl blur-xl" />
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-blue-500/20 backdrop-blur-xl rounded-xl sm:rounded-2xl flex items-center justify-center border border-blue-400/30">
                    <User className="w-7 h-7 sm:w-8 sm:h-8 text-blue-300" />
                  </div>
                </div>
                <div>
                  <p className="text-blue-200 text-xs sm:text-sm font-medium mb-1">
                    Cliente Selecionado
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {selectedClient?.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 text-xs sm:text-sm font-medium">
                      Confirmado
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onChangeClient}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-slate-700/50 hover:bg-slate-700/80 backdrop-blur-xl text-white font-semibold rounded-xl transition-all border border-slate-600/50 hover:scale-105"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Alterar Cliente</span>
                <span className="xs:hidden">Alterar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Parking Selection */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-indigo-400/30">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Selecione o Estacionamento
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
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
            <div className="mt-3 sm:mt-4 flex items-center gap-2 px-4 py-3 bg-red-500/20 border-2 border-red-500/30 rounded-xl text-sm text-red-300">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>{parkingError}</span>
            </div>
          )}

          {selectedParking && (
            <div className="mt-3 sm:mt-4 flex items-center gap-2 px-4 py-3 bg-emerald-500/20 border-2 border-emerald-500/30 rounded-xl">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-emerald-300 truncate">
                  {selectedParking.parkingName}
                </p>
                <p className="text-xs text-emerald-400">
                  Gerente: {selectedParking.managerName}
                </p>
              </div>
            </div>
          )}
        </div>


        {/* Payment Type Selection */}
        {setPaymentType && (
          <PaymentTypeSelector
            paymentType={paymentType}
            setPaymentType={setPaymentType}
          />
        )}

        {/* Spot Selection */}
        <SpotSelector
          spotsData={spotsData}
          isLoadingSpots={isLoadingSpots}
          onSpotSelect={handleSpotSelection}
        />
      </div>
    </div>
  )
}

export default SelectSpotStep
