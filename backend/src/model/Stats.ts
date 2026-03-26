import Model from "./Model"
import db from "../database/connection/connection"
import { ParkingDetailsDTO } from "../dtos/ParkingDetailsDTO"
import { ParkingEditDTO } from "../dtos/ParkingEditDTO"
import { type PaginatedParkingResult } from "../types/parking/PaginatedParkingResult"
import { type ParkingDetailsRow } from "../types/parking/ParkingDetailsRow"
import { type PgRawResult } from "../types/database/BdResult"
import { parseOpeningHours } from "../utils/parseOpeningHours"
import { type ParkingEditRow } from "../types/parking/ParkingEdit"
import { type ParkingRow } from "../types/parking/parking"
import { mapParkingRowList } from "../mappers/parking.mapper"
import { type ParkingResponse } from "../mappers/parking.mapper"

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

  async getNames(user_id: string): Promise<ParkingResponse[]> {
    try {
      const result = await db.raw<PgRawResult<ParkingRow>>(
        `
        select 
            p.id as parking_id, 
            p.parking_name,
            p.manager_name,
            p.created_by,
            p.updated_at
        from parking p
        where p.created_by = ?
        `,
        [user_id]
        )

        if (!result.rows.length) {
        return []
        }

        return mapParkingRowList(result.rows)

    } catch (err) {
        console.error(
        `Erro ao buscar nomes de estacionamentos da tabela: ${this.tableName}`,
        err
        )
        return []
    }
  }
}

export default new Parking()
