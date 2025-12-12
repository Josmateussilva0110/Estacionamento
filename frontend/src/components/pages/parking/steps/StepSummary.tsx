import {
  MapPin, Phone, Settings, DollarSign,
  Building2
} from "lucide-react"
import type { ParkingFormData } from "../../../../types/parkingTypes"
import type { FormStepProps } from "../../../../types/formStep"

type StepSummaryProps = Pick<
  FormStepProps<ParkingFormData>,
  "watch"
>

interface SummaryCardProps {
  title: string
  icon?: React.ReactNode
  items: Array<[string, string | number | undefined]>
}

function SummaryCard({ title, icon, items }: SummaryCardProps) {
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

export function StepSummary({ watch }: StepSummaryProps) {
  const data = watch?.()

  if (!data) return null
  return (
    <div className="space-y-6 text-sm sm:text-base animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SummaryCard
          title="Identificação"
          icon={<Building2 className="w-5 h-5" />}
          items={[
            ["Estacionamento", data.parkingName],
            ["Responsável", data.managerName],
          ]}
        />

        <SummaryCard
          title="Contato"
          icon={<Phone className="w-5 h-5" />}
          items={[
            ["Telefone", data.contacts.phone],
            ["WhatsApp", data.contacts.whatsapp],
            ["E-mail", data.contacts.email],
            [
              "Horário",
              `${data.contacts.openingHours.start} às ${data.contacts.openingHours.end}`
            ]
          ]}
        />
      </div>

      <SummaryCard
        title="Endereço"
        icon={<MapPin className="w-5 h-5" />}
        items={[
          ["Endereço", `${data.address.street}, ${data.address.number}`],
          ["Complemento", data.address.complement || "-"],
          ["Bairro", data.address.district],
          ["Cidade/UF", `${data.address.city} - ${data.address.state}`],
          ["CEP", data.address.zipCode],
        ]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SummaryCard
          title="Operação e estrutura"
          icon={<Settings className="w-5 h-5" />}
          items={[
            ["Total de vagas", (data.operations.totalSpots as number | undefined) ?? "-"],
            ["Carro", (data.operations.carSpots as number | undefined) ?? "-"],
            ["Moto", (data.operations.motoSpots as number | undefined) ?? "-"],
            ["Caminhonete", (data.operations.truckSpots as number | undefined) ?? "-"],
            ["PCD", (data.operations.pcdSpots as number | undefined) ?? "-"],
            ["Idoso", (data.operations.elderlySpots as number | undefined) ?? "-"],
            ["Câmeras", data.operations.hasCameras ? "Sim" : "Não"],
            ["Lavagem", data.operations.hasWashing ? "Sim" : "Não"],
            ["Área", data.operations.areaType],
          ]}
        />

        <SummaryCard
          title="Preços"
          icon={<DollarSign className="w-5 h-5" />}
          items={[
            ["Hora", (data.prices.priceHour as number | undefined) ?? "-"],
            ["Hora adicional", (data.prices.priceExtraHour as number | undefined) ?? "-"],
            ["Diária", (data.prices.dailyRate as number | undefined) ?? "-"],
            ["Período noturno", `${data.prices.nightPeriod.start} às ${data.prices.nightPeriod.end}` || "-"],
            ["Valor noturno", (data.prices.nightRate as number | undefined) ?? "-"],
            ["Mensalidade", (data.prices.monthlyRate as number | undefined) ?? "-"],
            ["Carro", (data.prices.carPrice as number | undefined) ?? "-"],
            ["Moto", (data.prices.motoPrice as number | undefined) ?? "-"],
            ["Caminhonete", (data.prices.truckPrice as number | undefined) ?? "-"],
          ]}
        />
      </div>
    </div>
  )
}