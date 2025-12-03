import { Routes, Route } from "react-router-dom"
import PublicRoutes from "./PublicRoutes"
import Home from "../components/pages/public/Home"
import RegisterUser from "../components/pages/auth/Register"

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
      </Route>
    </Routes>
  )
}
