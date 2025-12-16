import Model from "./Model"
import OpeningHours from "../types/hour/hour"
//import db from "../database/connection/connection"


export interface ContactData {
  id?: number
  phone: string
  whatsapp: string
  email: string
  opening_hours: OpeningHours
  created_at?: string 
  updated_at?: string
}

class ParkingContact extends Model<ContactData> {
  constructor() {
    super("parking_contact")
  }


}

export default new ParkingContact()
