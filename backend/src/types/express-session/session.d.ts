import "express-session"
import type { SafeUser } from "../user/userSafe"

declare module "express-session" {
  interface SessionData {
    user?: SafeUser
  }
}
