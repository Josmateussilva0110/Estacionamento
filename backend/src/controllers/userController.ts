import { Request, Response } from "express"
import User, { UserData } from "../model/User"
import bcrypt from "bcrypt"

class UserController {
  async register(request: Request, response: Response) {
    try {
      const { username, email, password } = request.body
       const hashedPassword = await bcrypt.hash(password, 10)

      const newUser: UserData = { username, email, password: hashedPassword }

      const success = await User.save(newUser)

      if (!success) {
        return response.status(500).json({ error: "Erro ao cadastrar usuário" })
      }

      return response.status(201).json({ message: "Usuário cadastrado com sucesso" })
    } catch (err) {
      console.error("Erro ao cadastrar usuário: ", err)
      return response.status(500).json({ error: "Erro interno no servidor" })
    }
  }

  async list(request: Request, response: Response) {
    try {
      const users = await User.findAll()
      return response.status(200).json(users)
    } catch (err) {
      console.error("Error in UserController.list:", err)
      return response.status(500).json({ error: "Internal server error" })
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params
      const user = await User.findById(Number(id))

      if (!user) {
        return response.status(404).json({ error: "User not found" })
      }

      return response.status(200).json(user)
    } catch (err) {
      console.error("Error in UserController.getById:", err)
      return response.status(500).json({ error: "Internal server error" })
    }
  }
}

export default new UserController()
