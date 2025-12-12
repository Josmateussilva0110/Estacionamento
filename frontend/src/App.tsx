import AppRoutes from "./routes/Index"
import FlashMessage from "./components/ui/Message"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <FlashMessage />

      {/* Conteúdo cresce e empurra a footer */}
      <div className="flex-1">
        <AppRoutes />
      </div>

      <Footer />
    </div>
  )
}

export default App
