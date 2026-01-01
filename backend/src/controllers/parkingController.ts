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
          message: result.error!.message ?? "Erro ao processar requisição",
        })
      }

      return response.status(201).json({
        status: true,
        message: "Estacionamento cadastrado com sucesso"
      })
  }

  async list(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const page = Number(request.query.page ?? 1)
    const limit = Number(request.query.limit ?? 3)
    const result = await ParkingService.list(id, page, limit)

      if (!result.status) {
          const httpStatus = getHttpStatusFromError(
            result.error!.code,
            ParkingErrorHttpStatusMap
          )
        return response.status(httpStatus).json({
          status: false,
          message: result.error?.message,
        })
      }

      return response.status(200).json({
        status: true,
        parking: result.data
      })
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const result = await ParkingService.delete(id)
    if(!result.status) {
      const httpStatus = getHttpStatusFromError(
        result.error!.code,
        ParkingErrorHttpStatusMap
      )
      return response.status(httpStatus).json({
        status: false,
        message: result.error?.message,
      })
    }
    
    return response.status(200).json({
      status: true,
      message: "Estacionamento removido com sucesso",
      parkingId: result.data?.id
    })
  }

  async getParking(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const result = await ParkingService.getById(id)
    if(!result.status) {
      const httpStatus = getHttpStatusFromError(
        result.error!.code,
        ParkingErrorHttpStatusMap
      )
      return response.status(httpStatus).json({
        status: false,
        message: result.error?.message,
      })
    }
    return response.status(200).json({
      status: true,
      parking: result.data
    })
  }

  async edit(request: Request, response: Response): Promise<Response> {
    const data: ParkingRegisterDTO = request.body
    const { id } = request.params

    const userId = request.session.user?.id
    if (!userId) {
      return response.status(401).json({
        status: false,
        message: "Usuário não autenticado",
      })
    }

    const result = await ParkingService.update(data, userId, id)

    if (!result.status) {
        const httpStatus = getHttpStatusFromError(
          result.error!.code,
          ParkingErrorHttpStatusMap
        )
      return response.status(httpStatus).json({
        status: false,
        message: result.error!.message ?? "Erro ao processar requisição",
      })
    }

    return response.status(201).json({
      status: true,
      message: "Estacionamento editado com sucesso"
    })
  }
}


export default new ParkingController()
