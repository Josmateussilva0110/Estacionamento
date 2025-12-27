import { Route, Routes } from "react-router-dom"
import ParkingRegister from "../components/pages/parking/ParkingRegister"
import ParkingList from "../components/pages/parking/ParkingList"
import { ParkingEdit } from "../components/pages/parking/ParkingEdit"


export default function ParkingRoutes() {
  return (
    <Routes>
      <Route path="register" element={<ParkingRegister />} />
      <Route path="list" element={<ParkingList />} />
      <Route path="edit/:parkingId" element={<ParkingEdit />} />
    </Routes>
  )
}