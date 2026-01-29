import Operations from "../model/Operations"
import Parking from "../model/Parking"
import Allocation from "../model/Allocation"
import { ServiceResult } from "../types/serviceResults/ServiceResult"
import { AllocationErrorCode } from "../types/code/allocation"
import { ParkingErrorCode } from "../types/code/parkingCode"
import { type SpotResponse } from "../mappers/spots.mapper" 
import { AllocationDetailDTO } from "../dtos/AllocationDetailDTO"
import { type PaginatedAllocationsServiceResult } from "../types/allocation/paginatedAllocationServiceResult"
import { calculateHourlyStayValue } from "../utils/calculateEstimatedCost"


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

    async allocation(data: {
        client_id: number,
        parking_id: number,
        vehicle_id: number,
        vehicle_type: number,
        entry_date: string,
        observations: string
    }): Promise<ServiceResult<{ id: number}>> {
        try {
            const vehicleExist = await Allocation.vehicleExists(data.vehicle_id)
            if(vehicleExist) {
                return {
                    status: false,
                    error: {
                        code: AllocationErrorCode.VEHICLE_ALREADY_EXISTS,
                        message: "Veiculo já tem vaga alocada"
                    }
                }
            }

            const success = await Allocation.save(data)
            if (!success) {
                return {
                    status: false,
                    error: {
                    code: AllocationErrorCode.ALLOCATION_CREATE_FAILED,
                    message: "Erro ao cadastrar alocação",
                    },
                }
            }

            return { status: true, data: {
                id: success
            }}

        } catch(error) {
            console.error("AllocationService.allocation: ", error)
            return {
                status: false,
                error: {
                    code: AllocationErrorCode.ALLOCATION_CREATE_FAILED,
                    message: "Erro interno ao cadastrar alocação"
                }
            }
        }
    }

    async getAllocations(user_id: string, page: number, limit: number): Promise<ServiceResult<PaginatedAllocationsServiceResult | null>> {
        try {
            const result = await Allocation.getAllocationByUser(user_id, page, limit)
            if(!result || result.total === 0) {
                return {
                    status: false,
                    error: {
                        code: AllocationErrorCode.ALLOCATION_NOT_FOUND,
                        message: "Nenhuma alocação encontrada"
                    }
                }
            }

            const value = calculateHourlyStayValue({
                entryAt: new Date("2026-01-26T16:30:00"),
                exitAt: new Date("2026-01-27T02:00:00"),

                pricePerHour: 10.25,
                nightPricePerHour: 12,
                vehicleFixedPrice: 5,

                nightPeriod: {
                    start: "17:00",
                    end: "23:00",
                },
            })

            //console.log("cost: ", value)


            const estimatedCost = value
            const mapped: AllocationDetailDTO[] = result.rows.map((row) => ({
                id: row.allocation_id,
                clientName: row.client_name,
                phone: row.phone,
                parkingName: row.parking_name,
                plate: row.plate,
                brand: row.brand,
                vehicleType: row.vehicle_type,
                entryDate: row.entry_date,
                observations: row.observations,
                currentDuration: row.current_duration,
                estimatedCost: estimatedCost
            }))  


            return {status: true, data: {rows: mapped, total: result.total}}

        } catch(error) {
            console.error("AllocationService.getAllocations: ", error)
            return {
                status: false,
                error: {
                    code: AllocationErrorCode.ALLOCATION_FETCH_FAILED,
                    message: "Erro interno ao buscar alocações"
                }
            }
        }
    }
}

export default new AllocationService()
