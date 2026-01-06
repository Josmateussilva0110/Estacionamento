import { Route, Routes } from "react-router-dom"
import RegisterClient from "../components/pages/user/RegisterClient"
import RegisterVehicle from "../components/pages/user/RegisterVehicle"


export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="register" element={<RegisterClient />} />
      <Route path="vehicle/register" element={<RegisterVehicle />} />
    </Routes>
  )
}