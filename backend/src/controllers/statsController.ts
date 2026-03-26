import { Request, Response } from "express"
import AllocationService from "../services/AllocationService"
import { allocationErrorHttpStatusMap } from "../errors/allocationErrorHttpMapper" 
import { SpotServiceErrorHttpStatusMap } from "../errors/allocationParkingErrorMapper"
import { getHttpStatusFromError } from "../utils/getHttpStatusFromError"

class AllocationController {
    async getKpiParking(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params
        const result = await AllocationService.findSpots(user_id)
        if (!result.status) {
            const httpStatus = getHttpStatusFromError(
            result.error!.code,
            SpotServiceErrorHttpStatusMap
            )

            return response.status(httpStatus).json({
            success: false,
            message: result.error?.message,
            })
        }

        return response.status(200).json({success: true, data: result.data})   
    }
}


export default new AllocationController()
