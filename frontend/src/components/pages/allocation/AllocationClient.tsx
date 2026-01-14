import { useState, useEffect } from "react"
import Header from "../allocation/Header"
import ProgressSteps from "../allocation/ProgressSteps"
import SearchClientStep from "../allocation/steps/StepSearchClient"
import SelectSpotStep from "../allocation/steps/StepSelectSpot"
import ConfirmStep from "../allocation/steps/StepConfirmAllocation"
import { type VehicleType } from "../allocation/utils/vehicleUtils"
import { type Step } from "../allocation/types/index"
import { useUser } from "../../../context/useUser"
import { type ClientVehicle } from "../../../types/client/clientVehicle"
import { requestData } from "../../../services/requestApi"
import useFlashMessage from "../../../hooks/useFlashMessage"
import { type ListClientsVehicleData } from "../../../types/client/listClientVehicle"
import { mapVehicleTypeToApi } from "../allocation/utils/vehicleUtils"

// Novo tipo para a vaga selecionada (vindo da API)
interface SelectedSpotInfo {
  type: VehicleType | "pcd" | "elderly"
  parkingId: string
}

function ParkingAllocation() {
  const { user } = useUser()
  const { setFlashMessage } = useFlashMessage()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [step, setStep] = useState<Step>("search")
  const [clients, setClients] = useState<ClientVehicle[]>([])

  useEffect(() => {
    if (!user) {
      setFlashMessage("Usuário não autenticado", "error")
      return
    }
    async function fetchClientVehicle() {
      setIsLoading(true)
      const response = await requestData<ListClientsVehicleData>(`/clients/vehicle/${user?.id}`, "GET", {}, true)
      if (response.success && response.data?.clients) {
        setClients(response.data.clients)
      }
      else {
        setClients([])
      }
      setIsLoading(false)
    }
    fetchClientVehicle()
  }, [user, setFlashMessage])

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedClient, setSelectedClient] = useState<ClientVehicle | null>(null)
  const [vehicleType, setVehicleType] = useState<VehicleType>("car")

  const [selectedSpot, setSelectedSpot] = useState<SelectedSpotInfo | null>(null)
  const [filterFloor, setFilterFloor] = useState<string>("all")

  // Entrada
  const [entryDate, setEntryDate] = useState<string>(new Date().toISOString().slice(0, 16))
  const [observations, setObservations] = useState<string>("")

  function handleClientSelect(client: ClientVehicle) {
    setSelectedClient(client)
    setStep("select-spot")
  }

 
  function handleSpotSelect(spotInfo: SelectedSpotInfo) {
    setSelectedSpot(spotInfo)
    setStep("confirm")
  }

  function handleConfirm() {
    if (!selectedClient || !selectedSpot) return

    const payload = {
      client_id: selectedClient.id,
      parking_id: selectedSpot.parkingId,
      vehicle_type: mapVehicleTypeToApi(vehicleType), 
      entry_date: entryDate,
      observations,
    }

    console.log(payload)

    // await requestData("/allocations", "POST", payload, true)

    alert("Alocação realizada com sucesso!")
    resetAllocation()
  }


  function resetAllocation() {
    setStep("search")
    setSelectedClient(null)
    setSelectedSpot(null)
    setSearchTerm("")
    setObservations("")
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-600 via-blue-700 to-blue-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Header onBack={() => alert("Voltando...")} />

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <ProgressSteps 
            step={step} 
            selectedClient={selectedClient} 
            selectedSpot={selectedSpot} 
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {step === "search" && (
              <SearchClientStep
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                clients={clients}
                isLoading={isLoading}
                onClientSelect={handleClientSelect}
              />
            )}

            {step === "select-spot" && (
              <SelectSpotStep
                selectedClient={selectedClient}
                vehicleType={vehicleType}
                setVehicleType={setVehicleType}
                filterFloor={filterFloor}
                setFilterFloor={setFilterFloor}
                onSpotSelect={handleSpotSelect}
                onChangeClient={() => {
                  setSelectedSpot(null) 
                  setStep("search")
                }}
              />
            )}

            {step === "confirm" && (
              <ConfirmStep
                selectedClient={selectedClient}
                selectedSpot={selectedSpot}
                entryDate={entryDate}
                setEntryDate={setEntryDate}
                observations={observations}
                setObservations={setObservations}
                onConfirm={handleConfirm}
                onCancel={resetAllocation}
                onBack={() => {
                  setSelectedSpot(null) 
                  setStep("select-spot")
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkingAllocation
