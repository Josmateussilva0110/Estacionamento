import { Router } from "express"
import allocationController from "../controllers/allocationController"
import { UserIdParamSchema } from "../schemas/userIdSchema"
import { AllocationSchema } from "../schemas/allocationSchema"
import { validate } from "../middleware/validate"


const router = Router()

router.get("/allocation/spots/:user_id", validate(UserIdParamSchema, "params"), allocationController.getSpots)
router.post("/allocation", validate(AllocationSchema), allocationController.allocation)


export default router
