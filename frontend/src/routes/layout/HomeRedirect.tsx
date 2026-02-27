import { Navigate } from "react-router-dom"
import { useUser } from "../../context/useUser"

export default function HomeRedirect() {
  const { authenticated, loading } = useUser()
  if (loading) return null 

  if (authenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Navigate to="/about" replace />
}
