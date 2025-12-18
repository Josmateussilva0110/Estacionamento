import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type Path } from "react-hook-form"
import {
  CheckCircle, ChevronLeft, ChevronRight, MapPin, Settings, DollarSign, ClipboardCheck, Sparkles,
} from "lucide-react"
import useFlashMessage from "../../../hooks/useFlashMessage"
import { StepIdentification } from "./steps/StepIdentification"
import { StepAddressContacts } from "./steps/StepAddressContacts"
import { StepSpots } from "./steps/StepSpots"
import { StepPrices } from "./steps/StepPrices"
import { StepSummary } from "./steps/StepSummary"
import { ParkingSchema } from "../../../schemas/parkingSchema"
import { type ParkingFormData } from "../../../types/parkingTypes"
import { requestData } from "../../../services/requestApi"
import { type RegisterParkingResponse } from "../../../types/parkingResponses"
import { mapAreaTypeToNumber } from "../../../utils/mapAreaType"


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
    openingHours: {
      start: "",
      end: "",
    }
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
    nightPeriod: {
      start: "",
      end: "",
    },
    nightRate: "",
    monthlyRate: "",
    carPrice: "",
    motoPrice: "",
    truckPrice: "",
  }
}




function ParkingRegister() {
  const { setFlashMessage } = useFlashMessage()
  const [step, setStep] = useState(0)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ParkingFormData>({
    resolver: zodResolver(ParkingSchema) as any,
    mode: "onBlur",
    defaultValues,
  })


  const stepFields: Record<number, Path<ParkingFormData>[]> = {
    0: ["parkingName", "managerName"],
    1: [
      "address.street",
      "address.number",
      "address.complement",
      "address.district",
      "address.city",
      "address.state",
      "address.zipCode",
      "contacts.phone",
      "contacts.whatsapp",
      "contacts.email",
      "contacts.openingHours",
    ],
    2: [
      "operations.totalSpots",
      "operations.carSpots",
      "operations.motoSpots",
      "operations.truckSpots",
      "operations.pcdSpots",
      "operations.elderlySpots",
      "operations.hasCameras",
      "operations.hasWashing",
      "operations.areaType",
    ],
    3: [
      "prices.priceHour",
      "prices.priceExtraHour",
      "prices.dailyRate",
      "prices.nightPeriod",
      "prices.nightRate",
      "prices.monthlyRate",
      "prices.carPrice",
      "prices.motoPrice",
      "prices.truckPrice",
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
    const payload = {
      ...data,
      operations: {
        ...data.operations,
        areaType: mapAreaTypeToNumber(data.operations.areaType),
      },
    }

    const response = await requestData<RegisterParkingResponse>("/parking/register", "POST", payload, true)
    console.log(response)

    if (response.success && response.data?.status) {
      setFlashMessage(response.data.message, "success")
    } else {
      setFlashMessage(
        response.data?.message ?? "Erro ao cadastrar estacionamento",
        "error"
      )
    }
  }


  function renderStepContent() {
    switch (step) {
      case 0:
        return (
          <StepIdentification
            register={register}
            errors={errors}
          />
        )
      case 1:
        return (
          <StepAddressContacts
            register={register}
            errors={errors}
            control={control}
          />
        )
      case 2:
        return (
          <StepSpots
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )
      case 3:
        return (
          <StepPrices
            register={register}
            errors={errors}
            control={control}
          />
        )
      case 4:
        return <StepSummary watch={watch} />
      default:
        return null
    }
  }

  const currentStep = steps[step]
  const progress = ((step + 1) / steps.length) * 100

  return (
    <div className="min-h-full py-10 flex items-center justify-center bg-linear-to-br from-parking-primary via-blue-700 to-parking-dark">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-blue-600 px-5 sm:px-8 py-6 sm:py-8 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <currentStep.icon className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-bold leading-tight flex items-center gap-2">
                    Cadastrar estacionamento
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wide">
                      <Sparkles className="w-3.5 h-3.5" />
                      Etapa {step + 1}
                    </span>
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-blue-100">
                    <span className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-lg backdrop-blur">
                      <currentStep.icon className="w-4 h-4" />
                      <span className="font-semibold text-white">{currentStep.title}</span>
                    </span>
                    <span className="text-white/80">Passo {step + 1} de {steps.length}</span>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-56 h-3 rounded-full bg-white/20 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500 ease-out shadow-md"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => {
            if (e.key === "Enter" && step < steps.length - 1) {
              e.preventDefault()
            }
          }} className="px-5 sm:px-8 py-6 sm:py-8 space-y-8">
            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 0}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <ChevronLeft size={18} />
                Voltar
              </button>

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Próximo
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  <CheckCircle size={18} />
                  Finalizar cadastro
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ParkingRegister

