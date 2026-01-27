import { Fragment } from "react"
import { Transition } from "@headlessui/react"
import { Link } from "react-router-dom"
import { LogOut, X, ChevronRight } from "lucide-react"
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
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
        </Transition.Child>

        {/* Drawer Panel */}
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl">
            <div className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl" />
              
              <div className="relative flex items-center justify-between">
                <span className="text-xl font-bold text-white tracking-tight">
                  Menu
                </span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  <X className="text-white" size={20} />
                </button>
              </div>
            </div>

            {/* User Info Card */}
            <div className="px-6 py-6 border-b border-slate-200">
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md" />
                    <UserAvatar user={user} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-slate-800 truncate">
                      {user?.username}
                    </p>
                    <p className="text-sm text-slate-600 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-4 px-3 flex-1 overflow-y-auto">
              <div className="space-y-1">
                {MENU_ITEMS.map(item => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className="group flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                          <Icon size={20} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <span className="font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                      />
                    </Link>
                  )
                })}
              </div>

              {/* Logout Button */}
              <div className="mt-6 px-4">
                <button
                  onClick={() => {
                    onClose()
                    onLogout()
                  }}
                  className="group flex w-full items-center justify-between px-4 py-3.5 rounded-xl bg-linear-to-r from-red-50 to-red-100 border border-red-200 hover:from-red-100 hover:to-red-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-red-500/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                      <LogOut size={20} className="text-red-600 group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className="font-semibold text-red-600">
                      Sair
                    </span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-red-400 group-hover:translate-x-1 transition-all"
                  />
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}
