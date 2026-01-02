import { Router } from "express"
import ClientController from "../controllers/clientController"
import { RegisterClientSchema } from "../schemas/clientSchema"
import { validate } from "../middleware/validate"


const router = Router()


router.post("/client/register", validate(RegisterClientSchema), ClientController.register)


export default router
