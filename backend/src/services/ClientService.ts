import Client from "../model/Client"
import User from "../model/User"
import Vehicle from "../model/Vehicle"
import { ServiceResult } from "../types/serviceResults/ServiceResult"
import { UserErrorCode } from "../types/code/userCode"
import { VehicleErrorCode } from "../types/code/vehicleCode"
import { type ClientResponse } from "../mappers/client.mapper"
import { type ClientVehicleResponse } from "../mappers/clientVehicle.mapper"
import { type PaginatedClientListResult } from "../types/clients/paginationClientList"
import { type PaginatedVehicleListResult } from "../types/vehicles/paginationVehicleList"
import { ClientEditDTO } from "../dtos/ClientEditDTO"
import { VehicleEditDTO } from "../dtos/VehicleEditDTO"
import { type ClientRow } from "../types/clients/client"


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

    async listVehicles(user_id: string, page: number, limit: number): Promise<ServiceResult<PaginatedVehicleListResult | null>> {
        try {
            const result = await Vehicle.listPagination(user_id, page, limit)
            if(result?.total === 0) {
                return {
                    status: false,
                    error: {
                        code: VehicleErrorCode.VEHICLE_NOT_FOUND,
                        message: "Nenhum veículo encontrado"
                    }
                }
            }

            return { status: true, data: result }
        } catch(error) {
            console.error("ClientService.listVehicles: ", error)
            return {
                status: false,
                error: {
                    code: VehicleErrorCode.VEHICLE_FETCH_FAILED,
                    message: "Erro interno ao buscar veículos"
                }
            }
        }
    }

    async removeClient(client_id: string): Promise<ServiceResult<{client_id: string }>> {
        try {
            const clientExist = await Client.findById(client_id)
            if(!clientExist) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.USER_NOT_FOUND,
                        message: "Usuário não encontrado"
                    }
                }
            }
            const result = await Client.delete(client_id)
            if(!result) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.USER_DELETE_FAILED,
                        message: "Erro ao deletar usuário"
                    }
                }
            }
            return { status: true, data: {client_id}}
        } catch(error) {
            return {
                status: false,
                error: {
                    code: UserErrorCode.USER_DELETE_FAILED,
                    message: "Erro interno ao remover usuário"
                }
            }
        }
    }

    async removeVehicle(vehicle_id: string): Promise<ServiceResult<{vehicle_id: string }>> {
        try {
            const vehicleExist = await Vehicle.findById(vehicle_id)
            if(!vehicleExist) {
                return {
                    status: false,
                    error: {
                        code: VehicleErrorCode.VEHICLE_NOT_FOUND,
                        message: "Veículo não encontrado"
                    }
                }
            }
            const result = await Vehicle.delete(vehicle_id)
            if(!result) {
                return {
                    status: false,
                    error: {
                        code: VehicleErrorCode.VEHICLE_DELETE_FAILED,
                        message: "Erro ao deletar veículo"
                    }
                }
            }
            return { status: true, data: {vehicle_id}}
        } catch(error) {
            return {
                status: false,
                error: {
                    code: VehicleErrorCode.VEHICLE_DELETE_FAILED,
                    message: "Erro interno ao remover veículo"
                }
            }
        }
    }

    async edit(client_id: string, data: ClientEditDTO): Promise<ServiceResult<{ client_id: string }>> {
        try {
            const clientExist = await Client.findById(client_id)
            if(!clientExist) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.USER_NOT_FOUND,
                        message: "Cliente não encontrado"
                    }
                }
            }

            const emailUserExists = await Client.emailExists(data.email, client_id)
            if(emailUserExists) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.EMAIL_ALREADY_EXISTS,
                        message: "Email já criado",
                    }
                }
            }

            const cpfExists = await Client.cpfExists(data.cpf, client_id)
            if (cpfExists) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.CPF_ALREADY_EXISTS,
                        message: "CPF já existe",
                    },
                }
            }

            const phoneExists = await Client.phoneExists(data.phone, client_id)
            if (phoneExists) {
                return {
                    status: false,
                    error: {
                        code: UserErrorCode.PHONE_ALREADY_EXISTS,
                        message: "Telefone já existe",
                    },
                }
            }


            await Client.update(client_id, data)

            return {
                status: true,
                data: { client_id},
            }

        } catch(error) {
            return {
                status: false,
                error: {
                    code: UserErrorCode.USER_UPDATE_FAILED, 
                    message: "Erro interno ao editar usuário"
                }
            }
        }
    }

    async findById(id: string): Promise<ServiceResult<ClientRow>> {
        try {
            const user = await Client.findById(id)
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
            console.error("ClientService.findById error:", error)

            return {
                status: false,
                error: {
                    code: UserErrorCode.USER_FETCH_FAILED,
                    message: "Erro interno ao buscar usuário",
                },
            }
        }
    }

    async vehicleDetail(vehicle_id: string): Promise<ServiceResult<VehicleEditDTO>> {
        try {
            const vehicle = await Vehicle.vehicleDetail(vehicle_id)
            if(!vehicle) {
                return {
                    status: false,
                    error: {
                        code: VehicleErrorCode.VEHICLE_NOT_FOUND,
                        message: "Veículo não encontrado",
                    },
                }
            }

            return { status: true, data: vehicle}
        } catch(error) {
            console.error("ClientService.vehicleDetail: ", error)
            return {
                status: false,
                error: {
                    code: VehicleErrorCode.VEHICLE_FETCH_FAILED,
                    message: "Erro interno ao buscar detalhes de veículo",
                }
            }
        }
    }

    async editVehicle(vehicle_id: string, data: VehicleEditDTO): Promise<ServiceResult<{ vehicle_id: string }>> {
        try {
            const vehicleExist = await Vehicle.findById(vehicle_id)
            if(!vehicleExist) {
                return {
                    status: false,
                    error: {
                        code: VehicleErrorCode.VEHICLE_NOT_FOUND,
                        message: "Veículo não encontrado"
                    }
                }
            }

            const plateExists = await Vehicle.plateExists(data.plate, vehicle_id)
            if (plateExists) {
                return {
                    status: false,
                    error: {
                        code: VehicleErrorCode.PLATE_ALREADY_EXISTS,
                        message: "Essa placa já existe",
                    },
                }
            }


           await Vehicle.update(vehicle_id, data)

            return {
                status: true,
                data: { vehicle_id},
            }

        } catch(error) {
            return {
                status: false,
                error: {
                    code: VehicleErrorCode.VEHICLE_UPDATE_FAILED, 
                    message: "Erro interno ao editar veículo"
                }
            }
        }
    }
}

export default new ClientService()
