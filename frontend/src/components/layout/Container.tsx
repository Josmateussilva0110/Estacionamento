import { type ReactNode } from "react"

type ContainerVariant = "default" | "centered" | "dark" | "custom"

interface LayoutContainerProps {
  children: ReactNode
  variant?: ContainerVariant
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full"
  noPadding?: boolean
  customBackground?: string
}


function LayoutContainer({
  children,
  variant = "default",
  className = "",
  maxWidth = "7xl",
  noPadding = false,
  customBackground,
}: LayoutContainerProps) {
  
  const backgroundVariants = {
    default: "bg-linear-to-br from-slate-50 via-blue-100 to-indigo-50",
    centered: "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50",
    dark: "bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800",
    custom: customBackground || "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50",
  }


  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }

  // Layout variants
  const layoutVariants = {
    default: "px-4 py-8",
    centered: "flex items-center justify-center px-4 py-8 sm:py-12",
    dark: "flex items-center justify-center px-4 py-10",
    custom: "px-4 py-8",
  }

  const backgroundClass = backgroundVariants[variant]
  const layoutClass = layoutVariants[variant]
  const paddingClass = noPadding ? "" : layoutClass

  return (
    <div className={`min-h-screen ${backgroundClass} ${className}`}>
      <div className={`${paddingClass} ${variant === "centered" ? "" : "mx-auto"} ${maxWidthClasses[maxWidth]}`}>
        {children}
      </div>
    </div>
  )
}

export default LayoutContainer
