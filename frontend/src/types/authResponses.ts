import type { User } from "./user"
import type { ApiPayload } from "./api"

export type RegisterResponse = ApiPayload
export type LogoutResponse = ApiPayload
export type LoginResponse = ApiPayload<User>
