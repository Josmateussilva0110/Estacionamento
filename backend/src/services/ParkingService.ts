import db from "../database/connection/connection"
import Parking from "../model/Parking"
import Contact from "../model/Contact"
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

        console.log("nomr: ", normalized)

        const parkingId = await Parking.save(
          {
            parking_name: normalized.parking_name as string,
            manager_name: normalized.manager_name as string,
            created_by: userId,
          },
          { trx }
        )

        await Contact.save(
          {
            parking_id: parkingId,
            phone: data.contacts.phone as string,
            whatsapp: data.contacts.whatsapp as string,
            email: data.contacts.email as string,
            open_hours: {
              start: data.contacts.openingHours.start,
              end: data.contacts.openingHours.end,
            },
          },
          { trx }
        )

        return parkingId
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
