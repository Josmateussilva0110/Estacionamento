import { useState, useEffect } from "react"
import {
  ArrowRight,
  ParkingCircle,
  Menu,
  X,
} from "lucide-react"

export function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 30) }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
            <ParkingCircle className="w-5 h-5 text-blue-300" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Estacionamento</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Recursos", "Como Funciona", "Planos", "Depoimentos"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm text-slate-300 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2">
            Entrar
          </button>
          <button className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/30">
            Começar grátis
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-300">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-xl border-t border-slate-700/50 px-6 py-4 space-y-4">
          {["Recursos", "Como Funciona", "Planos", "Depoimentos"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="block text-slate-300 hover:text-white py-2 transition-colors">
              {item}
            </a>
          ))}
          <button className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl mt-2">
            Começar grátis
          </button>
        </div>
      )}
    </nav>
  )
}
