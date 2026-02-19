import { Outlet } from "react-router-dom"
import NavBar from "../../components/layout/navbar/NavBar"
import Footer from "../../components/layout/Footer"
import LayoutContainer from "../../components/layout/Container"
import FlashMessage from "../../components/ui/Message"

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <FlashMessage />

      <main className="flex-1">
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </main>

      <Footer />
    </div>
  )
}
