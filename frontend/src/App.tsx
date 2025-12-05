import AppRoutes from "./routes/Index"
import FlashMessage from "./components/ui/Message"


function App() {
  return (
    <>
      <FlashMessage />
      <AppRoutes />
    </>
  )
}

export default App
