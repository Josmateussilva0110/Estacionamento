import { Router } from "express"
import allocationController from "../controllers/allocationController"
import { UserIdParamSchema } from "../schemas/userIdSchema"
import { AllocationSchema } from "../schemas/allocationSchema"
import { validate } from "../middleware/validate"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"


const router = Router()

router.get("/allocation/spots/:user_id", validate(UserIdParamSchema, "params"), ensureAuthenticated, allocationController.getSpots)
router.post("/allocation", validate(AllocationSchema), ensureAuthenticated, allocationController.allocation)
router.get("/allocations/pagination/:user_id", validate(UserIdParamSchema, "params"), ensureAuthenticated, allocationController.listAllocations)


export default router
