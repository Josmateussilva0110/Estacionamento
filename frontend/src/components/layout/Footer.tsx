import { Copyright } from "lucide-react"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 py-6">
      <div className="text-center text-sm flex items-center justify-center gap-2 text-gray-400">
        <Copyright className="w-4 h-4" />
        <span>
          {currentYear} Estacionamento. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  )
}

export default Footer
