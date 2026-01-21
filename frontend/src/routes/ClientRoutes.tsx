import { Route, Routes } from "react-router-dom"
import RegisterClient from "../components/pages/user/RegisterClient"
import RegisterVehicle from "../components/pages/user/RegisterVehicle"
import ClientList from "../components/pages/user/ListClients"
import VehicleList from "../components/pages/user/ListVehicles"


export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="register" element={<RegisterClient mode="create" />} />
      <Route path="edit/:id" element={<RegisterClient mode="edit" />} />
      <Route path="vehicle/register" element={<RegisterVehicle />} />
      <Route path="list/clients" element={<ClientList />} />
      <Route path="list/vehicles" element={<VehicleList />} />
    </Routes>
  )
}
