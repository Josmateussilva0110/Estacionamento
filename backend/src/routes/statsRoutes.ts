import { Router } from "express"
import statsController from "../controllers/statsController"
import { UserIdParamSchema } from "../schemas/userIdSchema"
import { IdParamSchema } from "../schemas/IdParamSchema"
import { validate } from "../middleware/validate"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"


const router = Router()

router.get("/stats/parking", ensureAuthenticated, statsController.getKpiParking)



export default router
