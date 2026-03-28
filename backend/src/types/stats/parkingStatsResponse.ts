import { type KpiParkings } from "./parkings"

export interface KpiParkingsResponse {
    kpis: KpiParkings
    totalRevenue: number
}
