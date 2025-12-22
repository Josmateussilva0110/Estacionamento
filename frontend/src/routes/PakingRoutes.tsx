import { Route, Routes } from "react-router-dom"
import ParkingRegister from "../components/pages/parking/ParkingRegister"
import ParkingList from "../components/pages/parking/ParkingList"


export default function ParkingRoutes() {
  return (
    <Routes>
      <Route path="register" element={<ParkingRegister />} />
      <Route path="list" element={<ParkingList />} />
    </Routes>
  )
}