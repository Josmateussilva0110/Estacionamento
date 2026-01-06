import { type ReactNode, type SelectHTMLAttributes } from "react"
import { ChevronDown } from "lucide-react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  leftIcon?: ReactNode
  children: ReactNode
}

export function Select({
  label,
  error,
  leftIcon,
  children,
  className,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative group">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
            {leftIcon}
          </div>
        )}

        <select
          className={`
            w-full ${leftIcon ? "pl-10" : "pl-4"} pr-10 py-3
            border rounded-lg bg-white
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            outline-none transition-all appearance-none
            ${error ? "border-red-500 bg-red-50" : "border-gray-300"}
            ${className ?? ""}
          `}
          {...props}
        >
          {children}
        </select>

        <div
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            pointer-events-none
            transition-transform duration-200
            group-focus-within:rotate-180
          "
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          ⚠ {error}
        </p>
      )}
    </div>
  )
}
