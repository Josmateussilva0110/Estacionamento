import {
  User,
  Users,
  Car,
  ParkingSquare,
  MapPinPlus
} from "lucide-react"

export const MENU_ITEMS = [
  {
    label: "Meu Perfil",
    to: "/profile",
    icon: User,
  },
  {
    label: "Estacionamentos",
    to: "/parking/list",
    icon: ParkingSquare,
  },
  {
    label: "Clientes",
    to: "/client/list/clients",
    icon: Users,
  },
  {
    label: "Veículos",
    to: "/client/list/vehicles",
    icon: Car,
  },
  {
    label: "Alocar cliente",
    to: "/parking/allocation",
    icon: MapPinPlus,
  },
]
