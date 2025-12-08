import AppRoutes from "./routes/Index"
import FlashMessage from "./components/ui/Message"
import NavBar from "./components/layout/NavBar"


function App() {
  return (
    <>
      <NavBar />
      <FlashMessage />
      <AppRoutes />
    </>
  )
}

export default App
