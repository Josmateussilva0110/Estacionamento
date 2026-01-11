import { Router } from "express"
import allocationController from "../controllers/allocationController"
import { UserIdParamSchema } from "../schemas/userIdSchema"
import { validate } from "../middleware/validate"


const router = Router()

router.get("/allocation/spots/:user_id", validate(UserIdParamSchema, "params"), allocationController.getSpots)


export default router
