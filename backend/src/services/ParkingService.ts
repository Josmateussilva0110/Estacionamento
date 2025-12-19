import db from "../database/connection/connection"
import Parking from "../model/Parking"
import Contact from "../model/Contact"
import Address from "../model/Address"
import Operations from "../model/Operations"
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

        const parkingId = await Parking.save(
          {
            parking_name: normalized.parking_name as string,
            manager_name: normalized.manager_name as string,
            created_by: userId,
          },
          { trx }
        )

        await Address.save({
          parking_id: parkingId,
          street: data.address.street,
          number: data.address.number,
          complement: data.address.complement,
          district: data.address.district,
          city: data.address.city,
          state: data.address.state,
          zip_code: data.address.zipCode
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

        await Operations.save({
          parking_id: parkingId,
          total_spots: data.operations.totalSpots,
          car_spots: data.operations.carSpots,
          moto_spots: data.operations.motoSpots,
          truck_spots: data.operations.truckSpots,
          pcd_spots: data.operations.pcdSpots,
          elderly_spots: data.operations.elderlySpots,
          has_cameras: data.operations.hasCameras,
          has_washing: data.operations.hasWashing,
          area_type: data.operations.areaType
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
