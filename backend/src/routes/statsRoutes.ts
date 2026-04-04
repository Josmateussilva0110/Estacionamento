import { Router } from "express"
import statsController from "../controllers/statsController"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"


const router = Router()

router.get("/stats/parking", ensureAuthenticated, statsController.getKpiParking)
router.get("/stats/revenue", ensureAuthenticated, statsController.getRevenue)
router.get("/stats/occupied", ensureAuthenticated, statsController.getOccupied)


export default router
