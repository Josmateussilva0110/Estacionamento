import { Router } from "express"
const router = Router()


import userRoutes from "./userRoutes"
import parkingRoutes from "./parkingRoutes"
import clientRoutes from "./clientRoutes"
import vehicleRoutes from "./vehicleRoutes"
import allocationRoutes from "./allocationRoutes"

router.use(userRoutes)
router.use(parkingRoutes)
router.use(clientRoutes)
router.use(allocationRoutes)
router.use(vehicleRoutes)

export default router
