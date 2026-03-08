import { Copyright } from "lucide-react"
import Logo from "../../assets/logo.png"
import { Image } from "../ui/Image"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src={Logo} height={50} scale={2} />
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Copyright className="w-4 h-4 text-blue-300" />
            <span>
              {currentYear} ParkFlow. Todos os direitos reservados.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
