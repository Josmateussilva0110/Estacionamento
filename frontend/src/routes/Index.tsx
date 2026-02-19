import { Routes, Route } from "react-router-dom"
import PublicRoutes from "./PublicRoutes"
import PrivateRoute from "./PrivateRouter"

import AppLayout from "./layout/AppLayout"
import FullWidthLayout from "./layout/FullWidthLayout"

import ParkingHome from "../components/pages/home/Dashboard"
import LandingPage from "../components/pages/home/LandingPage"
import RegisterUser from "../components/pages/auth/Register"
import LoginUser from "../components/pages/auth/Login"
import Profile from "../components/pages/user/Profile"
import PageNotFound from "../components/pages/errors/PageNotFound"

import ParkingRoutes from "./ParkingRoutes"
import ClientRoutes from "./ClientRoutes"
import VehicleRoutes from "./VehicleRoutes"

export default function AppRoutes() {
  return (
    <Routes>

      {/* Públicas */}
      <Route element={<PublicRoutes />}>
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
      </Route>

      {/* Landing pública com layout próprio */}
      <Route element={<FullWidthLayout />}>
        <Route path="/landing" element={<LandingPage />} />
      </Route>

      {/* Privadas com layout principal */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<ParkingHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/client/*" element={<ClientRoutes />} />
          <Route path="/vehicle/*" element={<VehicleRoutes />} />
          <Route path="/parking/*" element={<ParkingRoutes />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />

    </Routes>
  )
}
