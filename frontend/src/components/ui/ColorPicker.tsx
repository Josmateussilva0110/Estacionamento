import { Check } from "lucide-react"

interface ColorOption {
  name: string
  color: string
}

interface ColorPickerProps {
  label?: string
  value: string
  onChange: (color: string) => void
  error?: string
}

const COLORS: ColorOption[] = [
  { name: "Preto", color: "#000000" },
  { name: "Branco", color: "#FFFFFF" },
  { name: "Prata", color: "#C0C0C0" },
  { name: "Cinza", color: "#808080" },
  { name: "Vermelho", color: "#DC2626" },
  { name: "Azul", color: "#2563EB" },
  { name: "Verde", color: "#16A34A" },
  { name: "Amarelo", color: "#EAB308" },
  { name: "Laranja", color: "#EA580C" },
  { name: "Marrom", color: "#92400E" },
]

export function ColorPicker({
  label = "Cor",
  value,
  onChange,
  error,
}: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} *
      </label>

      <div className="grid grid-cols-5 gap-3">
        {COLORS.map((option) => {
          const selected = value === option.name

          return (
            <button
              key={option.name}
              type="button"
              onClick={() => onChange(option.name)}
              title={option.name}
              className={`
                relative w-full aspect-square rounded-lg
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${
                  selected
                    ? "ring-4 ring-blue-500 scale-110"
                    : "ring-2 ring-gray-300 hover:ring-blue-400 hover:scale-105"
                }
              `}
              style={{ backgroundColor: option.color }}
            >
              {/* Borda extra para branco */}
              {option.name === "Branco" && (
                <div className="absolute inset-0 border-2 border-gray-200 rounded-lg pointer-events-none" />
              )}

              {/* Overlay + ícone animado */}
              <div
                className={`
                  absolute inset-0 flex items-center justify-center
                  rounded-lg
                  transition-all duration-200
                  ${
                    selected
                      ? "bg-black/30 opacity-100"
                      : "opacity-0"
                  }
                `}
              >
                <Check
                  className={`
                    text-white
                    transition-all duration-200
                    ${selected ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                  `}
                  size={26}
                  strokeWidth={3}
                />
              </div>
            </button>
          )
        })}
      </div>

      {value && (
        <p className="text-sm text-gray-600 mt-2">
          Cor selecionada: <span className="font-semibold">{value}</span>
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          ⚠ {error}
        </p>
      )}
    </div>
  )
}
