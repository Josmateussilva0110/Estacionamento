import { useEffect, useRef, useState } from "react"
import { Search, Loader2 } from "lucide-react"

export interface SearchSelectProps<T, V> {
  label?: string
  placeholder?: string

  items: T[]
  value: V | null
  onChange: (value: V | null) => void

  getId: (item: T) => V
  getLabel: (item: T) => string
  filterBy?: (item: T, search: string) => boolean

  renderItem?: (item: T) => React.ReactNode

  isLoading?: boolean
  disabled?: boolean
}

export function SearchSelect<T, V>({
  label,
  placeholder = "Buscar...",
  items,
  value,
  onChange,
  getId,
  getLabel,
  filterBy,
  renderItem,
  isLoading = false,
  disabled = false,
}: SearchSelectProps<T, V>) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedItem = items.find((i) => getId(i) === value)

  const filteredItems = items.filter((item) => {
    if (!search) return true
    return filterBy
      ? filterBy(item, search)
      : getLabel(item).toLowerCase().includes(search.toLowerCase())
  })

  // fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="space-y-1" ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

        <input
          type="text"
          disabled={disabled}
          value={open ? search : selectedItem ? getLabel(selectedItem) : ""}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value)
            setOpen(true)
          }}
          className="
            w-full pl-10 pr-10 py-2
            border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:outline-none
            disabled:bg-gray-100 disabled:cursor-not-allowed
          "
        />

        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
        )}
      </div>

      {open && (
        <div className="border border-blue-500 rounded-lg mt-1 max-h-56 overflow-auto bg-white shadow-lg z-50">
          {filteredItems.length === 0 && !isLoading && (
            <div className="px-4 py-2 text-sm text-gray-500">
              Nenhum resultado encontrado
            </div>
          )}

          {filteredItems.map((item) => {
            const id = getId(item)
            return (
              <button
                key={String(id)}
                type="button"
                onClick={() => {
                  onChange(id)
                  setSearch("")
                  setOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-blue-50"
              >
                {renderItem ? renderItem(item) : getLabel(item)}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}