import Client from "../model/Client"
import User from "../model/User"
import Vehicle from "../model/Vehicle"
import { ServiceResult } from "../types/serviceResults/ServiceResult"
import { UserErrorCode } from "../types/code/userCode"
import { VehicleErrorCode } from "../types/code/vehicleCode"


class ClientService {
    async register(data: {
        username: string
        email: string
        cpf: string
        phone: string
    }): Promise<ServiceResult<{ id: number; username: string }>> {
        try {
            const emailExists = await Client.emailExists(data.email)
            if (emailExists) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.EMAIL_ALREADY_EXISTS,
                        message: "Email já existe",
                    },
                }
            }

            const emailUserExists = await User.emailExists(data.email)
            if(emailUserExists) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.EMAIL_ALREADY_EXISTS,
                        message: "Email já criado",
                    }
                }
            }

            const cpfExists = await Client.cpfExists(data.cpf)
            if (cpfExists) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.CPF_ALREADY_EXISTS,
                        message: "CPF já existe",
                    },
                }
            }

            const phoneExists = await Client.phoneExists(data.phone)
            if (phoneExists) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.PHONE_ALREADY_EXISTS,
                        message: "Telefone já existe",
                    },
                }
            }

            const success = await Client.save(data)
            if (!success) {
                return {
                    status: false,
                    error: {
                    code: UserErrorCode.USER_CREATE_FAILED,
                    message: "Erro ao cadastrar usuário",
                    },
                }
            }

            return { status: true, data: {
                id: success,
                username: data.username
            }}
        } catch (error) {
            console.error("ClientService.register error:", error)

            return {
                status: false,
                error: {
                    code: UserErrorCode.USER_CREATE_FAILED,
                    message: "Erro ao cadastrar usuário",
                },
            }
        }
    } 

    async registerVehicle(data: {
        plate: string
        brand: string
        color: string
        vehicle_type: number
        client_id: string
    }): Promise<ServiceResult<{ id: number; plate: string }>> {
        try {
            const plateExists = await Vehicle.plateExists(data.plate)
            if (plateExists) {
                return {
                    status: false,
                    error: {
                        code: VehicleErrorCode.PLATE_ALREADY_EXISTS,
                        message: "Essa placa já existe",
                    },
                }
            }

            const success = await Vehicle.save(data)
            if (!success) {
                return {
                    status: false,
                    error: {
                    code: VehicleErrorCode.VEHICLE_CREATE_FAILED,
                    message: "Erro ao cadastrar veiculo",
                    },
                }
            }

            return { status: true, data: {
                id: success,
                plate: data.plate
            }}
        } catch (error) {
            console.error("ClientService.registerVehicle error:", error)

            return {
                status: false,
                error: {
                    code: VehicleErrorCode.VEHICLE_CREATE_FAILED,
                    message: "Erro ao cadastrar veiculo",
                },
            }
        }
    } 
}

export default new ClientService()
