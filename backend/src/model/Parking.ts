import Model from "./Model"
//import db from "../database/connection/connection"

export interface ParkingData {
  id?: number
  parking_name: string
  manager_name: string
  created_by: number
  created_at?: string 
  updated_at?: string
}

class Parking extends Model<ParkingData> {
  constructor() {
    super("parking")
  }


}

export default new Parking()
