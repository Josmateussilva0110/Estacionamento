import { UserData } from "../../model/User"

export type SafeUser = Omit<UserData, "password">
