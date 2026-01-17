import Client from "../model/Client"
import User from "../model/User"
import Vehicle from "../model/Vehicle"
import { ServiceResult } from "../types/serviceResults/ServiceResult"
import { UserErrorCode } from "../types/code/userCode"
import { VehicleErrorCode } from "../types/code/vehicleCode"
import { type ClientResponse } from "../mappers/client.mapper"
import { type ClientVehicleResponse } from "../mappers/clientVehicle.mapper"
import { type PaginatedClientListResult } from "../types/clients/paginationClientList"


class ClientService {
    async register(data: {
        username: string
        email: string
        cpf: string
        phone: string
        user_id: number
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

    async findClientsByIdUser(user_id: string): Promise<ServiceResult<ClientResponse[]>> {
        try {
            const clients = await Client.getClientsByUser(user_id)
            if (clients.length === 0) {
                return {
                    status: false,
                    error: {
                    code: UserErrorCode.USER_NOT_FOUND,
                    message: "Clientes não encontrados",
                    },
                }
            }


            return {status: true, data: clients}

        } catch(error) {
            console.error("ClientService.findClientsByIdUser error:", error)

            return {
                status: false,
                error: {
                    code: UserErrorCode.USER_FETCH_FAILED,
                    message: "Erro interno ao buscar clientes",
                },
            }
        }
    }

    async findClientsAndVehicle(user_id: string): Promise<ServiceResult<ClientVehicleResponse[]>> {
        try {
            const clients = await Client.clientAndVehicle(user_id)
            if(clients.length === 0) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.USER_NOT_FOUND,
                        message: "Clientes não encontrados"
                    }
                }
            }

            return { status: true, data: clients}
        } catch(error) {
            console.error("ClientService.findClientsAndVehicle error:", error)
            return {
                status: false,
                error: {
                    code: UserErrorCode.USER_FETCH_FAILED,
                    message: "Erro interno ao buscar clientes"
                }
            }
        }
    }

    async listClients(user_id: string, page: number, limit: number): Promise<ServiceResult<PaginatedClientListResult | null>> {
        try {
            const clients = await Client.list(user_id, page, limit)
            if(clients?.total === 0) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.USER_NOT_FOUND,
                        message: "clientes não encontrados"
                    }
                }
            }

            return { status: true, data: clients}
        } catch(error) {
            console.error("ClientService.listClients error: ", error)
            return {
                status: false,
                error: {
                    code: UserErrorCode.USER_FETCH_FAILED,
                    message: "Erro interno ao buscar lista de clientes"
                }
            }
        }
    }
}

export default new ClientService()
