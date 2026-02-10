import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu as MenuIcon, X, Calendar } from "lucide-react"
import { useUser } from "../../../context/useUser"
import { requestData } from "../../../services/requestApi"
import useFlashMessage from "../../../hooks/useFlashMessage"
import type { User } from "../../../types/client/user"
import type { ApiPayload } from "../../../types/api"

import { DesktopUserMenu } from "./DesktopUserMenu"
import { MobileDrawerMenu } from "./MobileDrawerMenu"

function NavBar() {
  const { authenticated, user, logout } = useUser()
  const navigate = useNavigate()
  const { setFlashMessage } = useFlashMessage()

  const [open, setOpen] = useState(false)
  const [requestUser, setRequestUser] = useState<User | null>(null)

  useEffect(() => {
    if (!user?.id) return

    async function fetchUser() {
      const response = await requestData<ApiPayload<User>>(
        `/user/${user?.id}`,
        "GET",
        {},
        true
      )

      if (response.success && response.data?.user) {
        setRequestUser(response.data.user)
      }
    }

    fetchUser()
  }, [user])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  async function handleLogout() {
    const response = await logout()

    if (response.success && response.data?.status) {
      setFlashMessage(response.data.message, "success")
      navigate("/")
    } else {
      setFlashMessage(response.message || "Erro ao fazer logout", "error")
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-900/95">
        <div className="w-full px-4 md:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-linear-to-br from-blue-600 to-blue-700 p-2.5 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition border border-blue-400/30">
                  <Calendar className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>

              <span className="text-lg font-semibold text-white">
                Estacionamento
              </span>
            </Link>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => setOpen(prev => !prev)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-200 hover:bg-slate-700/50 transition-colors"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? <X size={22} /> : <MenuIcon size={22} />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-3">
              {!authenticated ? (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-blue-400 font-medium rounded-xl hover:bg-slate-700/50 transition-colors"
                  >
                    Entrar
                  </Link>

                  <Link
                    to="/register"
                    className="px-4 py-2 bg-linear-to-br from-blue-600 to-blue-700 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105"
                  >
                    Criar Conta
                  </Link>
                </>
              ) : (
                <DesktopUserMenu
                  user={requestUser}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {authenticated && (
        <MobileDrawerMenu
          open={open}
          onClose={() => setOpen(false)}
          user={requestUser}
          onLogout={handleLogout}
        />
      )}
    </>
  )
}

export default NavBar
