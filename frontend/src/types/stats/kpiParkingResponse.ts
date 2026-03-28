import { type KpiParkings } from "./kpiParking"

export interface KpiParkingsResponse {
    kpis: KpiParkings
    totalRevenue: number
}
