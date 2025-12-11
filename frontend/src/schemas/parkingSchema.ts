import { z } from "zod"

const numberRequired = (label: string) =>
  z.coerce.number({ message: `Informe ${label}` })
    .nonnegative(`${label} deve ser zero ou maior`)

const numberOptional = z
  .union([z.literal(""), z.coerce.number().nonnegative()])
  .optional()


export const ParkingSchema = z.object({
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
