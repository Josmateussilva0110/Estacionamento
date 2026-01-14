import { useState, useEffect } from "react"
import { User, AlertCircle, X, Car, Bike, Truck, Users } from "lucide-react"
import { type VehicleType } from "../utils/vehicleUtils"
import { type ClientVehicle } from "../../../../types/client/clientVehicle"
import { useUser } from "../../../../context/useUser"
import { requestData } from "../../../../services/requestApi"
import useFlashMessage from "../../../../hooks/useFlashMessage"
import { type Spots } from "../../../../types/parking/spots"
import { type ListSpotsData } from "../../../../types/parking/spotsList"
import { type Parking } from "../../../../types/parking/parking"
import { type ListParkingsData } from "../../../../types/parking/listParkingData"
import { SearchSelect } from "../../../ui/ClientSearch"
import { type SelectedSpotInfo } from "../types/selectedSpot"

interface SelectSpotStepProps {
  selectedClient: ClientVehicle | null
  vehicleType: VehicleType
  setVehicleType: (type: VehicleType) => void
  filterFloor: string
  setFilterFloor: (floor: string) => void
  onSpotSelect: (spotInfo: SelectedSpotInfo) => void
  onChangeClient: () => void
}

function SelectSpotStep({
  selectedClient,
  onSpotSelect,
  onChangeClient
}: SelectSpotStepProps) {
  const { user } = useUser()
  const { setFlashMessage } = useFlashMessage()
  const [isLoadingSpots, setIsLoadingSpots] = useState<boolean>(false)
  const [isLoadingParkings, setIsLoadingParkings] = useState<boolean>(false)
  const [spotsData, setSpotsData] = useState<Spots | null>(null)
  const [parkings, setParkings] = useState<Parking[]>([])
  const [selectedParking, setSelectedParking] = useState<Parking | null>(null)



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
      console.log(response)
      
      if (response.success && response.data?.parking) {
        setParkings(response.data.parking)
      } else {
        setParkings([])
      }
      
      setIsLoadingParkings(false)
    }
    
    fetchParking()
  }, [user, setFlashMessage])


  const getAvailableSpots = (type: VehicleType | "pcd" | "elderly"): number => {
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

  const handleSpotSelection = (type: VehicleType | "pcd" | "elderly") => {
    if (!spotsData || !selectedParking) return

    const available = getAvailableSpots(type)
    if (available > 0) {
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
    <div className="space-y-6">
      {/* Header com info do cliente */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Cliente selecionado</p>
              <p className="text-lg font-bold text-gray-800">{selectedClient?.name}</p>
            </div>
          </div>
          <button
            onClick={onChangeClient}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
          >
            <X size={16} />
            Alterar
          </button>
        </div>
      </div>

      <SearchSelect<Parking, number>
        label="Estacionamento"
        placeholder="Buscar pelo nome"
        isLoading={isLoadingParkings}

        items={parkings}
        value={selectedParking?.id ?? null}
        onChange={(id) => {
          const parking = parkings.find(p => p.id === id) || null
          setSelectedParking(parking)
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

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Selecione o Tipo de Vaga
        </h2>
        <p className="text-gray-600">
          Escolha o tipo de vaga disponível para o veículo
        </p>
      </div>

      {isLoadingSpots ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando vagas disponíveis...</p>
        </div>
      ) : !spotsData ? (
        <div className="text-center py-12 text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>Nenhuma informação de vagas disponível</p>
        </div>
      ) : (
        <>
          {/* Vehicle Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Carros */}
            <button
              onClick={() => handleSpotSelection("car")}
              disabled={spotsData.carSpots === 0}
              className={`p-4 rounded-xl border-2 transition-all ${
                spotsData.carSpots > 0
                  ? "bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-400 hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  spotsData.carSpots > 0 ? "bg-green-200" : "bg-gray-200"
                }`}>
                  <Car className="w-6 h-6 text-gray-700" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-base text-gray-800">Carros</p>
                  <p className={`text-2xl font-bold mt-1 ${
                    spotsData.carSpots > 0 ? "text-green-600" : "text-gray-400"
                  }`}>
                    {spotsData.carSpots}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {spotsData.carSpots === 1 ? "vaga disponível" : "vagas disponíveis"}
                  </p>
                </div>
              </div>
            </button>

            {/* Motos */}
            <button
              onClick={() => handleSpotSelection("moto")}
              disabled={spotsData.motoSpots === 0}
              className={`p-4 rounded-xl border-2 transition-all ${
                spotsData.motoSpots > 0
                  ? "bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-400 hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  spotsData.motoSpots > 0 ? "bg-green-200" : "bg-gray-200"
                }`}>
                  <Bike className="w-6 h-6 text-gray-700" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-base text-gray-800">Motos</p>
                  <p className={`text-2xl font-bold mt-1 ${
                    spotsData.motoSpots > 0 ? "text-green-600" : "text-gray-400"
                  }`}>
                    {spotsData.motoSpots}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {spotsData.motoSpots === 1 ? "vaga disponível" : "vagas disponíveis"}
                  </p>
                </div>
              </div>
            </button>

            {/* Caminhões */}
            <button
              onClick={() => handleSpotSelection("truck")}
              disabled={spotsData.truckSpots === 0}
              className={`p-4 rounded-xl border-2 transition-all ${
                spotsData.truckSpots > 0
                  ? "bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-400 hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  spotsData.truckSpots > 0 ? "bg-green-200" : "bg-gray-200"
                }`}>
                  <Truck className="w-6 h-6 text-gray-700" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-base text-gray-800">Caminhões</p>
                  <p className={`text-2xl font-bold mt-1 ${
                    spotsData.truckSpots > 0 ? "text-green-600" : "text-gray-400"
                  }`}>
                    {spotsData.truckSpots}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {spotsData.truckSpots === 1 ? "vaga disponível" : "vagas disponíveis"}
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Vagas Especiais */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Vagas Especiais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PCD */}
              <button
                onClick={() => handleSpotSelection("pcd" as VehicleType)}
                disabled={spotsData.pcdSpots === 0}
                className={`p-4 rounded-xl border-2 transition-all ${
                  spotsData.pcdSpots > 0
                    ? "bg-blue-50 border-blue-300 hover:bg-blue-100 hover:border-blue-400 hover:shadow-lg cursor-pointer"
                    : "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    spotsData.pcdSpots > 0 ? "bg-blue-200" : "bg-gray-200"
                  }`}>
                    <User className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-base text-gray-800">PCD</p>
                    <div className="flex items-baseline gap-2">
                      <p className={`text-2xl font-bold ${
                        spotsData.pcdSpots > 0 ? "text-blue-600" : "text-gray-400"
                      }`}>
                        {spotsData.pcdSpots}
                      </p>
                      <p className="text-xs text-gray-600">
                        {spotsData.pcdSpots === 1 ? "vaga" : "vagas"}
                      </p>
                    </div>
                  </div>
                </div>
              </button>

              {/* Idosos */}
              <button
                onClick={() => handleSpotSelection("elderly" as VehicleType)}
                disabled={spotsData.elderlySpots === 0}
                className={`p-4 rounded-xl border-2 transition-all ${
                  spotsData.elderlySpots > 0
                    ? "bg-purple-50 border-purple-300 hover:bg-purple-100 hover:border-purple-400 hover:shadow-lg cursor-pointer"
                    : "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    spotsData.elderlySpots > 0 ? "bg-purple-200" : "bg-gray-200"
                  }`}>
                    <Users className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-base text-gray-800">Idosos</p>
                    <div className="flex items-baseline gap-2">
                      <p className={`text-2xl font-bold ${
                        spotsData.elderlySpots > 0 ? "text-purple-600" : "text-gray-400"
                      }`}>
                        {spotsData.elderlySpots}
                      </p>
                      <p className="text-xs text-gray-600">
                        {spotsData.elderlySpots === 1 ? "vaga" : "vagas"}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Total de Vagas */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600">Total de vagas no estacionamento</p>
            <p className="text-2xl font-bold text-gray-800">{spotsData.totalSpots}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default SelectSpotStep
