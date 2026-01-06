import { z } from "zod"
import { RegisterClientSchema } from "../schemas/RegisterClientSchema"
import { RegisterVehicleSchema } from "../schemas/VehicleSchema"

export type RegisterClientFormData = z.infer<typeof RegisterClientSchema>
export type RegisterVehicleFormData = z.infer<typeof RegisterVehicleSchema>
