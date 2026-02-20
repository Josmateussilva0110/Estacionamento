import { Route, Routes } from "react-router-dom"
import ParkingForm from "../components/pages/parking/ParkingRegister"
import ParkingList from "../components/pages/parking/ParkingList"
import { ParkingEdit } from "../components/pages/parking/ParkingEdit"
import ParkingAllocation from "../components/pages/allocation/AllocationClient"
import AllocationManagement from "../components/pages/allocation/AllocationManagement"


export default function ParkingRoutes() {
  return (
    <Routes>
      <Route path="register" element={<ParkingForm mode="create" />} />
      <Route path="edit/:parkingId" element={<ParkingForm mode="edit" />} />
      <Route path="view/:parkingId" element={<ParkingEdit />} />
      <Route path="list" element={<ParkingList />} />
      <Route path="allocation" element={<ParkingAllocation />} />
      <Route path="management" element={<AllocationManagement />} />
    </Routes>
  )
}