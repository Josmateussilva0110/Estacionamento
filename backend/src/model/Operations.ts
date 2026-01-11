import Model from "./Model"
import db from "../database/connection/connection"
import { PgRawResult } from "../types/database/BdResult"
import { type SpotsRow } from "../types/allocation/spots"
import { type SpotResponse } from "../mappers/spots.mapper"
import { mapSpotsList } from "../mappers/spots.mapper"


export interface OperationsData {
  id?: number
  parking_id: number
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

  async getSpotsByUser(parking_id: number): Promise<SpotResponse[]> {
    try {
      const result = await db.raw<PgRawResult<SpotsRow>>(
        `
            select 
                o.parking_id, o.total_spots, o.car_spots, o.moto_spots,
                o.truck_spots, o.pcd_spots, o.elderly_spots
                from parking_operations o
                where o.parking_id = ? 
            `,
        [parking_id]
      )

      if (!result.rows.length) {
        return []
      }

      return mapSpotsList(result.rows)

    } catch (err) {
      console.error(
        `Erro ao buscar vagas da tabela: ${this.tableName}`,
        err
      )
      return []
    }
  }


}

export default new ParkingOperations()
