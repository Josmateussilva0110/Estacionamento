import { z } from "zod"
import { RegisterClientSchema } from "../../schemas/RegisterClientSchema"
import { ClientPayloadSchema } from "../../schemas/clientPayloadSchema"
import { RegisterVehicleSchema } from "../../schemas/VehicleSchema"


export type RegisterVehicleFormData = z.infer<typeof RegisterVehicleSchema>
export type RegisterClientFormInput = z.input<typeof RegisterClientSchema>
export type RegisterClientFormOutput = z.output<typeof ClientPayloadSchema>
