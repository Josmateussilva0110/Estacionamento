import Model from "./Model"
import OpeningHours from "../types/hour/hour"
import db from "../database/connection/connection"


export interface ContactData {
  id?: number
  parking_id: number
  phone: string
  whatsapp: string
  email: string
  open_hours: OpeningHours
  created_at?: string 
  updated_at?: string
}

class ParkingContact extends Model<ContactData> {
  constructor() {
    super("parking_contact")
  }

  async emailExist(email: string): Promise<boolean> {
    try {
      const result = await db(this.tableName)
      .select("id")
      .where({ email })
      .first()
      return !!result
    } catch(err) {
      console.error(`Erro ao verificar e-mail na tabela ${this.tableName}:`, err)
      return false
    }
  }


}

export default new ParkingContact()
