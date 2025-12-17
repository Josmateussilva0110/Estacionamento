import { Router } from "express"
const router = Router()


import userRoutes from "./userRoutes"
import parkingRoutes from "./parkingRoutes"

router.use(userRoutes)
router.use(parkingRoutes)

export default router
