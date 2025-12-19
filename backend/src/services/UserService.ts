import bcrypt from "bcrypt"
import User, { UserData } from "../model/User"
import { ServiceResult } from "../types/serviceResults/ServiceResult"

class UserService {
    async register(data: {
        username: string
        email: string
        password: string
    }): Promise<ServiceResult<null>> {

        const emailExists = await User.emailExists(data.email)
        if (emailExists) {
            return {
                status: false,
                error: {
                    code: "EMAIL_ALREADY_EXISTS",
                    message: "Email já existe",
                },
            }
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const newUser: UserData = {
            username: data.username,
            email: data.email.trim().toLowerCase(),
            password: hashedPassword,
        }

        const success = await User.save(newUser)

        if (!success) {
            return {
                status: false,
                error: {
                    code: "USER_CREATE_FAILED",
                    message: "Erro ao cadastrar usuário",
                },
            }
        }

        return { status: true }
    }

    async login(email: string, password: string) {
        const user = await User.findByEmail(email)
        if (!user) {
            return {
                status: false,
                error: {
                    code: "USER_NOT_FOUND",
                    message: "Email não encontrado",
                },
            }
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return {
                status: false,
                error: {
                    code: "INVALID_PASSWORD",
                    message: "Senha incorreta",
                },
            }
        }

        return {
            status: true,
            data: {
                id: user.id!,
                username: user.username,
            },
        }
    }

    async findById(id: string) {
        const user = await User.findById(id)
        if(!user) {
            return {
                status: false,
                error: {
                    code: "USER_NOT_FOUND",
                    message: "Usuário não encontrado",
                },
            }
        }

        return {
            status: true,
            data: user
        }
    }
}

export default new UserService()
