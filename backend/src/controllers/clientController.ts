import { Request, Response } from "express"
import ClientService from "../services/ClientService"
import { userErrorHttpStatusMap } from "../utils/userErrorHttpMapper"
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
}


export default new ClientController()
