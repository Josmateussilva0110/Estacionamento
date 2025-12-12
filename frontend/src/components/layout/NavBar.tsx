import { useState, Fragment, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LogIn, UserPlus, User as UserIcon, LogOut, Menu as MenuIcon, X, PlusSquare } from "lucide-react"
import { Menu, Transition } from "@headlessui/react"
import { useUser } from "../../context/useUser"
import type { User } from "../../types/user"
import { requestData } from "../../services/requestApi"
import useFlashMessage from "../../hooks/useFlashMessage"

function NavBar() {
  const { authenticated, user, logout } = useUser()
  const navigate = useNavigate()
  const { setFlashMessage } = useFlashMessage()
  const [open, setOpen] = useState(false)
  const [requestUser, setRequestUser] = useState<User | null>(null)

  useEffect(() => {
    if (user?.id) {
      async function fetchUser() {
        const response = await requestData(`/user/${user?.id}`, "GET", {}, true)

        if (response.success && response.data?.user) {
          setRequestUser(response.data.user)
        } else {
          setRequestUser(null)
        }
      }
      fetchUser()
    }
  }, [user])

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

          {/* Logo */}
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
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-parking-primary hover:bg-blue-50"
            onClick={() => setOpen(prev => !prev)}
          >
            {open ? <X size={22} /> : <MenuIcon size={22} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">

            {!authenticated ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 text-parking-primary font-semibold rounded-lg bg-blue-300 hover:bg-blue-200 shadow-lg transition"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>

                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-parking-primary text-white font-bold px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-900 shadow-lg transition"
                >
                  <UserPlus size={18} />
                  <span>Registrar</span>
                </Link>
              </>
            ) : (
              /* Dropdown elegante */
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-parking-primary font-semibold rounded-lg hover:bg-blue-100 transition">
                  <UserIcon size={18} />
                  <span>{requestUser?.username || "Perfil"}</span>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition duration-75 ease-in"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 rounded-xl shadow-lg py-2">

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`flex items-center gap-3 px-4 py-2 text-sm ${active ? "bg-blue-50 text-parking-primary" : "text-gray-700"
                            }`}
                        >
                          <UserIcon size={18} />
                          Perfil
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/parking/register"
                          className={`flex items-center gap-3 px-4 py-2 text-sm ${active ? "bg-blue-50 text-parking-primary" : "text-gray-700"
                            }`}
                        >
                          <PlusSquare size={18} />
                          Cadastrar Estacionamento
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`flex w-full items-center gap-3 px-4 py-2 text-sm ${active ? "bg-red-50 text-red-600" : "text-gray-700"
                            }`}
                        >
                          <LogOut size={18} />
                          Sair
                        </button>
                      )}
                    </Menu.Item>

                  </Menu.Items>
                </Transition>
              </Menu>
            )}

          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden z-40 relative">

            {/* Fundo escurecido para dar foco ao menu */}
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            />

            {/* Drawer dropdown */}
            <div
              className="absolute left-0 right-0 mt-2 mx-3 rounded-xl bg-white shadow-xl 
                 border border-gray-200 py-4 animate-slideDown"
            >
              <div className="flex flex-col gap-3 px-3">

                {!authenticated ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 
                         text-parking-primary font-semibold hover:bg-blue-100 active:scale-95 transition"
                    >
                      <LogIn size={20} />
                      <span>Login</span>
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-parking-primary text-white 
                         font-bold hover:bg-blue-900 active:scale-95 transition"
                    >
                      <UserPlus size={20} />
                      <span>Registrar</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 
                         text-parking-primary font-semibold hover:bg-blue-100 active:scale-95 transition"
                    >
                      <UserIcon size={20} />
                      <span>{user?.username || "Perfil"}</span>
                    </Link>

                    <Link
                      to="/parking/register"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 
                         text-parking-primary font-semibold hover:bg-blue-100 active:scale-95 transition"
                    >
                      <PlusSquare size={20} />
                      <span>Cadastrar Estacionamento</span>
                    </Link>

                    <button
                      onClick={() => {
                        setOpen(false)
                        handleLogout()
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-red-600 text-white 
                         font-bold hover:bg-red-700 active:scale-95 transition"
                    >
                      <LogOut size={20} />
                      <span>Sair</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
