import { useState, useRef, useEffect } from "react"
import { X, User } from "lucide-react"

interface Client {
  id: string
  name: string
  cpf: string
}

interface ClientSearchProps {
  clients: Client[]
  value: string
  onChange: (clientId: string) => void
  label?: string
  error?: string
}

export function ClientSearch({ 
  clients, 
  value, 
  onChange, 
  label,
  error 
}: ClientSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const client = clients.find(c => c.id === value)
    setSelectedClient(client || null)
    if (client) {
      setSearchTerm(client.name)
    }
  }, [value, clients])


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.cpf.includes(searchTerm)
  )

  function handleSelect(client: Client) {
    setSelectedClient(client)
    setSearchTerm(client.name)
    onChange(client.id)
    setIsOpen(false)
  }

  function handleClear() {
    setSelectedClient(null)
    setSearchTerm("")
    onChange("")
    setIsOpen(false)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
    setIsOpen(true)
    if (!e.target.value) {
      onChange("")
      setSelectedClient(null)
    }
  }

  return (
    <div className="space-y-1" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder="Buscar cliente por nome ou CPF..."
            className={`
              w-full pl-10 pr-10 py-2.5 
              border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${selectedClient ? 'bg-blue-50' : 'bg-white'}
            `}
          />

          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-red-600"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && filteredClients.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredClients.map((client) => (
              <button
                key={client.id}
                type="button"
                onClick={() => handleSelect(client)}
                className={`
                  w-full px-4 py-3 text-left hover:bg-blue-50
                  border-b border-gray-100 last:border-b-0
                  transition-colors
                  ${selectedClient?.id === client.id ? 'bg-blue-100' : ''}
                `}
              >
                <div className="font-medium text-gray-900">{client.name}</div>
                <div className="text-sm text-gray-500">CPF: {client.cpf}</div>
              </button>
            ))}
          </div>
        )}

        {/* Nenhum resultado */}
        {isOpen && searchTerm && filteredClients.length === 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-500">
            Nenhum cliente encontrado
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {selectedClient && (
        <div className="text-sm text-green-600 flex items-center gap-1">
          <span>✓</span>
          <span>Cliente selecionado: {selectedClient.name}</span>
        </div>
      )}
    </div>
  )
}