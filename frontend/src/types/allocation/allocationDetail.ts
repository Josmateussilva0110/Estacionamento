import { type PaymentType } from "../../types/parking/paymentType"
export interface AllocationDetail {
    id: number
    clientName: string
    phone: string
    parkingName: string
    plate: string
    brand: string
    vehicleType: string
    entryDate: string
    observations?: string
    paymentType: PaymentType
    currentDuration: number
    estimatedCost: number
}
