import {
  User,
  UserPlus,
  Car,
  ParkingSquare,
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
    label: "Adicionar Cliente",
    to: "/client/register",
    icon: UserPlus,
  },
  {
    label: "Adicionar Veículo",
    to: "/client/vehicle/register",
    icon: Car,
  },
]
