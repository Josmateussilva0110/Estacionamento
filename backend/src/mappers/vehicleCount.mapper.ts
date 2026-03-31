import { type VehicleCount } from "../types/stats/revenue" 

export interface StatsVehicleCount {
  parkingId: string
  countVehicles: number
  paymentType: string  
}

export function mapVehicleCount(rows: VehicleCount[]): StatsVehicleCount[] {
  return rows.map((row) => ({
    parkingId: row.parking_id,
    countVehicles: row.count_vehicles,
    paymentType: row.payment_type
  }))
}
