import { z } from "zod"

export const RegisterVehicleSchema = z.object({
    brand: z
        .string()
        .min(2, "A marca deve ter pelo menos 2 caracteres")
        .max(50, "A marca deve ter no máximo 50 caracteres"),

    color: z
        .string()
        .min(3, "A cor deve ter pelo menos 3 caracteres")
        .max(30, "A cor deve ter no máximo 30 caracteres"),

    plate: z
        .string()
        .transform((v) => v.toUpperCase())
        .refine(
            (v) =>
            /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(v),
            "Placa inválida (padrão Mercosul)"
        ),


    vehicleType: z
        .number()
        .int("O tipo de veículo deve ser um número inteiro")
        .positive("O tipo de veículo deve ser maior que zero"),
    
    clientId: z.number().nullable().refine(
        (val) => val !== null,
        { message: "Cliente é obrigatório" }
    ),
})

