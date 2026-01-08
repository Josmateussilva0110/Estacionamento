import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { Link } from "react-router-dom"
import { LogOut } from "lucide-react"
import { MENU_ITEMS } from "./menuItems"
import { UserAvatar } from "./UserAvatar"
import type { User } from "../../../types/client/user"

interface Props {
  user: User | null
  onLogout: () => void
}

export function DesktopUserMenu({ user, onLogout }: Props) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100">
        <UserAvatar user={user} size="sm" />
        <span className="max-w-[100px] truncate text-sm font-medium text-gray-700">
          {user?.username}
        </span>
      </Menu.Button>

      <Transition as={Fragment}>
        <Menu.Items className="
            absolute right-0 mt-3 w-64
            bg-white rounded-2xl
            shadow-xl shadow-black/5 
        ">
        <div className="px-4 py-3 border-b border-gray-200/70">
            <p className="text-sm font-medium truncate">{user?.username}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        </div>


          <div className="py-1 ">
            {MENU_ITEMS.map(item => {
              const Icon = item.icon
              return (
                <Menu.Item key={item.to}>
                  {({ active }) => (
                    <Link
                      to={item.to}
                      className={`flex items-center gap-3 px-4 py-2 text-sm ${
                        active ? "bg-blue-50 text-blue-600" : "text-gray-700"
                      }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  )}
                </Menu.Item>
              )
            })}
          </div>

          <div className="mt-1 pt-1 border-t border-gray-200/70">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onLogout}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-sm ${
                    active ? "bg-red-50 text-red-600 rounded-2xl" : "text-gray-700"
                  }`}
                >
                  <LogOut size={18} />
                  Sair
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
