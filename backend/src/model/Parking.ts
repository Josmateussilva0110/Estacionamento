import Model from "./Model"
import db from "../database/connection/connection"
import { ParkingDetailsDTO } from "../dtos/ParkingDetailsDTO"
import { type PaginatedParkingResult } from "../types/parking/PaginatedParkingResult"
import { type ParkingDetailsRow } from "../types/parking/ParkingDetailsRow"
import { type PgRawResult } from "../types/database/BdResult"
import { parseOpeningHours } from "../utils/parseOpeningHours"

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

  async findByIdUser(id: string, page: number, limit: number): Promise<PaginatedParkingResult | null> {
    const offset = (page - 1) * limit
    try {
      const result = await db.raw<PgRawResult<ParkingDetailsRow>>(
        `
        select 
          p.id as id,
          p.parking_name as "parkingName",
          p.manager_name as "managerName",

          pa.street as address_street,
          pa.number as address_number,
          pa.district as address_district,
          pa.city as address_city,
          pa.state as address_state,

          pc.phone as contact_phone,
          pc.open_hours as "openingHours",

          po.total_spots as ops_total,
          po.car_spots as ops_car,
          po.moto_spots as ops_moto,
          po.has_cameras as ops_cameras,

          pp.price_hour as price_hour
        from parking p
        inner join parking_address pa on pa.parking_id = p.id
        inner join parking_contact pc on pc.parking_id = p.id
        inner join parking_operations po on po.parking_id = p.id
        inner join parking_prices pp on pp.parking_id = p.id
        where p.created_by = ?
        order by p.created_at desc
        limit ?
        offset ?
        `,
        [id, limit, offset]
      )

      const countResult = await db.raw<PgRawResult<{ total: string }>>(
        `
        select count(*) as total
        from parking
        where created_by = ?
        `,
        [id]
      )

      const total = Number(countResult.rows[0].total)

      const rows = result.rows
      const mapped: ParkingDetailsDTO[] = rows.map((row) => ({
        id: row.id,
        parkingName: row.parkingName,
        managerName: row.managerName,

        address: {
          street: row.address_street,
          number: row.address_number,
          district: row.address_district,
          city: row.address_city,
          state: row.address_state,
        },

        contacts: {
          phone: row.contact_phone,
          openingHours: parseOpeningHours(row.openingHours),
        },

        operations: {
          totalSpots: row.ops_total,
          carSpots: row.ops_car,
          motoSpots: row.ops_moto,
          hasCameras: Boolean(row.ops_cameras),
        },

        prices: {
          priceHour: row.price_hour,
        },
      }))

      return {
        rows: mapped,
        total,
      }

    } catch (err) {
      console.error(
        `Erro ao buscar estacionamentos tabela: ${this.tableName}`,
        err
      )
      return null
    }
  }
}

export default new Parking()
