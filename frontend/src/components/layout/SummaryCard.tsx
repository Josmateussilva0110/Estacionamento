// SummaryCard.tsx
import { Pencil } from "lucide-react"

interface SummaryCardProps {
  title: string
  icon?: React.ReactNode
  items: Array<[string, string | number | undefined]>
  onEdit?: () => void
  accentColor?: "blue" | "emerald" | "violet" | "amber" | "indigo"
}

const accent = {
  blue:    { wrap: "bg-blue-500/20 border-blue-400/30",    icon: "text-blue-400"    },
  emerald: { wrap: "bg-emerald-500/20 border-emerald-400/30", icon: "text-emerald-400" },
  violet:  { wrap: "bg-violet-500/20 border-violet-400/30",  icon: "text-violet-400"  },
  amber:   { wrap: "bg-amber-500/20 border-amber-400/30",   icon: "text-amber-400"   },
  indigo:  { wrap: "bg-indigo-500/20 border-indigo-400/30", icon: "text-indigo-400"  },
}

export function SummaryCard({
  title,
  icon,
  items,
  onEdit,
  accentColor = "blue",
}: SummaryCardProps) {
  const { wrap, icon: iconColor } = accent[accentColor]

  return (
    <div className="relative bg-slate-700/20 border border-slate-700/40 rounded-2xl p-5 space-y-4 hover:border-slate-600/60 transition-colors duration-300">

      {/* Edit button */}
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-600/50 transition-colors"
          aria-label={`Editar ${title}`}
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${wrap}`}>
            <span className={`[&>svg]:w-4 [&>svg]:h-4 ${iconColor}`}>{icon}</span>
          </div>
        )}
        <h3 className="font-semibold text-white text-base">{title}</h3>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700/60" />

      {/* Items */}
      <dl className="space-y-2">
        {items.map(([label, value], index) => (
          <div
            key={label}
            className="flex justify-between items-center gap-3 animate-in fade-in slide-in-from-left-2"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <dt className="text-xs text-slate-400">{label}</dt>
            <dd className="text-xs font-medium text-slate-200 text-right">{value ?? "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
