import Model from "./Model"
import db from "../database/connection/connection"

export interface ClientData {
  id?: number
  username: string
  cpf: string
  phone: string
  email: string
  created_at?: string 
  updated_at?: string
}

class Client extends Model<ClientData> {
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
}

export default new Client()
