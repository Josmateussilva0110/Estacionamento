import { Router } from "express"
import { validate } from "../middleware/validate"
import ParkingController from "../controllers/parkingController"
import { ParkingRegisterSchema } from "../schemas/parkingSchema"
import { IdParamSchema } from "../schemas/IdParamSchema"
import { UserIdParamSchema } from "../schemas/userIdSchema"


const router = Router()


router.post("/parking/register", validate(ParkingRegisterSchema), ParkingController.register)
router.get("/parking/list/:id", validate(IdParamSchema, "params"), ParkingController.list)
router.delete("/parking/:id", validate(IdParamSchema, "params"), ParkingController.remove)
router.get("/parking/:id", validate(IdParamSchema, "params"), ParkingController.getParking)
router.put("/parking/:id", validate(IdParamSchema, "params"), ParkingController.edit)
router.get("/parking/names/:user_id", validate(UserIdParamSchema, "params"), ParkingController.getParkingNames)

export default router
