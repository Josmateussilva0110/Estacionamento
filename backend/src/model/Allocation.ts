import Model from "./Model"
import db from "../database/connection/connection"
import { PgRawResult } from "../types/database/BdResult"
import { type AllocationDetail } from "../types/allocation/allocationDetail"
import { type PaginatedAllocationsResult } from "../types/allocation/paginatedAllocationsResult"

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

    async getAllocationByUser(user_id: string, page: number, limit: number): Promise<PaginatedAllocationsResult | null> {
        const offset = (page - 1) * limit
        try {
            const result = await db.raw<PgRawResult<AllocationDetail>>(
                `
                    select 
                       a.id as allocation_id, a.entry_date, a.observations, a.payment_type,
                       c.username as client_name, c.phone,
                       v.plate, v.brand, 
                       CASE
                            when v.vehicle_type = 1 then 'carro'
                            when v.vehicle_type = 2 then 'moto'
                            when v.vehicle_type = 3 then 'caminhonete'
                            else 'desconhecido'
                       end as vehicle_type,
                       p.parking_name,
                       FLOOR(EXTRACT(EPOCH FROM (NOW() - a.entry_date)) / 60)::int as current_duration,
                       pp.price_hour as price_per_hour,
                       pp.night_rate as night_price_per_hour,
                       pp.night_period,
                       pp.daily_rate,
                       CASE
                            WHEN v.vehicle_type = 1 THEN pp.car_price
                            WHEN v.vehicle_type = 2 THEN pp.moto_price
                            WHEN v.vehicle_type = 3 THEN pp.truck_price
                            ELSE 0
                        END AS vehicle_fixed_price,
                       count(*) over() as total
                    from allocations a
                    inner join clients c
                        on c.id = a.client_id
                    inner join vehicles v
                        on v.id = a.vehicle_id
                    inner join parking p
                        on p.id = a.parking_id
                    inner join parking_prices pp
                        on pp.parking_id = p.id
                    where p.created_by = ?
                    order by a.created_at desc
                    limit ?
                    offset ?
                `,
                [user_id, limit, offset]
            )

            const rows = result.rows
            if(!rows.length) {
                return { rows: [], total: 0}
            }

            const total = Number(rows[0].total)

            return { rows: result.rows, total: total}


        } catch(err) {
            console.log(`Erro ao buscar alocações na tabela ${this.tableName}:, err`)
            return null
        }
    }

}


export default new Allocation()
