import { Router } from "express"
import ClientController from "../controllers/clientController"
import { RegisterClientSchema } from "../schemas/clientSchema"
import { RegisterVehicleSchema } from "../schemas/vehicleSchema"
import { UserIdParamSchema } from "../schemas/userIdSchema"
import { validate } from "../middleware/validate"


const router = Router()


router.post("/client/register", validate(RegisterClientSchema), ClientController.register)
router.post("/client/vehicle/register", validate(RegisterVehicleSchema), ClientController.registerVehicle)
router.get("/clients/:user_id", validate(UserIdParamSchema, "params"), ClientController.getClients)
router.get("/clients/vehicle/:user_id", validate(UserIdParamSchema, "params"), ClientController.getClientAndVehicle)


export default router
