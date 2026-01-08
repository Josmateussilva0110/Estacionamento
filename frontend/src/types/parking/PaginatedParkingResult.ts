import { type ParkingDetails } from "./parkingDetail"

export interface PaginatedParkingResult {
  rows: ParkingDetails[]
  total: number
}
