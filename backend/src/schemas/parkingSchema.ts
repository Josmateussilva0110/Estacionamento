import { z } from "zod"
import { HoursSchema } from "./hourSchema"

export const ParkingRegisterSchema = z.object({
    parkingName: z.string().min(3, "Nome do estacionamento deve ter mais de 3 caracteres"),
    managerName: z.string().min(3, "Nome do responsável deve ter mais de 3 caracteres"),

    address: z.object({
        street: z.string().min(1, "Rua é obrigatória"),
        number: z.string().min(1, "Número é obrigatório"),
        district: z.string().min(1, "Bairro é obrigatório"),
        city: z.string().min(1, "Cidade é obrigatória"),
        state: z.string().length(2, "Estado deve ter 2 caracteres"),
        zipCode: z
            .string()
            .transform(value => value.replace(/\D/g, ""))
            .refine(value => value.length === 8, {
                message: "CEP deve conter exatamente 8 dígitos",
            }),
        complement: z.string().optional(),
    }),

    contacts: z.object({
        phone: z
            .string()
            .transform(value => value.replace(/\D/g, ""))
            .refine(value => value.length >= 10 && value.length <= 11, {
                message: "Telefone deve conter 10 ou 11 dígitos",
            }),

        whatsapp: z
            .string()
            .transform(value => value.replace(/\D/g, ""))
            .refine(value => value.length === 11, {
                message: "WhatsApp deve conter 11 dígitos (DDD + número)",
            }),
        email: z.string().email("Email inválido"),
        openingHours: HoursSchema,
    }),

    operations: z.object({
        totalSpots: z
            .coerce
            .number()
            .int("Total de vagas deve ser um número inteiro")
            .positive("Total de vagas deve ser maior que zero"),

        carSpots: z
            .coerce
            .number()
            .int("Vagas de carro deve ser inteiro")
            .nonnegative("Vagas de carro não pode ser negativo"),

        motoSpots: z
            .coerce
            .number()
            .int("Vagas de moto deve ser inteiro")
            .nonnegative("Vagas de moto não pode ser negativo"),

        truckSpots: z
            .coerce
            .number()
            .int("Vagas de caminhão deve ser inteiro")
            .nonnegative("Vagas de caminhão não pode ser negativo"),

        pcdSpots: z
            .coerce
            .number()
            .int("Vagas PCD deve ser inteiro")
            .nonnegative("Vagas PCD não pode ser negativo"),

        elderlySpots: z
            .coerce
            .number()
            .int("Vagas para idosos deve ser inteiro")
            .nonnegative("Vagas para idosos não pode ser negativo"),

        hasCameras: z.boolean(),

        hasWashing: z.boolean(),

        areaType: z
            .coerce
            .number()
            .int("Tipo da área inválido"),
    })
        .refine(
            (data) =>
                data.carSpots +
                data.motoSpots +
                data.truckSpots +
                data.pcdSpots +
                data.elderlySpots ===
                data.totalSpots,
            {
                message: "A soma das vagas deve ser igual ao total de vagas",
                path: ["totalSpots"],
            }
        ),

    prices: z.object({
        carPrice: z.coerce.number()
            .positive("Preço do carro deve ser maior que zero"),

        motoPrice: z.coerce.number()
            .positive("Preço da moto deve ser maior que zero"),

        truckPrice: z.coerce.number()
            .positive("Preço do caminhão deve ser maior que zero"),

        priceHour: z.coerce.number()
            .positive("Preço por hora deve ser maior que zero"),

        priceExtraHour: z.coerce.number()
            .positive("Preço da hora extra deve ser maior que zero"),

        dailyRate: z.coerce.number()
            .positive("Diária deve ser maior que zero"),

        monthlyRate: z.coerce.number()
            .positive("Mensalidade deve ser maior que zero"),

        nightRate: z.coerce.number()
            .positive("Tarifa noturna deve ser maior que zero"),

        nightPeriod: HoursSchema,
    })
})