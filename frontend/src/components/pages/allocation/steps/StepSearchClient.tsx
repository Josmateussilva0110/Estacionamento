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
    <div className="min-h-screen px-3 sm:px-4 py-4 sm:py-8">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">

        {/* Search Section */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50 p-4 sm:p-6">
          <div className="relative mb-3 sm:mb-4">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nome, telefone ou placa..."
              disabled={isLoading}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-700/50 border-2 border-slate-600/50 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base text-white placeholder:text-slate-400 disabled:opacity-60"
            />
          </div>

          <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">
            {filteredClients.length} cliente{filteredClients.length !== 1 ? "s" : ""} encontrado{filteredClients.length !== 1 ? "s" : ""}
          </p>

          {/* New Client Button */}
          <button
            onClick={handleNewClient}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            Cadastrar Novo Cliente
          </button>
        </div>

        {/* Clients List */}
        <div className="space-y-3 sm:space-y-4">
          {/* Loading State */}
          {isLoading && (
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50 p-12 sm:p-16">
              <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-slate-700 border-t-blue-600"></div>
                <p className="text-slate-300 text-sm sm:text-base font-medium">Carregando clientes...</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredClients.length === 0 && (
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50 p-8 sm:p-16 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-700/50 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-200 mb-2">
                Nenhum cliente encontrado
              </h3>
              <p className="text-sm sm:text-base text-slate-400 mb-4 sm:mb-6">
                {searchTerm 
                  ? "Tente ajustar sua busca ou cadastre um novo cliente"
                  : "Comece cadastrando seu primeiro cliente"
                }
              </p>
            </div>
          )}

          {/* Clients Accordion */}
          {!isLoading &&
            filteredClients.map(client => {
              const isExpanded = expandedClientId === client.clientId

              return (
                <div
                  key={client.clientId}
                  className="group bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]"
                >
                  {/* Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleClient(client.clientId)}
                    className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-slate-700/30 transition-all"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0 border border-blue-400/30">
                        <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>

                      <div className="text-left min-w-0 flex-1">
                        <h3 className="text-base sm:text-xl font-bold text-white mb-0.5 sm:mb-1 truncate">
                          {client.name}
                        </h3>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-300">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                          <span className="truncate">{client.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
                      <span className="hidden sm:inline px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-semibold border border-blue-500/30">
                        {client.vehicles.length} veículo{client.vehicles.length !== 1 ? "s" : ""}
                      </span>
                      <span className="sm:hidden w-6 h-6 bg-blue-500/20 text-blue-300 rounded-md text-xs font-bold border border-blue-500/30 flex items-center justify-center">
                        {client.vehicles.length}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-slate-400 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isExpanded && (
                    <div className="space-y-2 sm:space-y-3 px-4 sm:px-6 pb-4 sm:pb-6 border-t border-slate-700/50 pt-3 sm:pt-4">
                      <p className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                        Selecione um veículo
                      </p>
                      {client.vehicles.map(vehicle => (
                        <button
                          key={vehicle.plate}
                          onClick={() => onClientSelect(vehicle)}
                          className="
                            group/vehicle
                            w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4
                            bg-slate-700/30 border-2 border-slate-600/50 
                            rounded-lg sm:rounded-xl 
                            hover:bg-blue-500/20
                            hover:border-blue-500/50 
                            transition-all duration-300
                            hover:shadow-md hover:shadow-blue-500/20
                            hover:scale-[1.02]
                            active:scale-95
                          "
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-700/50 rounded-lg sm:rounded-xl flex items-center justify-center border border-slate-600/50 group-hover/vehicle:border-blue-400/30 group-hover/vehicle:bg-blue-500/20 transition-all shrink-0">
                            <Car className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover/vehicle:text-blue-300 transition-colors" />
                          </div>
                          
                          <div className="flex-1 text-left min-w-0">
                            <span className="font-bold text-white text-base sm:text-lg block mb-0.5 truncate">
                              {vehicle.plate}
                            </span>
                            <span className="text-xs sm:text-sm text-slate-300 truncate block">
                              {vehicle.vehicle}
                            </span>
                          </div>

                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 -rotate-90 group-hover/vehicle:text-blue-300 transition-colors shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default SearchClientStep
