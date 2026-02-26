import { useCallback } from "react"
import { requestData } from "../services/requestApi"
import type { ApiPayload } from "../types/api" 
import type { User } from "../types/client/user"
import type { LoginResponse } from "../types/client/loginResponse"
import type { AuthUserResponse } from "../types/auth"
import type {
  LogoutResponse,
} from "../types/authResponses"
 
export interface AuthHookParams {
  setAuthenticated: (value: boolean) => void
  setUser: (value: User | null) => void
}


export interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginData {
  email: string
  password: string
}

export interface UseAuthReturn {
  register: (data: RegisterFormData) => Promise<ApiPayload<AuthUserResponse>>
  login: (data: LoginData) => Promise<ApiPayload<AuthUserResponse>>
  logout: () => Promise<ApiPayload<LogoutResponse>>
}


export default function useAuth({
  setAuthenticated,
  setUser,
}: AuthHookParams): UseAuthReturn {


  const register = useCallback(async (data: RegisterFormData) => {
    const response = await requestData<AuthUserResponse>(
      "/register",
      "POST",
      data,
      true
    )

    if (response.success && response.data) {
      setAuthenticated(true)
      setUser(response.data)
    }

    return response
  }, [setAuthenticated, setUser])


  const login = useCallback(async (data: LoginData) => {
    const response = await requestData<AuthUserResponse>(
      "/login",
      "POST",
      data,
      true
    )

    if (response.success && response.data) {
      setAuthenticated(true)
      setUser(response.data)
    }

    return response
  }, [setAuthenticated, setUser])



  const logout = useCallback(async () => {
    const response = await requestData<LogoutResponse>(
      "/user/logout",
      "POST",
      {},
      true
    )

    if (response.success && response.data?.status) {
      setAuthenticated(false)
      setUser(null)
    }

    return response
  }, [setAuthenticated, setUser])



  return { register, login, logout }
}
