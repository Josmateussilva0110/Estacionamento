import { Route, Routes } from "react-router-dom"
import RegisterVehicle from "../components/pages/user/RegisterVehicle"
import VehicleList from "../components/pages/user/ListVehicles"


export default function VehicleRoutes() {
  return (
    <Routes>
      <Route path="register" element={<RegisterVehicle mode="create" />} />
      <Route path="edit/:id" element={<RegisterVehicle mode="edit" />} />
      <Route path="list/vehicles" element={<VehicleList />} />
    </Routes>
  )
}
