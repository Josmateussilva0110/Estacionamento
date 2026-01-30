import { type VehiclesDetails } from "./vehiclesDetail" 

export interface PaginatedVehiclesResult {
  rows: VehiclesDetails[]
  total: number
}
