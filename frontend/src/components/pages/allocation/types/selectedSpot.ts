import { type VehicleType } from "../utils/vehicleUtils"


export interface SelectedSpotInfo {
  type: VehicleType 
  parking: {
    id: number
    name: string
  }
}
