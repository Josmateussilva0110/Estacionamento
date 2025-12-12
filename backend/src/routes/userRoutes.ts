import { Router } from "express"
import UserController from "../controllers/userController"
import { validate } from "../middleware/validate"
import { RegisterSchema } from "../utils/registerValidator"
import { LoginSchema } from "../utils/loginValidator"


const router = Router()


router.post("/register", validate(RegisterSchema), UserController.register)
router.post("/login", validate(LoginSchema), UserController.login)
router.get("/user/session", UserController.session)
router.post("/user/logout", UserController.logout)
router.get("/user/:id", UserController.getById)

export default router
