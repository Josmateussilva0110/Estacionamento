import { useState } from "react"
import Header from "../../components/ParkingAllocation/Header"
import ProgressSteps from "../../components/ParkingAllocation/ProgressSteps"
import SearchClientStep from "../../components/ParkingAllocation/steps/SearchClientStep"
import SelectSpotStep from "../../components/ParkingAllocation/steps/SelectSpotStep"
import ConfirmStep from "../../components/ParkingAllocation/steps/ConfirmStep"

const mockClients = [
  { id: 1, name: "João Silva", phone: "(11) 98765-4321", plate: "ABC-1234", vehicle: "Honda Civic 2020" },
  { id: 2, name: "Maria Santos", phone: "(11) 97654-3210", plate: "XYZ-5678", vehicle: "Toyota Corolla 2021" },
  { id: 3, name: "Pedro Costa", phone: "(11) 96543-2109", plate: "DEF-9012", vehicle: "Yamaha Fazer 250" },
]

function ParkingAllocation() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState("search")
  const [clients] = useState(mockClients)

  // Cliente
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState(null)
  const [vehicleType, setVehicleType] = useState("car")

  // Vaga
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [filterType, setFilterType] = useState("all")
  const [filterFloor, setFilterFloor] = useState("all")

  // Entrada
  const [entryDate, setEntryDate] = useState(new Date().toISOString().slice(0, 16))
  const [observations, setObservations] = useState("")

  function handleClientSelect(client) {
    setSelectedClient(client)
    setStep("select-spot")
  }

  function handleSpotSelect(spot) {
    setSelectedSpot(spot)
    setStep("confirm")
  }

  function handleConfirm() {
    console.log({
      client: selectedClient,
      spot: selectedSpot,
      vehicleType,
      entryDate,
      observations
    })
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
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 py-8 px-4">
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
                onNewClient={() => alert("Cadastrar novo cliente")}
              />
            )}

            {step === "select-spot" && (
              <SelectSpotStep
                selectedClient={selectedClient}
                vehicleType={vehicleType}
                setVehicleType={setVehicleType}
                filterFloor={filterFloor}
                setFilterFloor={setFilterFloor}
                setFilterType={setFilterType}
                onSpotSelect={handleSpotSelect}
                onChangeClient={() => setStep("search")}
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
                onBack={() => setStep("select-spot")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkingAllocation
