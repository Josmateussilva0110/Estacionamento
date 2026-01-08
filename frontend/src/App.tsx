import AppRoutes from "./routes/Index";
import FlashMessage from "./components/ui/Message";
import NavBar from "./components/layout/navbar/NavBar";
import Footer from "./components/layout/Footer";
//import { LayoutContainer } from "./components/layout/Container";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <FlashMessage />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
