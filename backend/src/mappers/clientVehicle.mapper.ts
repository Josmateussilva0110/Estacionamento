import { type ClientAndVehicleRow } from "../types/clients/clientAndVehicle" 

export interface ClientVehicleResponse {
  id: number
  name: string
  phone: string
  plate: string
  vehicle: string
  status?: number
  updatedAt?: string
}

export function mapClientVehicleRowList(rows: ClientAndVehicleRow[]): ClientVehicleResponse[] {
  return rows.map((row) => ({
    id: row.client_id!,
    name: row.username,
    phone: row.phone,
    plate: row.plate,
    vehicle: `${row.brand} ${row.color}`,
    status: row.clientStatus,
    updatedAt: row.updated_at,
  }))
}
