import { Route, Routes } from "react-router-dom"
import RegisterClient from "../components/pages/user/RegisterClient"


export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="register" element={<RegisterClient />} />
    </Routes>
  )
}