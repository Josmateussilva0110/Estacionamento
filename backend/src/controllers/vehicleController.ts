import { Request, Response } from "express"
import VehicleService from "../services/VehicleService"
import { vehicleErrorHttpStatusMap } from "../utils/vehicleErrorHttpMapper"
import { getHttpStatusFromError } from "../utils/getHttpStatusFromError"
import { VehicleEditDTO } from "../dtos/VehicleEditDTO"

class VehicleController {
    async registerVehicle(request: Request, response: Response): Promise<Response> {
        const result = await VehicleService.registerVehicle(request.body)
        if (!result.status) {
            const httpStatus = getHttpStatusFromError(
            result.error!.code,
            vehicleErrorHttpStatusMap
            )

            return response.status(httpStatus).json({
            status: false,
            message: result.error?.message,
            })
        }

        return response.status(201).json({
            status: true,
            message: "Veiculo cadastrado com sucesso",
            plate: result.data
        })
    }


    async listVehicle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params
        const page = Number(request.query.page ?? 1)
        const limit = Number(request.query.limit ?? 3) 
        const result = await VehicleService.listVehicles(user_id, page, limit)
        if(!result.status) {
            const httpStatus = getHttpStatusFromError(
            result.error!.code,
            vehicleErrorHttpStatusMap
            )
            return response.status(httpStatus).json({
                status: false,
                message: result.error?.message,
            })
        }
        return response.status(200).json({status: true, vehicles: result.data})
    }


    async removeVehicle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const result = await VehicleService.removeVehicle(id)
        if(!result.status) {
            const httpStatus = getHttpStatusFromError(
            result.error!.code,
            vehicleErrorHttpStatusMap
            )
            return response.status(httpStatus).json({
                status: false,
                message: result.error?.message,
            })
        }
        return response.status(200).json({status: true, message: "Veículo removido com sucesso", vehicleId: result.data?.vehicle_id})
    }


    async getVehicleDetail(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const result = await VehicleService.vehicleDetail(id)
        if(!result.status) {
            const httpStatus = getHttpStatusFromError(
            result.error!.code,
            vehicleErrorHttpStatusMap
          )
          return response.status(httpStatus).json({status: false, message: result.error?.message})
        }
        return response.status(200).json({status: true, vehicle: result.data})
    }

    async editVehicle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const data: VehicleEditDTO = request.body
        const result = await VehicleService.editVehicle(id, data)
        if(!result.status) {
            const httpStatus = getHttpStatusFromError(
            result.error!.code,
            vehicleErrorHttpStatusMap
            )
            return response.status(httpStatus).json({
                status: false,
                message: result.error?.message,
            })
        }
        return response.status(200).json({status: true, message: "Veículo atualizado com sucesso", vehicle_id: result.data?.vehicle_id})
    }
}


export default new VehicleController()
