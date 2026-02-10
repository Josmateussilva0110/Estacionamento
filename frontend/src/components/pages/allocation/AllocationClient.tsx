import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
import { type SelectedSpotInfo } from "./types/selectedSpot"
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage"
import { type RegisterAllocationResponse } from "../../../types/allocation/allocationResponses"

export type PaymentType = "hour" | "day" | "month"


function ParkingAllocation() {
  const { user } = useUser()
  const navigate = useNavigate()
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
      console.log(response)

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

  function getLocalDateTimeForInput(): string {
    const now = new Date()
    const offset = now.getTimezoneOffset()
    const localDate = new Date(now.getTime() - offset * 60 * 1000)
    return localDate.toISOString().slice(0, 16)
  }


  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedClient, setSelectedClient] = useState<ClientVehicle | null>(null)
  const [vehicleType, setVehicleType] = useState<VehicleType>("car")
  const [paymentType, setPaymentType] = useState<PaymentType>("hour")

  const [selectedSpot, setSelectedSpot] = useState<SelectedSpotInfo | null>(null)
  const [filterFloor, setFilterFloor] = useState<string>("all")

  // Entrada
  const [entryDate, setEntryDate] = useState<string>(
    getLocalDateTimeForInput
  )

  const [observations, setObservations] = useState<string>("")

  function handleClientSelect(client: ClientVehicle) {
    setSelectedClient(client)
    setStep("select-spot")
  }

 
  function handleSpotSelect(spotInfo: SelectedSpotInfo) {
    setSelectedSpot(spotInfo)
    setStep("confirm")
  }

  function localInputToUTC(dateTimeLocal: string): string {
    return new Date(dateTimeLocal).toISOString()
  }


  async function handleConfirm() {
    if (!selectedClient || !selectedSpot) return

    const payload = {
      client_id: selectedClient.id,
      parking_id: selectedSpot.parking.id,
      vehicle_id: selectedClient.vehicle_id,
      vehicle_type: mapVehicleTypeToApi(vehicleType),
      payment_type: paymentType,
      entry_date: localInputToUTC(entryDate),
      observations,
    }


    //console.log(payload)

    const response = await requestData<RegisterAllocationResponse>("/allocation", "POST", payload, true)
    //console.log(response)
    if(response.success && response.data?.status) {
      setFlashMessage(response.data.message, "success")
      navigate('/parking/management')
    }
    else {
      setFlashMessage(
        getApiErrorMessage(response),
        "error"
      )
    }
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
      <div className="max-w-7xl mx-auto">
        <Header onBack={() => navigate("/")} />

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden mb-6">
          <ProgressSteps 
            step={step} 
            selectedClient={selectedClient} 
            selectedSpot={selectedSpot} 
          />
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
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
                paymentType={paymentType}
                setPaymentType={setPaymentType}
                onSpotSelect={handleSpotSelect}
                onChangeClient={() => {
                  setSelectedSpot(null)
                  setStep("search")
                }}
              />
            )}


          {step === "confirm" && selectedClient && selectedSpot && (
            <ConfirmStep
              selectedClient={selectedClient}
              selectedSpot={selectedSpot}
              paymentType={paymentType} 
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
  )
}

export default ParkingAllocation
