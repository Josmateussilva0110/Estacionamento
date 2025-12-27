import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  MapPin,
  Phone,
  Settings,
  DollarSign,
  Building2,
  CheckCircle2,
} from "lucide-react"

import { SummaryCard } from "../../layout/SumaryCard"
import { requestData } from "../../../services/requestApi"
import type { ParkingData } from "../../../types/parkingEditResponse"
import type { ParkingEdit as ParkingEditType } from "../../../types/parkingEdit"

/* Helpers */
const formatPeriod = (
  period?: { start: string; end: string } | null
) => (period ? `${period.start} às ${period.end}` : "-")

const formatPrice = (value?: number) =>
  value != null ? `R$ ${value.toFixed(2)}` : "-"

export function ParkingEdit() {
  const { parkingId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [parking, setParking] = useState<ParkingEditType | null>(null)

  useEffect(() => {
    async function fetchParking() {
      setIsLoading(true)

      const response = await requestData<ParkingData>(
        `/parking/${parkingId}`,
        "GET",
        {},
        true
      )

      if (response.success && response.data?.parking) {
        setParking(response.data.parking)
      } else {
        setParking(null)
      }

      setIsLoading(false)
    }

    fetchParking()
  }, [parkingId])

  /* Loading */
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  /* Not found */
  if (!parking) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500">
        <Building2 className="w-12 h-12 mb-4 text-gray-400" />
        <p className="text-lg font-semibold">
          Estacionamento não encontrado
        </p>
      </div>
    )
  }

  return (
      <div className="min-h-screen bg-linear-to-br from-parking-primary via-blue-700 to-parking-dark py-10">
    
    {/* CONTAINER CENTRAL */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* CARD PRINCIPAL */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        {/* HEADER AZUL */}
        <div className="bg-linear-to-r from-blue-600 to-blue-500 px-6 py-6 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h1 className="text-xl font-semibold">
                Estacionamento
              </h1>
              <p className="text-sm text-blue-100">
                Visualização e revisão dos dados cadastrados
              </p>
            </div>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="p-6 space-y-6 bg-slate-50">

          {/* Identificação + Contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SummaryCard
              title="Identificação"
              icon={<Building2 className="w-5 h-5" />}
              items={[
                ["Estacionamento", parking.parkingName],
                ["Responsável", parking.managerName],
              ]}
            />

            <SummaryCard
              title="Contato"
              icon={<Phone className="w-5 h-5" />}
              items={[
                ["Telefone", parking.contacts.phone],
                ["WhatsApp", parking.contacts.whatsapp],
                ["E-mail", parking.contacts.email],
                [
                  "Horário",
                  formatPeriod(parking.contacts.openingHours),
                ],
              ]}
            />
          </div>

          {/* Endereço */}
          <SummaryCard
            title="Endereço"
            icon={<MapPin className="w-5 h-5" />}
            items={[
              [
                "Endereço",
                `${parking.address.street}, ${parking.address.number}`,
              ],
              [
                "Complemento",
                parking.address.complement || "-",
              ],
              ["Bairro", parking.address.district],
              [
                "Cidade/UF",
                `${parking.address.city} - ${parking.address.state}`,
              ],
              ["CEP", parking.address.zipCode],
            ]}
          />

          {/* Operação + Preços */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SummaryCard
              title="Operação e estrutura"
              icon={<Settings className="w-5 h-5" />}
              items={[
                ["Total de vagas", parking.operations.totalSpots],
                ["Carro", parking.operations.carSpots],
                ["Moto", parking.operations.motoSpots],
                ["Caminhonete", parking.operations.truckSpots],
                ["PCD", parking.operations.pcdSpots],
                ["Idoso", parking.operations.elderlySpots],
                [
                  "Câmeras",
                  parking.operations.hasCameras
                    ? "Sim"
                    : "Não",
                ],
                [
                  "Lavagem",
                  parking.operations.hasWashing
                    ? "Sim"
                    : "Não",
                ],
                ["Área", parking.operations.areaType],
              ]}
            />

            <SummaryCard
              title="Preços"
              icon={<DollarSign className="w-5 h-5" />}
              items={[
                ["Hora", formatPrice(parking.prices.priceHour)],
                [
                  "Hora adicional",
                  formatPrice(
                    parking.prices.priceExtraHour
                  ),
                ],
                ["Diária", formatPrice(parking.prices.dailyRate)],
                [
                  "Período noturno",
                  formatPeriod(parking.prices.nightPeriod),
                ],
                [
                  "Valor noturno",
                  formatPrice(parking.prices.nightRate),
                ],
                [
                  "Mensalidade",
                  formatPrice(parking.prices.monthlyRate),
                ],
                [
                  "Carro",
                  formatPrice(parking.prices.carPrice),
                ],
                [
                  "Moto",
                  formatPrice(parking.prices.motoPrice),
                ],
                [
                  "Caminhonete",
                  formatPrice(parking.prices.truckPrice),
                ],
              ]}
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
