import { Request, Response } from "express"
import { ParkingRegisterDTO } from "../dtos/ParkingRegisterDTO"


class ParkingController {
  async register(request: Request, response: Response): Promise<Response> {
    try {
        const data: ParkingRegisterDTO = request.body
        console.log(data)
        return response.status(201).json({status: false, message: "Estacionamento cadastrado com sucesso"})
    } catch (err) {
      console.error("Erro ao cadastrar usuário: ", err)
      return response.status(500).json({ status: false, message: "Erro interno no servidor" })
    }
  }

}

export default new ParkingController()
