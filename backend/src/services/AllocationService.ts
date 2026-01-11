import Operations from "../model/Operations"
import Parking from "../model/Parking"
import { ServiceResult } from "../types/serviceResults/ServiceResult"
import { AllocationErrorCode } from "../types/code/allocation"
import { ParkingErrorCode } from "../types/code/parkingCode"
import { type SpotResponse } from "../mappers/spots.mapper" 


class AllocationService {

    async findSpots(user_id: string): Promise<ServiceResult<SpotResponse[]>> {
        try {
            const parking = await Parking.findById(user_id, "created_by")
            if (!parking || !parking.id) {
                return {
                    status: false,
                    error: {
                    code: ParkingErrorCode.PARKING_NOT_FOUND,
                    message: "Estacionamento não encontrado",
                    },
                }
            }

            const spots = await Operations.getSpotsByUser(parking.id)
            if (spots.length === 0) {
                return {
                    status: false,
                    error: {
                    code: AllocationErrorCode.SPOTS_NOT_FOUND,
                    message: "Vagas não encontradas",
                    },
                }
            }


            return {status: true, data: spots}

        } catch(error) {
            console.error("AllocationService.findSpots error:", error)

            return {
                status: false,
                error: {
                    code: AllocationErrorCode.SPOTS_FETCH_FAILED,
                    message: "Erro interno ao buscar vagas",
                },
            }
        }
    }
}

export default new AllocationService()
