import { Copyright } from "lucide-react"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 border-t border-slate-800/50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-2 py-2">
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <h3 className="flex items-center gap-2 text-base font-semibold text-white">
            <div className="w-7 h-7 bg-linear-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
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
