import { Link, useNavigate } from "react-router-dom"
import { LogIn, UserPlus, User, LogOut } from "lucide-react"
import { useUser } from "../../context/useUser"

function NavBar() {
  const { authenticated, user, logout } = useUser()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="w-full px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-parking-primary p-2 rounded-lg">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-parking-primary">
              Estacionamento
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {!authenticated ? (
              <>
                {/* Login Button */}
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 text-parking-primary font-semibold rounded-lg bg-blue-300 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-parking-primary focus:ring-offset-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>

                {/* Register Button */}
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
                {/* Profile Button */}
                <Link
                  to="/perfil"
                  className="flex items-center space-x-2 px-4 py-2 text-parking-primary font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <User size={18} />
                  <span>{user?.username || "Perfil"}</span>
                </Link>

                {/* Logout Button */}
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
      </div>
    </nav>
  )
}

export default NavBar

