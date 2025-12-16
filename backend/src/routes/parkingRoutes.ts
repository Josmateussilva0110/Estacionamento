import { Router } from "express"
import { validate } from "../middleware/validate"
import ParkingController from "../controllers/parkingController"
import { ParkingRegisterSchema } from "../schemas/parkingSchema"


const router = Router()


router.post("/parking/register", validate(ParkingRegisterSchema), ParkingController.register)


export default router
