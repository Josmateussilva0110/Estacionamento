import Model from "./Model"
import db from "../database/connection/connection"
import { PgRawResult } from "../types/database/BdResult"
import { type ClientRow } from "../types/clients/client"
import { type ClientAndVehicleRow } from "../types/clients/clientAndVehicle"
import { type ClientResponse } from "../mappers/client.mapper"
import { type ClientVehicleResponse } from "../mappers/clientVehicle.mapper"
import { mapClientRowList } from "../mappers/client.mapper"
import { mapClientVehicleRowList } from "../mappers/clientVehicle.mapper"


class Client extends Model<ClientRow> {
    constructor() {
        super("clients")
    }

    async emailExists(email: string): Promise<boolean> {
        try {
            const result = await db(this.tableName)
            .select("id")
            .where({ email })
            .first()

            return !!result
        } catch (err) {
            console.error(`Erro ao verificar e-mail na tabela ${this.tableName}:`, err)
            return false
        }
    }

    async cpfExists(cpf: string): Promise<boolean> {
        try {
            const result = await db(this.tableName)
            .select("id")
            .where({ cpf })
            .first()

            return !!result
        } catch (err) {
            console.error(`Erro ao verificar cpf na tabela ${this.tableName}:`, err)
            return false
        }
    }

    async phoneExists(phone: string): Promise<boolean> {
        try {
            const result = await db(this.tableName)
            .select("id")
            .where({ phone })
            .first()

            return !!result
        } catch (err) {
            console.error(`Erro ao verificar telefone na tabela ${this.tableName}:`, err)
            return false
        }
    }

    async getClientsByUser(user_id: string): Promise<ClientResponse[]> {
        try {
            const result = await db.raw<PgRawResult<ClientRow>>(
            `
            select 
                c.id as client_id, 
                c.username,
                c.cpf,
                c.phone,
                c.email,
                c.status,
                c.updated_at
            from clients c
            where c.user_id = ?
            `,
            [user_id]
            )

            if (!result.rows.length) {
            return []
            }

            return mapClientRowList(result.rows)

        } catch (err) {
            console.error(
            `Erro ao buscar clientes da tabela: ${this.tableName}`,
            err
            )
            return []
        }
    }

    async clientAndVehicle(user_id: string): Promise<ClientVehicleResponse[]> {
        try {
            const result = await db.raw<PgRawResult<ClientAndVehicleRow>>(
                `
                    select 
                        c.id as client_id, c.username, c.phone, c.status as clientStatus, c.updated_at,
                        v.id as vehicle_id, v.plate, v.brand, v.color
                    from clients c
                    inner join vehicles v 
                        on v.client_id = c.id
                    where c.user_id = ?
                    order by c.updated_at desc
                `
                ,[user_id]
            )
            if(!result.rows.length) {
                return []
            }

            return mapClientVehicleRowList(result.rows)
        } catch(err) {
            console.error(
            `Erro ao buscar veiculo de cliente da tabela: ${this.tableName}`, err)
            return []
        }
    }

}


export default new Client()
