import { Request, Response } from "express"
import { ParkingRegisterDTO } from "../dtos/ParkingRegisterDTO"
import ParkingService from "../services/ParkingService"


class ParkingController {
  async register(request: Request, response: Response): Promise<Response> {
    try {
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
        return response.status(400).json({
          status: false,
          message: result.error?.message ?? "Erro ao processar requisição",
        })
      }

      return response.status(201).json({
        status: true,
        message: "Estacionamento cadastrado com sucesso"
      })

    } catch (error) {
      console.error("Erro ao cadastrar estacionamento:", error)

      return response.status(500).json({
        status: false,
        message: "Erro interno no servidor",
      })
    }
  }
}


export default new ParkingController()
