import { type VehicleType } from "../utils/vehicleUtils"
import { type SpotStatus } from "../utils/statusUtils"


export interface ParkingSpot {
  id: number
  number: string
  type: VehicleType
  status: SpotStatus
  floor: string
}

export type Step = "search" | "select-spot" | "confirm"
