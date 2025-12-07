import { requestData, type ApiResponse } from "../services/requestApi"
import { type RegisterResponse } from "../types/api"

export interface AuthHookParams {
  setAuthenticated: (value: boolean) => void
  setUser: (value: User | null) => void
}

export interface User {
  id: number
  username: string
  email: string
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
  register: (data: RegisterFormData) => Promise<ApiResponse<RegisterResponse>>
  login: (data: LoginData) => Promise<ApiResponse<RegisterResponse>>
  localLogout: () => void
}


export default function useAuth({
  setAuthenticated,
  setUser,
}: AuthHookParams): UseAuthReturn {

  async function register(data: RegisterFormData) {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }

    const response = await requestData<RegisterResponse>(
      "/register",
      "POST",
      payload,
      true
    )

    return response
  }

  async function login(data: LoginData) {
    const response = await requestData<RegisterResponse>(
      "login",
      "POST",
      data,
      true
    )

    return response
  }

  function localLogout() {
    setAuthenticated(false)
    setUser(null)
  }

  return { register, login, localLogout }
}
