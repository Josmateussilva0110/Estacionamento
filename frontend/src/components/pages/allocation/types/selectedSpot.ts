import { type VehicleType } from "../utils/vehicleUtils"


export interface SelectedSpotInfo {
  type: VehicleType | "pcd" | "elderly"
  parking: {
    id: number
    name: string
  }
}
