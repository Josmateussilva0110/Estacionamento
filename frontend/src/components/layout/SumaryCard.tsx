interface SummaryCardProps {
  title: string
  icon?: React.ReactNode
  items: Array<[string, string | number | undefined]>
}

export function SummaryCard({ title, icon, items }: SummaryCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
        {icon && <div className="text-blue-600">{icon}</div>}
        <h3 className="text-base font-bold text-gray-800">{title}</h3>
      </div>
      <dl className="space-y-3 text-sm text-gray-700">
        {items.map(([label, value], index) => (
          <div
            key={label}
            className="flex justify-between gap-3 py-1 animate-in fade-in slide-in-from-left-2"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <dt className="font-semibold text-gray-600">{label}</dt>
            <dd className="text-right font-medium text-gray-900">{value ?? "-"}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}