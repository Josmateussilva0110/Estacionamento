import { z } from "zod"
import { HoursSchema } from "./hourSchema"

export const ParkingRegisterSchema = z.object({
  parkingName: z.string().min(3, "Nome do estacionamento é obrigatório"),
  managerName: z.string().min(3, "Nome do responsável é obrigatório"),

  address: z.object({
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    district: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().length(2, "Estado deve ter 2 caracteres"),
    zipCode: z.string().min(8, "CEP inválido"),
    complement: z.string().optional(),
  }),

  contacts: z.object({
    phone: z.string().min(8, "Telefone inválido"),
    whatsapp: z.string().min(8, "WhatsApp inválido"),
    email: z.string().email("Email inválido"),
    openingHours: HoursSchema,
  }),

  operations: z.object({
    totalSpots: z.number().int().positive(),
    carSpots: z.number().int().nonnegative(),
    motoSpots: z.number().int().nonnegative(),
    truckSpots: z.number().int().nonnegative(),
    pcdSpots: z.number().int().nonnegative(),
    elderlySpots: z.number().int().nonnegative(),
    hasCameras: z.boolean(),
    hasWashing: z.boolean(),
    areaType: z.number().int(),
  }),

  prices: z.object({
    carPrice: z.number().positive(),
    motoPrice: z.number().positive(),
    truckPrice: z.number().positive(),
    priceHour: z.number().positive(),
    priceExtraHour: z.number().positive(),
    dailyRate: z.number().positive(),
    monthlyRate: z.number().positive(),
    nightRate: z.number().positive(),
    nightPeriod: HoursSchema,
  }),
})
