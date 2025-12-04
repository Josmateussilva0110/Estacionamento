import { ZodTypeAny, ZodError } from "zod"
import { Request, Response, NextFunction } from "express"

export const validate =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = schema.parse(request.body)

      request.body = result 
      return next()
    } catch (err) {
      if (err instanceof ZodError) {
        return response.status(422).json({
          status: false,
          message: "Erro de validação",
          errors: err.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        })
      }

      console.error("Erro inesperado no validator:", err)

      return response.status(500).json({
        status: false,
        message: "Erro interno no validador",
      })
    }
  }
