import { z } from "zod"
import { ParkingSchema } from "../utils/parkingSchema"

export type ParkingFormData = z.infer<typeof ParkingSchema>
