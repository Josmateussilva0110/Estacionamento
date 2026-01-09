import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Car,
  Bike,
  Truck,
  User,
  Phone,
  CreditCard,
  MapPin,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Calendar,
  Filter,
  X,
  ChevronDown,
  UserPlus
} from "lucide-react"

import { useUser } from "../../../context/useUser"
import { type ClientVehicle } from "../../../types/client/clientVehicle"
import { requestData } from "../../../services/requestApi"
import useFlashMessage from "../../../hooks/useFlashMessage"
import { type ListClientsVehicleData } from "../../../types/client/listClientVehicle"



// Mock data - substituir por dados reais da API
const mockParkingSpots = [
  { id: 1, number: "A-01", type: "car", status: "available", floor: "Térreo" },
  { id: 2, number: "A-02", type: "car", status: "occupied", floor: "Térreo" },
  { id: 3, number: "A-03", type: "car", status: "available", floor: "Térreo" },
  { id: 4, number: "A-04", type: "car", status: "reserved", floor: "Térreo" },
  { id: 5, number: "B-01", type: "moto", status: "available", floor: "Térreo" },
  { id: 6, number: "B-02", type: "moto", status: "available", floor: "Térreo" },
  { id: 7, number: "C-01", type: "truck", status: "available", floor: "1º Andar" },
  { id: 8, number: "C-02", type: "truck", status: "occupied", floor: "1º Andar" },
]


type VehicleType = "car" | "moto" | "truck"
//type SpotStatus = "available" | "occupied" | "reserved"

function ParkingAllocation() {
  const { user } = useUser()
  const { setFlashMessage } = useFlashMessage()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [step, setStep] = useState<"search" | "select-spot" | "confirm">("search")
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


  // Cliente
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null)
  const [vehicleType, setVehicleType] = useState<VehicleType>("car")

  // Vaga
  const [selectedSpot, setSelectedSpot] = useState<typeof mockParkingSpots[0] | null>(null)
  const [filterType, setFilterType] = useState<VehicleType | "all">("all")
  const [filterFloor, setFilterFloor] = useState<string>("all")

  // Entrada
  const [entryDate, setEntryDate] = useState(new Date().toISOString().slice(0, 16))
  const [observations, setObservations] = useState("")

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  )

  const filteredSpots = mockParkingSpots.filter(spot => {
    const matchType = filterType === "all" || spot.type === filterType
    const matchFloor = filterFloor === "all" || spot.floor === filterFloor
    const matchStatus = spot.status === "available"
    return matchType && matchFloor && matchStatus
  })

  const floors = [...new Set(mockParkingSpots.map(s => s.floor))]

  const getVehicleIcon = (type: VehicleType) => {
    switch (type) {
      case "car": return <Car className="w-5 h-5" />
      case "moto": return <Bike className="w-5 h-5" />
      case "truck": return <Truck className="w-5 h-5" />
    }
  }

  const getVehicleLabel = (type: VehicleType) => {
    switch (type) {
      case "car": return "Carro"
      case "moto": return "Moto"
      case "truck": return "Caminhonete"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-700 border-green-300"
      case "occupied": return "bg-red-100 text-red-700 border-red-300"
      case "reserved": return "bg-yellow-100 text-yellow-700 border-yellow-300"
      default: return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available": return "Disponível"
      case "occupied": return "Ocupada"
      case "reserved": return "Reservada"
      default: return "Desconhecido"
    }
  }

  function handleClientSelect(client: typeof clients[0]) {
    setSelectedClient(client)
    setStep("select-spot")
  }

  function handleSpotSelect(spot: typeof mockParkingSpots[0]) {
    setSelectedSpot(spot)
    setStep("confirm")
  }

  function handleConfirm() {
    // Aqui faria a requisição para a API
    console.log({
      client: selectedClient,
      spot: selectedSpot,
      vehicleType,
      entryDate,
      observations
    })
    alert("Alocação realizada com sucesso!")
    navigate("/parking/allocations")
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
        {/* Header */}
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
                onClick={() => navigate("/parking/allocations")}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                <ArrowLeft size={18} />
                Voltar
              </button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step === "search" ? "bg-blue-600 text-white scale-110" :
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step === "select-spot" ? "bg-blue-600 text-white scale-110" :
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step === "confirm" ? "bg-blue-600 text-white scale-110" : "bg-gray-200 text-gray-500"
                  }`}>
                  3
                </div>
                <span className={`text-sm font-medium ${step === "confirm" ? "text-blue-600" : "text-gray-500"}`}>
                  Confirmar
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {/* STEP 1: Buscar Cliente */}
            {step === "search" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Selecione o Cliente
                  </h2>
                  <p className="text-gray-600">
                    Busque por nome, telefone ou placa do veículo
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Digite nome, telefone ou placa..."
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg disabled:opacity-60"
                  />
                </div>

                {/* New Client Button */}
                <button
                  onClick={() => navigate("/client/register")}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-60"
                >
                  <UserPlus size={20} />
                  Cadastrar Novo Cliente
                </button>

                {/* Client List */}
                <div className="space-y-3">
                  {/* LOADING */}
                  {isLoading && (
                    <>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={index}
                          className="w-full p-5 bg-slate-100 border-2 border-slate-200 rounded-xl animate-pulse"
                        >
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-slate-300 rounded-full" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-slate-300 rounded w-1/2" />
                              <div className="h-3 bg-slate-300 rounded w-1/3" />
                              <div className="h-3 bg-slate-300 rounded w-1/4" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* EMPTY STATE */}
                  {!isLoading && filteredClients.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <User className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>Nenhum cliente encontrado</p>
                    </div>
                  )}

                  {/* LIST */}
                  {!isLoading &&
                    filteredClients.map((client) => (
                      <button
                        key={client.id}
                        onClick={() => handleClientSelect(client)}
                        className="w-full p-5 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all text-left group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
                              <User className="w-6 h-6 text-blue-600" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-gray-800 mb-1">
                                {client.name}
                              </h3>

                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  {client.phone}
                                </div>

                                <div className="flex items-center gap-2">
                                  <CreditCard className="w-4 h-4" />
                                  {client.plate}
                                </div>

                                <div className="flex items-center gap-2">
                                  <Car className="w-4 h-4" />
                                  {client.vehicle}
                                </div>
                              </div>
                            </div>
                          </div>

                          <ChevronDown className="w-5 h-5 text-gray-400 transform -rotate-90 group-hover:text-blue-600" />
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}


            {/* STEP 2: Selecionar Vaga */}
            {step === "select-spot" && (
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
                      onClick={() => setStep("search")}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                    >
                      <X size={16} />
                      Alterar
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Selecione a Vaga
                  </h2>
                  <p className="text-gray-600">
                    Escolha uma vaga disponível para o veículo
                  </p>
                </div>

                {/* Vehicle Type Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tipo de Veículo
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["car", "moto", "truck"] as VehicleType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setVehicleType(type)
                          setFilterType(type)
                        }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${vehicleType === type
                            ? "bg-blue-50 border-blue-500 text-blue-700"
                            : "bg-slate-50 border-slate-200 text-gray-600 hover:border-slate-300"
                          }`}
                      >
                        {getVehicleIcon(type)}
                        <span className="font-semibold text-sm">{getVehicleLabel(type)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3 items-center">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={filterFloor}
                    onChange={(e) => setFilterFloor(e.target.value)}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="all">Todos os andares</option>
                    {floors.map(floor => (
                      <option key={floor} value={floor}>{floor}</option>
                    ))}
                  </select>
                </div>

                {/* Spots Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredSpots.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-500">
                      <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>Nenhuma vaga disponível com os filtros selecionados</p>
                    </div>
                  ) : (
                    filteredSpots.map((spot) => (
                      <button
                        key={spot.id}
                        onClick={() => handleSpotSelect(spot)}
                        disabled={spot.status !== "available"}
                        className={`p-5 rounded-xl border-2 transition-all ${spot.status === "available"
                            ? "bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-400 hover:shadow-lg transform hover:-translate-y-1"
                            : getStatusColor(spot.status)
                          } disabled:cursor-not-allowed disabled:hover:transform-none`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${spot.status === "available" ? "bg-green-200" : "bg-gray-200"
                            }`}>
                            {getVehicleIcon(spot.type as VehicleType)}
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-lg">{spot.number}</p>
                            <p className="text-xs text-gray-600">{spot.floor}</p>
                            <span className={`text-xs font-semibold mt-1 inline-block px-2 py-1 rounded ${spot.status === "available" ? "bg-green-200 text-green-800" : ""
                              }`}>
                              {getStatusLabel(spot.status)}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: Confirmar */}
            {step === "confirm" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Confirmar Alocação
                  </h2>
                  <p className="text-gray-600">
                    Revise as informações antes de finalizar
                  </p>
                </div>

                {/* Summary Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Cliente */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">Cliente</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Nome:</span> {selectedClient?.name}</p>
                      <p><span className="font-semibold">Telefone:</span> {selectedClient?.phone}</p>
                      <p><span className="font-semibold">Placa:</span> {selectedClient?.plate}</p>
                      <p><span className="font-semibold">Veículo:</span> {selectedClient?.vehicle}</p>
                    </div>
                  </div>

                  {/* Vaga */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">Vaga</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Número:</span> {selectedSpot?.number}</p>
                      <p><span className="font-semibold">Tipo:</span> {getVehicleLabel(selectedSpot?.type as VehicleType)}</p>
                      <p><span className="font-semibold">Andar:</span> {selectedSpot?.floor}</p>
                      <p><span className="font-semibold">Status:</span> Disponível</p>
                    </div>
                  </div>
                </div>

                {/* Entry Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Data e Hora de Entrada
                    </label>
                    <input
                      type="datetime-local"
                      value={entryDate}
                      onChange={(e) => setEntryDate(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Observações (opcional)
                    </label>
                    <textarea
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                      placeholder="Ex: Cliente solicitou vaga próxima à saída"
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={resetAllocation}
                    className="flex-1 px-6 py-4 border-2 border-gray-300 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setStep("select-spot")}
                    className="flex-1 px-6 py-4 border-2 border-blue-300 bg-blue-50 text-blue-700 font-semibold rounded-xl hover:bg-blue-100 transition-all"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-6 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={20} />
                    Confirmar Alocação
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkingAllocation
