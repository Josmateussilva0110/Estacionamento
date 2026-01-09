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
}


export default new ClientController()
