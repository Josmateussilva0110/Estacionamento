import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  User,
  Phone,
  Car,
  UserPlus,
  ChevronDown,
} from "lucide-react"
import { type ClientVehicle } from "../../../../types/client/clientVehicle"
import { type GroupedClientVehicle } from "../../../../types/client/GroupedClientVehicle"


interface SearchClientStepProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  clients: ClientVehicle[]
  isLoading: boolean
  onClientSelect: (client: ClientVehicle) => void
}

function SearchClientStep({
  searchTerm,
  setSearchTerm,
  clients,
  isLoading,
  onClientSelect,
}: SearchClientStepProps) {
  const navigate = useNavigate()

  const [expandedClientId, setExpandedClientId] = useState<number | null>(null)

  const handleNewClient = () => {
    navigate("/client/register")
  }

  const toggleClient = (clientId: number) => {
    setExpandedClientId(prev =>
      prev === clientId ? null : clientId
    )
  }


  const groupedClients: GroupedClientVehicle[] = Object.values(
    clients.reduce<Record<number, GroupedClientVehicle>>((acc, curr) => {
      if (!acc[curr.id]) {
        acc[curr.id] = {
          clientId: curr.id,
          name: curr.name,
          phone: curr.phone,
          vehicles: [curr],
        }
      } else {
        acc[curr.id].vehicles.push(curr)
      }
      return acc
    }, {})
  )


  const filteredClients = groupedClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.vehicles.some(vehicle =>
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Selecione o Cliente
        </h2>
        <p className="text-gray-600">
          Busque por nome, telefone ou placa do veículo
        </p>
      </div>

      {/* Search */}
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

      {/* New Client */}
      <button
        onClick={handleNewClient}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-60"
      >
        <UserPlus size={20} />
        Cadastrar Novo Cliente
      </button>

      {/* List */}
      <div className="space-y-4">
        {/* Loading */}
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="p-5 bg-slate-100 border-2 border-slate-200 rounded-xl animate-pulse"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-300 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-300 rounded w-1/2" />
                  <div className="h-3 bg-slate-300 rounded w-1/3" />
                </div>
              </div>
            </div>
          ))}

        {/* Empty */}
        {!isLoading && filteredClients.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>Nenhum cliente encontrado</p>
          </div>
        )}

        {/* Clients Accordion */}
        {!isLoading &&
          filteredClients.map(client => {
            const isExpanded = expandedClientId === client.clientId

            return (
              <div
                key={client.clientId}
                className="bg-slate-50 border-2 border-slate-200 rounded-xl overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleClient(client.clientId)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>

                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-800">
                        {client.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        {client.phone}
                      </div>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="space-y-2 px-4 pb-4 pl-16">
                    {client.vehicles.map(vehicle => (
                      <button
                        key={vehicle.plate}
                        onClick={() => onClientSelect(vehicle)}
                        className="w-full flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all text-left"
                      >
                        <Car className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-800">
                          {vehicle.plate}
                        </span>
                        <span className="text-sm text-gray-500">
                          {vehicle.vehicle}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default SearchClientStep
