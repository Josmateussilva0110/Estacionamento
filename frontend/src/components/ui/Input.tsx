import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isPassword?: boolean
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  isPassword = false,
  type = "text",
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const inputType = isPassword
    ? (showPassword ? "text" : "password")
    : type

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-semibold text-white">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}

        <input
          {...rest}
          type={inputType}
          className={`
            w-full px-3 py-3 rounded-lg border bg-gray-50
            ${leftIcon ? "pl-10" : ""}
            ${isPassword ? "pr-10" : ""}
            ${error ? "border-red-500 bg-red-50" : "border-gray-300"}
            focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
        />

        {/* Ícone à direita (caso não seja de senha) */}
        {!isPassword && rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}

        {/* Toggle password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
