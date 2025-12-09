import { createContext, useState, useEffect, type ReactNode } from "react"
import useAuth from "../hooks/userAuth"
import { requestData } from "../services/requestApi"
import type { LoginData, RegisterFormData } from "../hooks/userAuth"
import type { ApiResponse } from "../services/requestApi"
import type { ResponseApi } from "../types/api"

interface User {
  id: number
  username: string
  email: string
}

interface UserContextType {
  authenticated: boolean
  user: User | null
  loading: boolean
  sessionExpired: boolean
  setSessionExpired: (value: boolean) => void
  register: (data: RegisterFormData) => Promise<ApiResponse<ResponseApi>>
  login: (data: LoginData) => Promise<ApiResponse<ResponseApi>>
  logout: () => Promise<ApiResponse<ResponseApi>>
}

export const UserContext = createContext<UserContextType | null>(null)

interface ProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: ProviderProps) {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessionExpired, setSessionExpired] = useState(false)

  const {
    login: authLogin,
    register: authRegister,
    logout: authLogout
  } = useAuth({
    setAuthenticated,
    setUser,
  })

  useEffect(() => {
    async function checkSession() {
      const response = await requestData("/user/session", "GET", {}, true)

      if (response.success && response.data?.user) {
        setAuthenticated(true)
        setUser(response.data.user)
      } else {
        setAuthenticated(false)
        setUser(null)
        setSessionExpired(true)
      }

      setLoading(false)
    }

    checkSession()
  }, [])


  useEffect(() => {
    function handleExpired() {
      setSessionExpired(true)
      setAuthenticated(false)
      setUser(null)
    }

    window.addEventListener("SESSION_EXPIRED", handleExpired)
    return () => window.removeEventListener("SESSION_EXPIRED", handleExpired)
  }, [])


  async function login(data: LoginData) {
    return authLogin(data) 
  }

  async function register(data: RegisterFormData) {
    return authRegister(data)
  }

  async function logout() {
    return authLogout() 
  }

  return (
    <UserContext.Provider
      value={{
        authenticated,
        user,
        loading,
        sessionExpired,
        setSessionExpired,
        register,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
