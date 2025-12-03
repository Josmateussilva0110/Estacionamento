import { Router } from "express"
import UserController from "../controllers/userController"
import { validate } from "../middleware/validate"
import { UserSchema } from "../utils/userValidator"

const router = Router()


router.post("/register", validate(UserSchema), UserController.register)

export default router
