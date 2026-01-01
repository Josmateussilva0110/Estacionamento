import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  MapPin,
  Phone,
  Settings,
  DollarSign,
  Building2,
  CheckCircle2,
  Edit3,
  ArrowLeft,
  Loader2,
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
  const navigate = useNavigate()
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
      <div className="min-h-screen bg-linear-to-br from-parking-primary via-blue-700 to-parking-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-semibold">Carregando dados...</p>
        </div>
      </div>
    )
  }

  /* Not found */
  if (!parking) {
    return (
      <div className="min-h-screen bg-linear-to-br from-parking-primary via-blue-700 to-parking-dark flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-12 shadow-2xl">
          <Building2 className="w-16 h-16 mb-4 text-gray-400 mx-auto" />
          <p className="text-xl font-semibold text-gray-700 mb-4">
            Estacionamento não encontrado
          </p>
          <button
            onClick={() => navigate("/parking/list")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            Voltar para lista
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-parking-primary via-blue-700 to-parking-dark py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Botões de navegação */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
          <button
            onClick={() => navigate("/parking/list")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <ArrowLeft size={18} />
            Voltar para lista
          </button>

          <button
            onClick={() => navigate(`/parking/edit/${parkingId}`)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Edit3 size={18} />
            Editar Estacionamento
          </button>
        </div>

        {/* CARD PRINCIPAL */}
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          {/* HEADER AZUL */}
          <div className="bg-linear-to-r from-blue-600 to-blue-500 px-6 py-6 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-lg p-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h1 className="text-xl font-semibold">
                  {parking.parkingName}
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

          {/* Footer com ação */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={() => navigate("/parking/list")}
                className="px-6 py-3 border-2 border-gray-300 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Voltar
              </button>
              <button
                onClick={() => navigate(`/parking/edit/${parkingId}`)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md inline-flex items-center justify-center gap-2"
              >
                <Edit3 size={18} />
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}