import { type SpotsRow } from "../types/allocation/spots" 

export interface SpotResponse {
    parking_id?: number
    totalSpots: number
    carSpots: number
    motoSpots: number
    truckSpots: number
    pcdSpots: number
    elderlySpots: number
}

export function mapSpotsList(rows: SpotsRow[]): SpotResponse[] {
    return rows.map((row) => ({
        parking_id: row.parking_id,
        totalSpots: row.total_spots,
        carSpots: row.car_spots,
        motoSpots: row.moto_spots,
        truckSpots: row.truck_spots,
        pcdSpots: row.pcd_spots,
        elderlySpots: row.elderly_spots
    }))
}
