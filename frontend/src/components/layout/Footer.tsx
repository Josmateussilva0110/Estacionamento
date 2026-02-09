import { Copyright } from "lucide-react"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-900/95">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-2 py-2">
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <h3 className="flex items-center gap-2 text-base font-semibold text-white">
            <div className="w-7 h-7 bg-linear-to-br from-blue-600 to-blue-700 rounded-md flex items-center justify-center border border-blue-400/30 shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            Estacionamento
          </h3>

          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Copyright className="w-3 h-3" />
            {currentYear} Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}


export default Footer
