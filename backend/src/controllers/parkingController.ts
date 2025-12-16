import { Request, Response } from "express"
import User, { UserData } from "../model/User"
import bcrypt from "bcrypt"

class ParkingController {
  async register(request: Request, response: Response): Promise<Response> {
    try {
        return response.status(201).json({status: false, message: "Estacionamento cadastrado com sucesso"})
    } catch (err) {
      console.error("Erro ao cadastrar usuário: ", err)
      return response.status(500).json({ status: false, message: "Erro interno no servidor" })
    }
  }

}

export default new ParkingController()
