import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type Path } from "react-hook-form"
import {
  CheckCircle, ChevronLeft, ChevronRight, MapPin, Settings,
  DollarSign, ClipboardCheck, Building2,
} from "lucide-react"
import useFlashMessage from "../../../hooks/useFlashMessage"
import { StepIdentification } from "./steps/StepIdentification"
import { StepAddressContacts } from "./steps/StepAddressContacts"
import { StepSpots } from "./steps/StepSpots"
import { StepPrices } from "./steps/StepPrices"
import { StepSummary } from "./steps/StepSummary"
import { ParkingSchema } from "../../../schemas/parkingSchema"
import { type ParkingFormData } from "../../../types/parking/parkingTypes"
import { requestData } from "../../../services/requestApi"
import { type RegisterParkingResponse } from "../../../types/parking/parkingResponses"
import type { ParkingData } from "../../../types/parking/parkingEditResponse"
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage"
import { StepProgress } from "./components/StepProgress"
import { transformApiToForm, transformFormToApi } from "../../../utils/transformParkingData"

const steps = [
  { id: "identificacao", title: "Identificação", icon: ClipboardCheck },
  { id: "endereco", title: "Endereço e Contatos", icon: MapPin },
  { id: "operacao", title: "Operação e Estrutura", icon: Settings },
  { id: "precos", title: "Tabela de Preços", icon: DollarSign },
  { id: "revisao", title: "Revisão", icon: CheckCircle },
] as const

export const defaultValues: ParkingFormData = {
  parkingName: "",
  managerName: "",
  address: {
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    zipCode: "",
  },
  contacts: {
    phone: "",
    whatsapp: "",
    email: "",
    openingHours: { start: "", end: "" },
  },
  operations: {
    totalSpots: 0,
    carSpots: 0,
    motoSpots: "",
    truckSpots: "",
    pcdSpots: "",
    elderlySpots: "",
    hasCameras: false,
    hasWashing: false,
    areaType: "coberta",
  },
  prices: {
    priceHour: 0,
    priceExtraHour: 0,
    dailyRate: "",
    nightPeriod: { start: "", end: "" },
    nightRate: "",
    monthlyRate: "",
    carPrice: "",
    motoPrice: "",
    truckPrice: "",
  },
}

interface ParkingFormProps {
  mode: "create" | "edit"
}

function ParkingForm({ mode }: ParkingFormProps) {
  const { parkingId } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(mode === "edit")
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<ParkingFormData>({
    resolver: zodResolver(ParkingSchema) as any,
    mode: "onBlur",
    defaultValues,
  })

  useEffect(() => {
    if (mode === "edit" && parkingId) {
      async function loadParking() {
        setIsLoading(true)
        const response = await requestData<ParkingData>(
          `/parking/${parkingId}`,
          "GET",
          {},
          true
        )
        if (response.success && response.data?.parking) {
          const formData = transformApiToForm(response.data.parking)
          reset(formData)
        } else {
          setFlashMessage("error", getApiErrorMessage(response))
          navigate("/parking/list")
        }
        setIsLoading(false)
      }
      loadParking()
    }
  }, [mode, parkingId, reset, navigate, setFlashMessage])

  const stepFields: Record<number, Path<ParkingFormData>[]> = {
    0: ["parkingName", "managerName"],
    1: [
      "address.street", "address.number", "address.complement",
      "address.district", "address.city", "address.state", "address.zipCode",
      "contacts.phone", "contacts.whatsapp", "contacts.email", "contacts.openingHours",
    ],
    2: [
      "operations.totalSpots", "operations.carSpots", "operations.motoSpots",
      "operations.truckSpots", "operations.pcdSpots", "operations.elderlySpots",
      "operations.hasCameras", "operations.hasWashing", "operations.areaType",
    ],
    3: [
      "prices.priceHour", "prices.priceExtraHour", "prices.dailyRate",
      "prices.nightPeriod", "prices.nightRate", "prices.monthlyRate",
      "prices.carPrice", "prices.motoPrice", "prices.truckPrice",
    ],
  }

  async function handleNext() {
    const currentFields = stepFields[step]
    if (currentFields) {
      const valid = await trigger(stepFields[step])
      if (!valid) return
    }
    setStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  function handlePrev() {
    setStep((prev) => Math.max(prev - 1, 0))
  }

  async function onSubmit(data: ParkingFormData) {
    if (step !== steps.length - 1) return

    const payload = transformFormToApi(data)
    const endpoint = mode === "edit" ? `/parking/${parkingId}` : "/parking/register"
    const method = mode === "edit" ? "PUT" : "POST"

    const response = await requestData<RegisterParkingResponse>(endpoint, method, payload, true)
    console.log(response)

    if (response.success && response.data?.parkingId) {
      setFlashMessage(
        "success",
        mode === "edit" ? "Estacionamento atualizado com sucesso!" : response.message
      )
      navigate("/parking/list")
    } else {
      setFlashMessage("error", getApiErrorMessage(response))
    }
  }

  function renderStepContent() {
    switch (step) {
      case 0: return <StepIdentification register={register} errors={errors} />
      case 1: return <StepAddressContacts register={register} errors={errors} control={control} />
      case 2: return <StepSpots register={register} errors={errors} watch={watch} setValue={setValue} />
      case 3: return <StepPrices register={register} errors={errors} control={control} />
      case 4: return <StepSummary watch={watch} />
      default: return null
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-16 text-center shadow-2xl">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-700 border-t-blue-500 mx-auto mb-4" />
          <p className="text-slate-300 font-medium">Carregando dados...</p>
        </div>
      </div>
    )
  }

  const currentStep = steps[step]

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="relative bg-slate-800/80 rounded-3xl shadow-2xl border border-slate-700/50">
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-blue-600/10 rounded-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative px-4 sm:px-8 py-6 sm:py-8">
            {/* Title row */}
            <div className="flex items-center gap-3 sm:gap-5 mb-6 sm:mb-8">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-blue-500/30 rounded-3xl" />
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/20 backdrop-blur-xl rounded-xl sm:rounded-2xl flex items-center justify-center border border-blue-400/30">
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {mode === "edit" ? "Editar" : "Cadastrar"} estacionamento
                </h1>
                <p className="text-blue-200 text-sm sm:text-base mt-0.5">
                  {currentStep.title} · Passo {step + 1} de {steps.length}
                </p>
              </div>
            </div>

            {/* ── Step progress ── */}
            <StepProgress steps={steps} currentStep={step} />

            {/* Mobile: current step label */}
            <p className="sm:hidden text-center text-xs text-blue-300 font-medium mt-3">
              {currentStep.title}
            </p>
          </div>
        </div>

        {/* ── Form content ── */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-4 sm:p-8">
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          {/* ── Navigation ── */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 mt-6 border-t border-slate-700/50">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 0}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-600/50 bg-slate-700/40 text-slate-200 font-semibold hover:bg-slate-700/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 hover:scale-[1.02]"
            >
              <ChevronLeft size={18} />
              Voltar
            </button>

            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all active:scale-95 hover:scale-[1.02] shadow-lg shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Próximo
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all active:scale-95 hover:scale-[1.02] shadow-lg shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                <CheckCircle size={18} />
                {mode === "edit" ? "Salvar alterações" : "Finalizar cadastro"}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ParkingForm
