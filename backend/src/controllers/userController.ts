import { Request, Response } from "express"
import UserService from "../services/UserService"
import { userErrorHttpStatusMap } from "../errors/userErrorHttpMapper"
import { getHttpStatusFromError } from "../utils/getHttpStatusFromError"

class UserController {
  async register(request: Request, response: Response): Promise<Response> {
    const result = await UserService.register(request.body)

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

    request.session.user = result.data!

    return response.status(201).json({
      status: true,
      message: "Usuário cadastrado com sucesso",
      user: result.data,
    })
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const result = await UserService.login(email, password)
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

    request.session.user = result.data!

    return response.status(200).json({
      status: true,
      message: "Login Realizado com sucesso",
      user: result.data,
    })
  }


  async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const result = await UserService.findById(id)
    if(!result.status) {
      const httpStatus = getHttpStatusFromError(
        result.error!.code,
        userErrorHttpStatusMap
      )
      return response.status(httpStatus).json({status: false, message: result.error?.message})
    }

    return response.status(200).json({status: true, user: result.data})
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
