import { z } from "zod"
import { RegisterClientSchema } from "../schemas/RegisterClientSchema"

export type RegisterClientFormData = z.infer<typeof RegisterClientSchema>
