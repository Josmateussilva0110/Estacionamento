import { Router } from "express"
import { validate } from "../middleware/validate"
import ParkingController from "../controllers/parkingController"
import { ParkingRegisterSchema } from "../schemas/parkingSchema"
import { IdParamSchema } from "../schemas/IdParamSchema"


const router = Router()


router.post("/parking/register", validate(ParkingRegisterSchema), ParkingController.register)
router.get("/parking/list/:id", validate(IdParamSchema, "params"), ParkingController.list)


export default router
