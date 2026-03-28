import Model from "./Model"
import db from "../database/connection/connection"
import { PgRawResult } from "../types/database/BdResult"
import { type KpiParkings } from "../types/stats/parkings"
import { type AllocationPrinces } from "../types/allocation/allocationData"
import { mapStatsAllocations } from "../mappers/stats.mapper"

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

class Stats extends Model<AllocationData> {
    constructor() {
        super("allocations")
    }

    async getKpiParkings(user_id: string): Promise<KpiParkings | null> {
        try {
            const result = await db.raw<PgRawResult<KpiParkings>>(
                `
                  SELECT 
                    p.id AS parking_id,
                    COALESCE(a_count.occupied, 0) AS occupied,
                    po.total_spots - COALESCE(a_count.occupied, 0) AS vacancies_available,
                    COALESCE(today_count.entries_today, 0) AS entries_today
                  FROM parking p
                  INNER JOIN parking_operations po
                      ON po.parking_id = p.id
                  -- total ocupado
                  LEFT JOIN (
                      SELECT parking_id, COUNT(*) AS occupied
                      FROM allocations
                      GROUP BY parking_id
                  ) a_count
                      ON a_count.parking_id = p.id
                  -- entradas de hoje
                  LEFT JOIN (
                      SELECT parking_id, COUNT(*) AS entries_today
                      FROM allocations
                      WHERE DATE(entry_date) = CURRENT_DATE
                      GROUP BY parking_id
                  ) today_count
                      ON today_count.parking_id = p.id
                  WHERE p.created_by = ?;
                `,
                [user_id]
            )

            const rows = result.rows[0]
            if(!rows) {
                return null
            }

            return rows

        } catch(err) {
            console.log(`Erro ao buscar dados de alocações na tabela ${this.tableName}:, err`)
            return null
        }
    }

}


export default new Stats()
