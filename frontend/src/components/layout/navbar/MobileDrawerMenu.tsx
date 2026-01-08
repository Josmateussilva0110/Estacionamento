import { Fragment } from "react"
import { Transition } from "@headlessui/react"
import { Link } from "react-router-dom"
import { LogOut, X } from "lucide-react"
import { MENU_ITEMS } from "./menuItems"
import { UserAvatar } from "./UserAvatar"
import type { User } from "../../../types/client/user"

interface Props {
  open: boolean
  onClose: () => void
  user: User | null
  onLogout: () => void
}

export function MobileDrawerMenu({
  open,
  onClose,
  user,
  onLogout,
}: Props) {
  return (
    <Transition show={open} as={Fragment}>
      <div className="md:hidden fixed inset-0 z-50">
        <div
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />

        <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-xl">
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <span className="text-lg font-semibold text-blue-600">
              Menu
            </span>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="px-4 py-4 border-b">
            <div className="flex items-center gap-3">
              <UserAvatar user={user} />
              <div>
                <p className="text-sm font-medium">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="py-2">
            {MENU_ITEMS.map(item => {
              const Icon = item.icon
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}

            <button
              onClick={() => {
                onClose()
                onLogout()
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
      </div>
    </Transition>
  )
}
