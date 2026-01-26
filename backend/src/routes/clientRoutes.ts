import { Router } from "express"
import ClientController from "../controllers/clientController"
import { RegisterClientSchema } from "../schemas/clientSchema"
import { UserIdParamSchema } from "../schemas/userIdSchema"
import { IdParamSchema } from "../schemas/IdParamSchema"
import { validate } from "../middleware/validate"


const router = Router()


router.post("/client/register", validate(RegisterClientSchema), ClientController.register)
router.get("/clients/:user_id", validate(UserIdParamSchema, "params"), ClientController.getClients)
router.get("/clients/vehicle/:user_id", validate(UserIdParamSchema, "params"), ClientController.getClientAndVehicle)
router.get("/clients/pagination/:user_id", validate(UserIdParamSchema, "params"), ClientController.listClients)
router.get("/client/:id", validate(IdParamSchema, "params"), ClientController.getById)
router.delete("/client/:id", validate(IdParamSchema, "params"), ClientController.remove)
router.put("/client/:id", validate(RegisterClientSchema), validate(IdParamSchema, "params"), ClientController.edit)



export default router
