import { Router } from "express"
import ClientController from "../controllers/clientController"
import { RegisterClientSchema } from "../schemas/clientSchema"
import { RegisterVehicleSchema } from "../schemas/vehicleSchema"
import { validate } from "../middleware/validate"


const router = Router()


router.post("/client/register", validate(RegisterClientSchema), ClientController.register)
router.post("client/vehicle/register", validate(RegisterVehicleSchema), ClientController.registerVehicle)


export default router
