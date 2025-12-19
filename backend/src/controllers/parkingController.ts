import { Request, Response } from "express"
import { ParkingRegisterDTO } from "../dtos/ParkingRegisterDTO"
import ParkingService from "../services/ParkingService"
import { ParkingErrorHttpStatusMap } from "../utils/parkingErrorHttpMapper"
import { getHttpStatusFromError } from "../utils/getHttpStatusFromError"

class ParkingController {
  async register(request: Request, response: Response): Promise<Response> {
      const data: ParkingRegisterDTO = request.body

      const userId = request.session.user?.id
      if (!userId) {
        return response.status(401).json({
          status: false,
          message: "Usuário não autenticado",
        })
      }

      const result = await ParkingService.register(data, userId)

      if (!result.status) {
          const httpStatus = getHttpStatusFromError(
            result.error!.code,
            ParkingErrorHttpStatusMap
          )
        return response.status(httpStatus).json({
          status: false,
          message: result.error?.message ?? "Erro ao processar requisição",
        })
      }

      return response.status(201).json({
        status: true,
        message: "Estacionamento cadastrado com sucesso"
      })
  }
}


export default new ParkingController()
