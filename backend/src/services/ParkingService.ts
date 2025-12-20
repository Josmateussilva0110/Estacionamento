import db from "../database/connection/connection"
import Parking from "../model/Parking"
import Contact from "../model/Contact"
import Address from "../model/Address"
import Operations from "../model/Operations"
import Prices from "../model/Prices"
import { ParkingRegisterDTO } from "../dtos/ParkingRegisterDTO"
import { ServiceResult } from "../types/serviceResults/ServiceResult"
import { ParkingErrorCode } from "../types/code/parkingCode"


class ParkingService {
  async register(
    data: ParkingRegisterDTO,
    userId: number
  ): Promise<ServiceResult<{ parkingId: number }>> {

    const emailExist = await Contact.emailExist(data.contacts.email)
    if(emailExist) {
      return {
        status: false,
        error: {
          code: ParkingErrorCode.EMAIL_ALREADY_EXISTS,
          message: "Email de contato já existe"
        }
      }
    }
    try {
      const parkingId = await db.transaction(async (trx) => {

        const createdParkingId = await Parking.save(
          {
            parking_name: data.parkingName,
            manager_name: data.managerName,
            created_by: userId,
          },
          { trx }
        )

        await Address.save({
          parking_id: createdParkingId,
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
            parking_id: createdParkingId,
            phone: data.contacts.phone,
            whatsapp: data.contacts.whatsapp,
            email: data.contacts.email,
            open_hours: {
              start: data.contacts.openingHours.start,
              end: data.contacts.openingHours.end,
            },
          },
          { trx }
        )

        await Operations.save({
          parking_id: createdParkingId,
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

        await Prices.save({
          parking_id: createdParkingId,
          price_hour: data.prices.priceHour,
          price_extra_hour: data.prices.priceExtraHour,
          daily_rate: data.prices.dailyRate,
          night_period: {
            start: data.prices.nightPeriod.start,
            end: data.prices.nightPeriod.end,
          },
          night_rate: data.prices.nightRate,
          monthly_rate: data.prices.monthlyRate,
          car_price: data.prices.carPrice,
          moto_price: data.prices.motoPrice,
          truck_price: data.prices.truckPrice
        },
          { trx }
        )
        return createdParkingId
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
          code: ParkingErrorCode.PARKING_CREATE_FAILED,
          message: "Erro ao criar estacionamento",
        },
      }
    }
  }
}

export default new ParkingService()
