import { Car, Bike, Truck, Accessibility, UserRound } from "lucide-react"

export type VehicleType = "car" | "moto" | "truck" | "pcd" | "elderly"

export const VEHICLE_TYPE_API = {
  CAR: 1,
  MOTO: 2,
  TRUCK: 3,
  PDC: 4,
  ELDERLY: 5
} as const

export type VehicleTypeApi =
  typeof VEHICLE_TYPE_API[keyof typeof VEHICLE_TYPE_API]

export const getVehicleIcon = (type: VehicleType) => {
  switch (type) {
    case "car":
      return <Car className="w-5 h-5" />
    case "moto":
      return <Bike className="w-5 h-5" />
    case "truck":
      return <Truck className="w-5 h-5" />
    case "pcd":
      return <Accessibility className="w-5 h-5" />
    case "elderly":
      return <UserRound className="w-5 h-5" />
  }
}

export const getVehicleLabel = (type: VehicleType) => {
  switch (type) {
    case "car":
      return "Carro"
    case "moto":
      return "Moto"
    case "truck":
      return "Caminhonete"
    case "pcd":
      return "PCD"
    case "elderly":
      return "Idoso"
  }
}

export const mapVehicleTypeToApi = (type: VehicleType): VehicleTypeApi => {
  const map: Record<VehicleType, VehicleTypeApi> = {
    car: VEHICLE_TYPE_API.CAR,
    moto: VEHICLE_TYPE_API.MOTO,
    truck: VEHICLE_TYPE_API.TRUCK,
    pcd: VEHICLE_TYPE_API.PDC,
    elderly: VEHICLE_TYPE_API.ELDERLY
  }

  return map[type]
}
