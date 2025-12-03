import { ZodTypeAny, ZodError } from "zod"
import { Request, Response, NextFunction } from "express"

export const validate =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse(request.body)
      return next()
    } catch (err) {
      if (err instanceof ZodError) {
        return response.status(400).json({
          errors: err.issues.map((e) => ({
            field: e.path.join("."), 
            message: e.message,
          })),
        })
      }
      console.error("Erro inesperado no validator:", err)
      return response.status(500).json({
        error: "Erro interno no validador",
      })
    }
  }
