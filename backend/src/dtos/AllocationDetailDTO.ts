export interface AllocationDetailDTO {
    id: string
    clientName: string
    phone: string
    parkingName: string
    plate: string
    brand: string
    vehicleType: string
    entryDate: string
    observations?: string
    currentDuration: number
    estimatedCost: number
}
