import { useMemo, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { 
  CheckCircle, ChevronLeft, ChevronRight, MapPin, Phone, Settings, DollarSign, ClipboardCheck,
  Building2, User, Hash, Mail, Clock, Car, Bike, Truck, Camera, Home, CreditCard,
  Sparkles, Package, Navigation2, Landmark, Flag, MapPinned,
  MessageCircle, Accessibility, HeartPulse, ShowerHead, MoonStar, CalendarRange, SunMedium
} from "lucide-react"
import Input from "../../ui/Input"
import useFlashMessage from "../../../hooks/useFlashMessage"

const numberRequired = (label: string) =>
  z.coerce.number({ message: `Informe ${label}` }).nonnegative(`${label} deve ser zero ou maior`)

const numberOptional = z.coerce.number().nonnegative().optional()

const ParkingSchema = z.object({
  parkingName: z.string().min(3, "Informe o nome do estacionamento"),
  managerName: z.string().min(3, "Informe o responsável ou gerente"),

  address: z.object({
    street: z.string().min(3, "Informe o endereço"),
    number: z.string().min(1, "Número é obrigatório"),
    complement: z.string().optional(),
    district: z.string().min(2, "Bairro é obrigatório"),
    city: z.string().min(2, "Cidade é obrigatória"),
    state: z.string().min(2, "Estado é obrigatório"),
    zipCode: z.string().min(8, "CEP é obrigatório"),
  }),

  contacts: z.object({
    phone: z.string().min(8, "Informe um telefone"),
    whatsapp: z.string().min(8, "Informe um WhatsApp"),
    email: z.string().email("E-mail inválido"),
    openingHours: z.string().min(3, "Informe o horário (ex: 06h às 23h)"),
  }),

  operations: z.object({
    totalSpots: numberRequired("total de vagas"),
    carSpots: numberRequired("vagas de carro"),
    motoSpots: numberOptional,
    truckSpots: numberOptional,
    pcdSpots: numberOptional,
    elderlySpots: numberOptional,
    hasCameras: z.boolean().default(false),
    hasWashing: z.boolean().default(false),
    areaType: z.enum(["coberta", "descoberta", "mista"]),
  }),

  prices: z.object({
    priceHour: numberRequired("valor hora"),
    priceExtraHour: numberRequired("hora adicional"),
    dailyRate: numberOptional,
    nightPeriod: z.string().optional(),
    nightRate: numberOptional,
    monthlyRate: numberOptional,
    carPrice: numberOptional,
    motoPrice: numberOptional,
    truckPrice: numberOptional,
  }),
})

type ParkingFormData = z.infer<typeof ParkingSchema>

const steps = [
  { id: "identificacao", title: "Identificação", icon: ClipboardCheck },
  { id: "endereco", title: "Endereço e Contatos", icon: MapPin },
  { id: "operacao", title: "Operação e Estrutura", icon: Settings },
  { id: "precos", title: "Tabela de Preços", icon: DollarSign },
  { id: "revisao", title: "Revisão", icon: CheckCircle },
] as const

function ParkingRegister() {
  const { setFlashMessage } = useFlashMessage()
  const [step, setStep] = useState(0)

  const {
  register,
  handleSubmit,
  trigger,
  watch,
  setValue,
  formState: { errors },
} = useForm({
  resolver: zodResolver(ParkingSchema),
  mode: "onBlur",
  defaultValues: {
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
      openingHours: "",
    },
    operations: {
      totalSpots: undefined,
      carSpots: undefined,
      motoSpots: undefined,
      truckSpots: undefined,
      pcdSpots: undefined,
      elderlySpots: undefined,
      hasCameras: false,
      hasWashing: false,
      areaType: "coberta",
    },
    prices: {
      priceHour: undefined,
      priceExtraHour: undefined,
      dailyRate: undefined,
      nightPeriod: "",
      nightRate: undefined,
      monthlyRate: undefined,
      carPrice: undefined,
      motoPrice: undefined,
      truckPrice: undefined,
    },
  },
})

  const watched = watch()

  const stepFields = useMemo<Record<number, Array<keyof ParkingFormData | string>>>(() => ({
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
  }), [])

  async function handleNext() {
    const currentFields = stepFields[step]
    if (currentFields) {
      const valid = await trigger(currentFields as any)
      if (!valid) return
    }
    setStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  function handlePrev() {
    setStep((prev) => Math.max(prev - 1, 0))
  }

  function onSubmit(data: ParkingFormData) {
    // Aqui futuramente podemos enviar para a API
    console.log("Cadastro de estacionamento:", data)
    setFlashMessage("Cadastro salvo com sucesso!", "success")
  }

  function renderStepContent() {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Input
              label="Nome do estacionamento"
              placeholder="Ex.: Estacionamento Centro"
              leftIcon={<Building2 size={18} className="text-blue-600" />}
              {...register("parkingName")}
              error={errors.parkingName?.message}
            />
            <Input
              label="Responsável / gerente"
              placeholder="Nome completo"
              leftIcon={<User size={18} className="text-blue-600" />}
              {...register("managerName")}
              error={errors.managerName?.message}
            />
          </div>
        )
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Endereço</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Endereço"
                  placeholder="Rua / Avenida"
                  leftIcon={<Navigation2 size={18} className="text-blue-600" />}
                  {...register("address.street")}
                  error={errors.address?.street?.message}
                />
                <Input
                  label="Número"
                  placeholder="123"
                  leftIcon={<Hash size={18} className="text-blue-600" />}
                  {...register("address.number")}
                  error={errors.address?.number?.message}
                />
                <Input
                  label="Complemento"
                  placeholder="Sala, bloco, etc."
                  leftIcon={<Package size={18} className="text-blue-600" />}
                  {...register("address.complement")}
                  error={errors.address?.complement?.message}
                />
                <Input
                  label="Bairro"
                  placeholder="Centro"
                  leftIcon={<Landmark size={18} className="text-blue-600" />}
                  {...register("address.district")}
                  error={errors.address?.district?.message}
                />
                <Input
                  label="Cidade"
                  placeholder="Cidade"
                  leftIcon={<Building2 size={18} className="text-blue-600" />}
                  {...register("address.city")}
                  error={errors.address?.city?.message}
                />
                <Input
                  label="Estado"
                  placeholder="UF"
                  leftIcon={<Flag size={18} className="text-blue-600" />}
                  {...register("address.state")}
                  error={errors.address?.state?.message}
                />
                <Input
                  label="CEP"
                  placeholder="00000-000"
                  leftIcon={<MapPinned size={18} className="text-blue-600" />}
                  {...register("address.zipCode")}
                  error={errors.address?.zipCode?.message}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Contatos</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Telefone"
                  placeholder="(00) 0000-0000"
                  leftIcon={<Phone size={18} className="text-blue-600" />}
                  {...register("contacts.phone")}
                  error={errors.contacts?.phone?.message}
                />
                <Input
                  label="WhatsApp"
                  placeholder="(00) 00000-0000"
                  leftIcon={<MessageCircle size={18} className="text-green-600" />}
                  {...register("contacts.whatsapp")}
                  error={errors.contacts?.whatsapp?.message}
                />
                <Input
                  label="E-mail"
                  type="email"
                  placeholder="contato@estacionamento.com"
                  leftIcon={<Mail size={18} className="text-blue-600" />}
                  {...register("contacts.email")}
                  error={errors.contacts?.email?.message}
                />
                <Input
                  label="Horário de funcionamento"
                  placeholder="Ex.: 06h às 23h"
                  leftIcon={<Clock size={18} className="text-blue-600" />}
                  {...register("contacts.openingHours")}
                  error={errors.contacts?.openingHours?.message}
                />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Package className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Vagas Disponíveis</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Total de vagas"
                  type="number"
                  placeholder="0"
                  leftIcon={<Package size={18} className="text-blue-600" />}
                  {...register("operations.totalSpots", { valueAsNumber: true })}
                  error={errors.operations?.totalSpots?.message}
                />
                <Input
                  label="Vagas - Carro"
                  type="number"
                  placeholder="0"
                  leftIcon={<Car size={18} className="text-blue-600" />}
                  {...register("operations.carSpots", { valueAsNumber: true })}
                  error={errors.operations?.carSpots?.message}
                />
                <Input
                  label="Vagas - Moto"
                  type="number"
                  placeholder="0"
                  leftIcon={<Bike size={18} className="text-blue-600" />}
                  {...register("operations.motoSpots", { valueAsNumber: true })}
                  error={errors.operations?.motoSpots?.message}
                />
                <Input
                  label="Vagas - Caminhonete"
                  type="number"
                  placeholder="0"
                  leftIcon={<Truck size={18} className="text-blue-600" />}
                  {...register("operations.truckSpots", { valueAsNumber: true })}
                  error={errors.operations?.truckSpots?.message}
                />
                <Input
                  label="Vagas - PCD"
                  type="number"
                  placeholder="0"
                  leftIcon={<Accessibility size={18} className="text-blue-600" />}
                  {...register("operations.pcdSpots", { valueAsNumber: true })}
                  error={errors.operations?.pcdSpots?.message}
                />
                <Input
                  label="Vagas - Idoso"
                  type="number"
                  placeholder="0"
                  leftIcon={<HeartPulse size={18} className="text-blue-600" />}
                  {...register("operations.elderlySpots", { valueAsNumber: true })}
                  error={errors.operations?.elderlySpots?.message}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Estrutura e Recursos</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Camera className="w-4 h-4" />
                    Possui câmeras?
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const current = watched.operations.hasCameras
                      setValue("operations.hasCameras", !current, { shouldDirty: true })
                    }}
                    className={`w-full rounded-lg px-3 py-3 border text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] ${
                      watched.operations.hasCameras
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {watched.operations.hasCameras ? "✓ Sim" : "Não"}
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <ShowerHead className="w-4 h-4" />
                    Possui lavagem?
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const current = watched.operations.hasWashing
                      setValue("operations.hasWashing", !current, { shouldDirty: true })
                    }}
                    className={`w-full rounded-lg px-3 py-3 border text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] ${
                      watched.operations.hasWashing
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {watched.operations.hasWashing ? "✓ Sim" : "Não"}
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Home className="w-4 h-4" />
                    Tipo de Área
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <select
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      {...register("operations.areaType")}
                      defaultValue="coberta"
                    >
                      <option value="coberta">Coberta</option>
                      <option value="descoberta">Descoberta</option>
                      <option value="mista">Mista</option>
                    </select>
                  </div>
                  {errors.operations?.areaType?.message && (
                    <p className="text-sm text-red-600">{errors.operations.areaType.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Preços Principais</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Valor hora"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  leftIcon={<Clock size={18} className="text-blue-600" />}
                  {...register("prices.priceHour", { valueAsNumber: true })}
                  error={errors.prices?.priceHour?.message}
                />
                <Input
                  label="Hora adicional"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  leftIcon={<Clock size={18} className="text-blue-600" />}
                  {...register("prices.priceExtraHour", { valueAsNumber: true })}
                  error={errors.prices?.priceExtraHour?.message}
                />
                <Input
                  label="Diária"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  leftIcon={<SunMedium size={18} className="text-amber-500" />}
                  {...register("prices.dailyRate", { valueAsNumber: true })}
                  error={errors.prices?.dailyRate?.message}
                />
                <Input
                  label="Mensalidade"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  leftIcon={<CalendarRange size={18} className="text-blue-600" />}
                  {...register("prices.monthlyRate", { valueAsNumber: true })}
                  error={errors.prices?.monthlyRate?.message}
                />
                <Input
                  label="Período noturno (ex.: 20h às 08h)"
                  placeholder="20h às 08h"
                  leftIcon={<MoonStar size={18} className="text-indigo-600" />}
                  {...register("prices.nightPeriod")}
                  error={errors.prices?.nightPeriod?.message}
                />
                <Input
                  label="Valor período noturno"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  leftIcon={<MoonStar size={18} className="text-indigo-600" />}
                  {...register("prices.nightRate", { valueAsNumber: true })}
                  error={errors.prices?.nightRate?.message}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Car className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Preços por Tipo de Veículo</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Valor carro"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  leftIcon={<Car size={18} className="text-blue-600" />}
                  {...register("prices.carPrice", { valueAsNumber: true })}
                  error={errors.prices?.carPrice?.message}
                />
                <Input
                  label="Valor moto"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  leftIcon={<Bike size={18} className="text-blue-600" />}
                  {...register("prices.motoPrice", { valueAsNumber: true })}
                  error={errors.prices?.motoPrice?.message}
                />
                <Input
                  label="Valor caminhonete"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  leftIcon={<Truck size={18} className="text-blue-600" />}
                  {...register("prices.truckPrice", { valueAsNumber: true })}
                  error={errors.prices?.truckPrice?.message}
                />
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6 text-sm sm:text-base animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SummaryCard 
                title="Identificação" 
                icon={<Building2 className="w-5 h-5" />}
                items={[
                  ["Estacionamento", watched.parkingName],
                  ["Responsável", watched.managerName],
                ]} 
              />

              <SummaryCard 
                title="Contato" 
                icon={<Phone className="w-5 h-5" />}
                items={[
                  ["Telefone", watched.contacts.phone],
                  ["WhatsApp", watched.contacts.whatsapp],
                  ["E-mail", watched.contacts.email],
                  ["Horário", watched.contacts.openingHours],
                ]} 
              />
            </div>

            <SummaryCard 
              title="Endereço" 
              icon={<MapPin className="w-5 h-5" />}
              items={[
                ["Endereço", `${watched.address.street}, ${watched.address.number}`],
                ["Complemento", watched.address.complement || "-"],
                ["Bairro", watched.address.district],
                ["Cidade/UF", `${watched.address.city} - ${watched.address.state}`],
                ["CEP", watched.address.zipCode],
              ]} 
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SummaryCard 
                title="Operação e estrutura" 
                icon={<Settings className="w-5 h-5" />}
                items={[
                  ["Total de vagas", (watched.operations.totalSpots as number | undefined) ?? "-"],
                  ["Carro", (watched.operations.carSpots as number | undefined) ?? "-"],
                  ["Moto", (watched.operations.motoSpots as number | undefined) ?? "-"],
                  ["Caminhonete", (watched.operations.truckSpots as number | undefined) ?? "-"],
                  ["PCD", (watched.operations.pcdSpots as number | undefined) ?? "-"],
                  ["Idoso", (watched.operations.elderlySpots as number | undefined) ?? "-"],
                  ["Câmeras", watched.operations.hasCameras ? "Sim" : "Não"],
                  ["Lavagem", watched.operations.hasWashing ? "Sim" : "Não"],
                  ["Área", watched.operations.areaType],
                ]} 
              />

              <SummaryCard 
                title="Preços" 
                icon={<DollarSign className="w-5 h-5" />}
                items={[
                  ["Hora", (watched.prices.priceHour as number | undefined) ?? "-"],
                  ["Hora adicional", (watched.prices.priceExtraHour as number | undefined) ?? "-"],
                  ["Diária", (watched.prices.dailyRate as number | undefined) ?? "-"],
                  ["Período noturno", watched.prices.nightPeriod || "-"],
                  ["Valor noturno", (watched.prices.nightRate as number | undefined) ?? "-"],
                  ["Mensalidade", (watched.prices.monthlyRate as number | undefined) ?? "-"],
                  ["Carro", (watched.prices.carPrice as number | undefined) ?? "-"],
                  ["Moto", (watched.prices.motoPrice as number | undefined) ?? "-"],
                  ["Caminhonete", (watched.prices.truckPrice as number | undefined) ?? "-"],
                ]} 
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const currentStep = steps[step]
  const progress = ((step + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-linear-to-br from-parking-primary via-blue-700 to-parking-dark flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-5xl">
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

          <form onSubmit={handleSubmit(onSubmit)} className="px-5 sm:px-8 py-6 sm:py-8 space-y-8">
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

export default ParkingRegister

