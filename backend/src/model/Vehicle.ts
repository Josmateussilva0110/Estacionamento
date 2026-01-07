import Model from "./Model"
import db from "../database/connection/connection"

export interface VehicleData {
  id?: string
  plate: string
  brand: string
  color: string
  client_id: string
  vehicle_type: number
  created_at?: string 
  updated_at?: string
}

class Vehicle extends Model<VehicleData> {
    constructor() {
        super("vehicles")
    }

    async plateExists(plate: string): Promise<boolean> {
        try {
            const result = await db(this.tableName)
            .select("id")
            .where({ plate })
            .first()

            return !!result
        } catch (err) {
            console.error(`Erro ao verificar placa na tabela ${this.tableName}:`, err)
            return false
        }
    }
}

export default new Vehicle()
