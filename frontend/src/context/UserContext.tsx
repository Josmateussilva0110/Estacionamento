import { createContext, useState, useEffect, type ReactNode } from "react"
import useAuth from "../hooks/userAuth"


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
  register: (data: any) => Promise<any>
  login: (data: any) => Promise<any>
  logout: () => void
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

  const { login: authLogin, register: authRegister, localLogout } = useAuth({
    setAuthenticated,
    setUser,
  })

  useEffect(() => {
    function handleExpired() {
      setSessionExpired(true)
      setAuthenticated(false)
      setUser(null)
    }

    window.addEventListener("SESSION_EXPIRED", handleExpired)
    return () => window.removeEventListener("SESSION_EXPIRED", handleExpired)
  }, [])

  async function login(data: any) {
    const response = await authLogin(data)

    if (response.success && response.data?.status) {
      setAuthenticated(true)
      setUser(response.data.user ?? null)
    }

    return response
  }

  async function register(data: any) {
    return await authRegister(data)
  }

  function logout() {
    localLogout()
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
