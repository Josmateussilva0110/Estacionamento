import { useCallback } from "react"
import { requestData, type ApiResponse } from "../services/requestApi"
import { type ResponseApi } from "../types/api"

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
  register: (data: RegisterFormData) => Promise<ApiResponse<ResponseApi>>
  login: (data: LoginData) => Promise<ApiResponse<ResponseApi>>
  logout: () => Promise<ApiResponse<ResponseApi>>
}

export default function useAuth({
  setAuthenticated,
  setUser,
}: AuthHookParams): UseAuthReturn {


  const register = useCallback(async (data: RegisterFormData) => {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }

    const response = await requestData<ResponseApi>(
      "/register",
      "POST",
      payload,
      true
    )

    return response
  }, [])


  const login = useCallback(async (data: LoginData) => {
    const response = await requestData<ResponseApi>(
      "/login",
      "POST",
      data,
      true
    )

    if (response.success && response.data?.status) {
      setAuthenticated(true)
      setUser(response.data.user ?? null)
    }

    return response
  }, [setAuthenticated, setUser])


  const logout = useCallback(async () => {
    const response = await requestData<ResponseApi>(
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
