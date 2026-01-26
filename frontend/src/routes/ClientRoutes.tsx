import { Route, Routes } from "react-router-dom"
import RegisterClient from "../components/pages/user/RegisterClient"
import ClientList from "../components/pages/user/ListClients"


export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="register" element={<RegisterClient mode="create" />} />
      <Route path="edit/:id" element={<RegisterClient mode="edit" />} />
      <Route path="list/clients" element={<ClientList />} />
    </Routes>
  )
}
