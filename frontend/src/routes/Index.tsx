import { Routes, Route } from "react-router-dom"
import PublicRoutes from "./PublicRoutes"
import Home from "../components/pages/public/Home"
import RegisterUser from "../components/pages/auth/Register"
import LoginUser from "../components/pages/auth/Login"
import Profile from "../components/pages/user/Profile"
import PrivateRoute from "./PrivateRouter"
import PageNotFound from "../components/pages/errors/PageNotFound"
import ParkingRegister from "../components/pages/parking/ParkingRegister"

export default function AppRoutes() {
  return (
    <Routes>

      {/* Rotas públicas */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
      </Route>

      {/* Rotas privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/parking/register" element={<ParkingRegister />} />
      </Route>

      {/* Rota 404 */}
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  )
}
