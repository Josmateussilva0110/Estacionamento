import db from "../database/connection/connection"


export interface Timestamps {
    created_at?: string 
    updated_at?: string
}


export default class Model<T extends Record<string, any>> {
    private tableName: string

    constructor(tableName: string) {
        this.tableName = tableName
    }

    private getTimestamps(): Timestamps {
        const now = new Date().toISOString() // UTC ISO string
        return { created_at: now, updated_at: now }
    }

    async save(data: T, withTimestamps = true): Promise<boolean> {
        try {
            const insertData = withTimestamps
                ? { ...data, ...this.getTimestamps() }
                : data

            await db(this.tableName).insert(insertData as Record<string, any>)
            return true
        } catch (err) {
            console.error(`Erro ao inserir na tabela ${this.tableName}:`, err)
            return false
        }
    }

    async findAll(): Promise<(T & Timestamps)[]> {
        try {
            const rows = await db(this.tableName).select("*")
            return rows as (T & Timestamps)[]
        } catch (err) {
            console.error(`Erro ao buscar todos registros de ${this.tableName}:`, err)
            return []
        }
    }

    async findById(id: number | string, idField = "id"): Promise<(T & Timestamps) | null> {
        try {
            const result = await db(this.tableName).where(idField, id).first()
            return result as (T & Timestamps) | null
        } catch (err) {
            console.error(`Erro ao buscar registro em ${this.tableName}:`, err)
            return null
        }
    }

    async update(
        id: number | string,
        data: Partial<T>,
        idField = "id",
        withTimestamps = true
    ): Promise<boolean> {
        try {
            const updateData: Partial<T & Timestamps> = withTimestamps
                ? { ...data, updated_at: new Date().toISOString() }
                : data

            await db(this.tableName)
                .where(idField, id)
                .update(updateData as Record<string, any>)

            return true
        } catch (err) {
            console.error(`Erro ao atualizar registro em ${this.tableName}:`, err)
            return false
        }
    }

    async delete(id: number | string, idField = "id"): Promise<boolean> {
        try {
            await db(this.tableName).where(idField, id).delete()
            return true
        } catch (err) {
            console.error(`Erro ao deletar registro em ${this.tableName}:`, err)
            return false
        }
    }
}
