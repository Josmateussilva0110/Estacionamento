import { useState, useRef, useEffect } from "react"
import { X, User } from "lucide-react"
import { type ClientDetails } from "../../types/client/clientDetail"

interface ClientSearchProps {
  clients: ClientDetails[]
  value: number | null
  onChange: (clientId: number | null) => void
  label?: string
  error?: string
  isLoading?: boolean
}

export function ClientSearch({
  clients,
  value,
  onChange,
  label,
  error,
  isLoading = false,
}: ClientSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedClient, setSelectedClient] =
    useState<ClientDetails | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const hasClients = clients.length > 0


  useEffect(() => {
    const client = clients.find((c) => c.id === value) || null
    setSelectedClient(client)

    if (client) {
      setSearchTerm(client.username)
    }
  }, [value, clients])

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredClients = clients.filter(
    (client) =>
      client.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cpf.includes(searchTerm)
  )

  function handleSelect(client: ClientDetails) {
    setSelectedClient(client)
    setSearchTerm(client.username)
    onChange(client.id)
    setIsOpen(false)
  }

  function handleClear() {
    setSelectedClient(null)
    setSearchTerm("")
    onChange(null)
    setIsOpen(false)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSearchTerm(value)

    if (!value) {
      onChange(null)
      setSelectedClient(null)
    }

    setIsOpen(true)
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
            disabled={isLoading || !hasClients}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => hasClients && setIsOpen(true)}
            placeholder={
              isLoading
                ? "Carregando clientes..."
                : !hasClients
                ? "Nenhum cliente cadastrado"
                : "Buscar cliente por nome ou CPF..."
            }
            className={`
              w-full pl-10 pr-10 py-2.5 
              border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${error ? "border-red-500" : "border-gray-300"}
              ${selectedClient ? "bg-blue-50" : "bg-white"}
              ${!hasClients ? "bg-gray-100 cursor-not-allowed" : ""}
            `}
          />

          {searchTerm && hasClients && (
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
        {isOpen && hasClients && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {isLoading && (
              <div className="p-4 text-center text-gray-500">
                Carregando clientes...
              </div>
            )}

            {!isLoading && filteredClients.length > 0 && (
              filteredClients.map((client) => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => handleSelect(client)}
                  className={`
                    w-full px-4 py-3 text-left hover:bg-blue-50
                    border-b border-gray-100 last:border-b-0
                    transition-colors
                    ${
                      selectedClient?.id === client.id
                        ? "bg-blue-100"
                        : ""
                    }
                  `}
                >
                  <div className="font-medium text-gray-900">
                    {client.username}
                  </div>
                  <div className="text-sm text-gray-500">
                    CPF: {client.cpf}
                  </div>
                </button>
              ))
            )}

            {!isLoading && filteredClients.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                Nenhum cliente encontrado
              </div>
            )}
          </div>
        )}
      </div>

      {!isLoading && !hasClients && (
        <p className="text-sm text-gray-500">
          Não há clientes cadastrados
        </p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {selectedClient && (
        <div className="text-sm text-green-600 flex items-center gap-1">
          <span>✓</span>
          <span>Cliente selecionado: {selectedClient.username}</span>
        </div>
      )}
    </div>
  )
}
