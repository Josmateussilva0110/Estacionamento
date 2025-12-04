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

export interface UseAuthReturn {
  register: (data: RegisterFormData) => Promise<ApiResponse<RegisterResponse>>
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

    console.log(response)

    return response
  }

  function localLogout() {
    setAuthenticated(false)
    setUser(null)
  }

  return { register, localLogout }
}
