import { Search, User, Phone, CreditCard, Car, ChevronDown, UserPlus } from "lucide-react"
import { type ClientVehicle } from "../../../../types/client/clientVehicle"
interface SearchClientStepProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  clients: ClientVehicle[]
  isLoading: boolean
  onClientSelect: (client: ClientVehicle) => void
  onNewClient: () => void
}

function SearchClientStep({ 
  searchTerm, 
  setSearchTerm, 
  clients, 
  isLoading, 
  onClientSelect,
  onNewClient 
}: SearchClientStepProps) {
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  )

  return (
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

      {/* New ClientVehicle Button */}
      <button
        onClick={onNewClient}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-60"
      >
        <UserPlus size={20} />
        Cadastrar Novo Cliente
      </button>

      {/* ClientVehicle List */}
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
              onClick={() => onClientSelect(client)}
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
  )
}

export default SearchClientStep
