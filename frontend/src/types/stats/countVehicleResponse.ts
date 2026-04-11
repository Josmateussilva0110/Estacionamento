import { type CountVehicles } from "./countVehicle" 

export interface CountVehicleTypeResponse {
    total: number
    data: CountVehicles[]
}
