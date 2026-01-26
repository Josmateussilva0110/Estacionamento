import { Router } from "express"
import vehicleController from "../controllers/vehicleController" 
import { RegisterVehicleSchema } from "../schemas/vehicleSchema"
import { UserIdParamSchema } from "../schemas/userIdSchema"
import { IdParamSchema } from "../schemas/IdParamSchema"
import { validate } from "../middleware/validate"


const router = Router()


router.post("/vehicle/register", validate(RegisterVehicleSchema), vehicleController.registerVehicle)
router.get("/vehicles/pagination/:user_id", validate(UserIdParamSchema, "params"), vehicleController.listVehicle)
router.delete("/vehicle/:id", validate(IdParamSchema, "params"), vehicleController.removeVehicle)
router.get("/vehicle/:id", validate(IdParamSchema, "params"), vehicleController.getVehicleDetail)
router.put("/vehicle/:id", validate(RegisterVehicleSchema), validate(IdParamSchema, "params"), vehicleController.editVehicle)


export default router
