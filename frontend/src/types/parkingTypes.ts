import { z } from "zod"
import { ParkingSchema } from "../schemas/parkingSchema"

export type ParkingFormData = z.infer<typeof ParkingSchema>
