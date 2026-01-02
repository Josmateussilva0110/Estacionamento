import { Router } from "express"
const router = Router()


import userRoutes from "./userRoutes"
import parkingRoutes from "./parkingRoutes"
import clientRoutes from "./clientRoutes"

router.use(userRoutes)
router.use(parkingRoutes)
router.use(clientRoutes)

export default router
