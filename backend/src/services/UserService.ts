import bcrypt from "bcrypt"
import User, { UserData } from "../model/User"
import { ServiceResult } from "../types/serviceResults/ServiceResult"
import { UserErrorCode } from "../types/code/userCode"

class UserService {
    async register(data: {
        username: string
        email: string
        password: string
    }): Promise<ServiceResult<null>> {
        try {
            const emailExists = await User.emailExists(data.email)
            if (emailExists) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.EMAIL_ALREADY_EXISTS,
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
                    code: UserErrorCode.USER_CREATE_FAILED,
                    message: "Erro ao cadastrar usuário",
                    },
                }
            }

            return { status: true }
        } catch (error) {
            console.error("UserService.register error:", error)

            return {
                status: false,
                error: {
                    code: UserErrorCode.USER_CREATE_FAILED,
                    message: "Erro ao cadastrar usuário",
                },
            }
        }
    }

    async login(email: string, password: string): Promise<ServiceResult<{ id: number; username: string }>> {
        try {
            const user = await User.findByEmail(email)
            if (!user) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.USER_NOT_FOUND,
                        message: "Email não encontrado",
                    },
                }
            }

            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.INVALID_PASSWORD,
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
        } catch (error) {
            console.error("UserService.login error:", error)

            return {
                status: false,
                error: {
                    code: UserErrorCode.LOGIN_FAILED,
                    message: "Erro ao fazer login",
                },
            }
        }
    }

    async findById(id: string): Promise<ServiceResult<UserData>> {
        try {
            const user = await User.findById(id)
            if (!user) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.USER_NOT_FOUND,
                        message: "Usuário não encontrado",
                    },
                }
            }

            return {
                status: true,
                data: user
            }
        } catch (error) {
            console.error("UserService.findById error:", error)

            return {
                status: false,
                error: {
                    code: UserErrorCode.USER_FETCH_FAILED,
                    message: "Erro interno ao buscar usuário",
                },
            }
        }
    }
}

export default new UserService()
