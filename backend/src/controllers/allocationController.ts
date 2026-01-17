import { Request, Response } from "express"
import AllocationService from "../services/AllocationService"
import { allocationErrorHttpStatusMap } from "../utils/allocationErrorHttpMapper" 
import { getHttpStatusFromError } from "../utils/getHttpStatusFromError"

class AllocationController {
    async getSpots(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params
        const result = await AllocationService.findSpots(user_id)
        if (!result.status) {
            const httpStatus = getHttpStatusFromError(
            result.error!.code,
            allocationErrorHttpStatusMap
            )

            return response.status(httpStatus).json({
            status: false,
            message: result.error?.message,
            })
        }

        return response.status(200).json({status: true, spots: result.data})   
    }

    async allocation(request: Request, response: Response): Promise<Response> {
        const result = await AllocationService.allocation(request.body)
        if(!result.status) {
            const httpStatus = getHttpStatusFromError(result.error!.code, allocationErrorHttpStatusMap)
            return response.status(httpStatus).json({status: false, message: result.error?.message})
        }

        return response.status(201).json({status: true, allocation_id: result.data, message: "Alocação cadastrada com sucesso",})
    }
}


export default new AllocationController()
