import db from "../database/connection/connection"
import Parking from "../model/Parking"
import { ParkingRegisterDTO } from "../dtos/ParkingRegisterDTO"
import { normalizeKeys, Normalized } from "../utils/normalizeKeys"
import { ServiceResult } from "../types/serviceResults/ServiceResult"

class ParkingService {
  async register(
    data: ParkingRegisterDTO,
    userId: number
  ): Promise<ServiceResult<{ parkingId: number }>> {
    try {
      const parkingId = await db.transaction(async (trx) => {
        const normalized = normalizeKeys(data) as Record<string, Normalized>

        return Parking.save(
          {
            parking_name: normalized.parking_name as string,
            manager_name: normalized.manager_name as string,
            created_by: userId,
          },
          { trx }
        )
      })

      return {
        status: true,
        data: { parkingId },
      }
    } catch (error) {
      console.error("ParkingService.register:", error)

      return {
        status: false,
        error: {
          code: "PARKING_CREATE_FAILED",
          message: "Erro ao criar estacionamento",
        },
      }
    }
  }
}


export default new ParkingService()
