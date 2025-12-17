import Model from "./Model"
//import db from "../database/connection/connection"


export interface OperationsData {
  id?: number
  total_spots: number
  car_spots: number
  moto_spots: number
  truck_spots: number
  pcd_spots: number
  elderly_spots: number
  has_cameras: boolean
  has_washing: boolean
  area_type: number
  created_at?: string 
  updated_at?: string
}

class ParkingOperations extends Model<OperationsData> {
  constructor() {
    super("parking_operations")
  }


}

export default new ParkingOperations()
