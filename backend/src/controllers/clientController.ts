import { Request, Response } from "express"
import ClientService from "../services/ClientService"
import { userErrorHttpStatusMap } from "../utils/userErrorHttpMapper"
import { vehicleErrorHttpStatusMap } from "../utils/vehicleErrorHttpMapper"
import { getHttpStatusFromError } from "../utils/getHttpStatusFromError"

class ClientController {
    async register(request: Request, response: Response): Promise<Response> {
        const result = await ClientService.register(request.body)

        if (!result.status) {
            const httpStatus = getHttpStatusFromError(
            result.error!.code,
            userErrorHttpStatusMap
            )

            return response.status(httpStatus).json({
            status: false,
            message: result.error?.message,
            })
        }

        return response.status(201).json({
            status: true,
            message: "Cliente cadastrado com sucesso",
            user: result.data,
        })
    }

    async registerVehicle(request: Request, response: Response): Promise<Response> {
        const result = await ClientService.registerVehicle(request.body)
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

    async getClients(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params
        const result = await ClientService.findClientsByIdUser(user_id)
        if (!result.status) {
            const httpStatus = getHttpStatusFromError(
            result.error!.code,
            userErrorHttpStatusMap
            )

            return response.status(httpStatus).json({
            status: false,
            message: result.error?.message,
            })
        }

        return response.status(200).json({status: true, clients: result.data})   
    }

    async getClientAndVehicle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params
        const result = await ClientService.findClientsAndVehicle(user_id)
        if(!result.status) {
            const httpStatus = getHttpStatusFromError(
            result.error!.code,
            userErrorHttpStatusMap
            )

            return response.status(httpStatus).json({
            status: false,
            message: result.error?.message,
            })
        }

        return response.status(200).json({status: true, clients: result.data})
    }

    async listClients(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params
        const page = Number(request.query.page ?? 1)
        const limit = Number(request.query.limit ?? 3)
        const result = await ClientService.listClients(user_id, page, limit)
        if(!result.status) {
            const httpStatus = getHttpStatusFromError(
            result.error!.code,
            userErrorHttpStatusMap
            )
            return response.status(httpStatus).json({
                status: false,
                message: result.error?.message,
            })
        }

        return response.status(200).json({
            status: true,
            clients: result.data
        })
    }

    async listVehicle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params
        const page = Number(request.query.page ?? 1)
        const limit = Number(request.query.limit ?? 3) 
        const result = await ClientService.listVehicles(user_id, page, limit)
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

    async remove(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const result = await ClientService.removeClient(id)
        if(!result.status) {
            const httpStatus = getHttpStatusFromError(
            result.error!.code,
            userErrorHttpStatusMap
            )
            return response.status(httpStatus).json({
                status: false,
                message: result.error?.message,
            })
        }
        return response.status(200).json({status: true, message: "Cliente removido com sucesso", clientId: result.data?.client_id})
    }

    async removeVehicle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const result = await ClientService.removeVehicle(id)
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
}


export default new ClientController()
