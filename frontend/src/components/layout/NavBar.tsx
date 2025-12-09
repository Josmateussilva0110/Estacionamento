import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LogIn, UserPlus, User, LogOut, Menu, X } from "lucide-react"
import { useUser } from "../../context/useUser"
import useFlashMessage from "../../hooks/useFlashMessage"

function NavBar() {
  const { authenticated, user, logout } = useUser()
  const navigate = useNavigate()
  const { setFlashMessage } = useFlashMessage()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    const response = await logout()

    if (response.success && response.data?.status) {
      setFlashMessage(response.data.message, "success")
      navigate("/")      
    } else {
      setFlashMessage(response.message || "Erro ao fazer logout", "error")
      console.log("Erro no logout:", response.message)
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="w-full px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
            <div className="bg-parking-primary p-2 rounded-lg">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold text-parking-primary">
              Estacionamento
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-parking-primary hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-parking-primary focus:ring-offset-2"
            onClick={() => setOpen(prev => !prev)}
            aria-label="Abrir menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Navigation Links desktop */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {!authenticated ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 text-parking-primary font-semibold rounded-lg bg-blue-300 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-parking-primary focus:ring-offset-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>

                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-parking-primary text-white font-bold px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-900  focus:outline-none focus:ring-2 focus:ring-parking-primary focus:ring-offset-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <UserPlus size={18} />
                  <span>Registrar</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 text-parking-primary font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <User size={18} />
                  <span>{user?.username || "Perfil"}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <LogOut size={18} />
                  <span>Sair</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-3">
            <div className="flex flex-col gap-3">
              {!authenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-parking-primary font-semibold rounded-lg bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-parking-primary focus:ring-offset-2 shadow-md"
                  >
                    <span className="flex items-center space-x-2">
                      <LogIn size={18} />
                      <span>Login</span>
                    </span>
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-4 py-3 bg-parking-primary text-white font-bold rounded-lg bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-parking-primary focus:ring-offset-2 shadow-md"
                  >
                    <span className="flex items-center space-x-2">
                      <UserPlus size={18} />
                      <span>Registrar</span>
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-parking-primary font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-parking-primary focus:ring-offset-2 shadow-md"
                  >
                    <span className="flex items-center space-x-2">
                      <User size={18} />
                      <span>{user?.username || "Perfil"}</span>
                    </span>
                  </Link>

                  <button
                    onClick={() => {
                      setOpen(false)
                      handleLogout()
                    }}
                    className="flex items-center justify-between px-4 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md"
                  >
                    <span className="flex items-center space-x-2">
                      <LogOut size={18} />
                      <span>Sair</span>
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar

