import { Request, Response } from "express"
import User, { UserData } from "../model/User"
import bcrypt from "bcrypt"

class UserController {
  async register(request: Request, response: Response): Promise<Response> {
    try {
      const { username, email, password } = request.body

      const emailExist = await User.emailExists(email)
      if (emailExist) {
        return response.status(422).json({ status: false, message: "Email já existe" })
      }

      const normalizedEmail = email.trim().toLowerCase()

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser: UserData = { username, email: normalizedEmail, password: hashedPassword }

      const success = await User.save(newUser)

      if (!success) {
        return response.status(500).json({ status: false, message: "Erro ao cadastrar usuário" })
      }

      return response.status(201).json({ status: true, message: "Usuário cadastrado com sucesso" })
    } catch (err) {
      console.error("Erro ao cadastrar usuário: ", err)
      return response.status(500).json({ status: false, message: "Erro interno no servidor" })
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body as {
        email: string
        password: string
      }

      const user = await User.findByEmail(email)
      if (!user) {
        return response
          .status(404)
          .json({ status: false, message: "Email não encontrado" })
      }

      const checkPassword = await bcrypt.compare(password, user.password)
      if (!checkPassword) {
        return response
          .status(422)
          .json({ status: false, message: "Senha incorreta" })
      }

      if (!user.id) {
        return response
          .status(500)
          .json({ status: false, message: "Erro ao fazer login" })
      }

      request.session.user = {
        id: user.id,
        name: user.username,
      }

      return response.status(200).json({
        status: true,
        message: "Login realizado com sucesso",
        user: {
          id: user.id,
          name: user.username,
        },
      })
    } catch (err) {
      console.error("Erro ao processar login de usuário:", err)
      return response
        .status(500)
        .json({ status: false, message: "Erro interno no servidor" })
    }
  }


  async list(request: Request, response: Response): Promise<Response> {
    try {
      const users = await User.findAll()
      return response.status(200).json(users)
    } catch (err) {
      console.error("Error in UserController.list:", err)
      return response.status(500).json({ error: "Internal server error" })
    }
  }

  async getById(request: Request, response: Response): Promise<Response> {
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

  async session(request: Request, response: Response): Promise<Response> {
    if (request.session && request.session.user) {
        return response.status(200).json({ status: true, user: request.session.user })
    } else {
        return response.status(401).json({ status: false, message: "Usuário não autenticado" })
    }
  }

  async logout(request: Request, response: Response): Promise<Response> {
    if (!request.session) {
      return response
        .status(400)
        .json({ status: false, message: "Nenhuma sessão ativa" })
    }

    return new Promise((resolve) => {
      request.session.destroy(err => {
        if (err) {
          resolve(
            response
              .status(500)
              .json({ status: false, message: "Erro ao sair" })
          )
          return
        }

        response.clearCookie("connect.sid")
        resolve(
          response
            .status(200)
            .json({ status: true, message: "Logout feito com sucesso" })
        )
      })
    })
  }

}

export default new UserController()
