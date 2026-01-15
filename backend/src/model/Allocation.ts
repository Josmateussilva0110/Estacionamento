import Model from "./Model"
import db from "../database/connection/connection"
import { PgRawResult } from "../types/database/BdResult"

export interface AllocationData {
  id?: number
  parking_id: number
  client_id: number
  vehicle_id: number
  vehicle_type: number
  entry_date: string
  observations: string
  created_at?: string
  updated_at?: string
}

class Allocation extends Model<AllocationData> {
    constructor() {
        super("allocations")
    }

    async vehicleExists(vehicle_id: number): Promise<boolean> {
        try {
            const result = await db(this.tableName)
            .select("id")
            .where({ vehicle_id })
            .first()

            return !!result
        } catch (err) {
            console.error(`Erro ao verificar veiculo na tabela ${this.tableName}:`, err)
            return false
        }
    }

}


export default new Allocation()
