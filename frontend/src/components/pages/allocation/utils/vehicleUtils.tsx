import { Car, Bike, Truck } from "lucide-react"

export type VehicleType = "car" | "moto" | "truck"

export const VEHICLE_TYPE_API = {
  CAR: 1,
  MOTO: 2,
  TRUCK: 3,
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
  }
}

export const mapVehicleTypeToApi = (type: VehicleType): VehicleTypeApi => {
  const map: Record<VehicleType, VehicleTypeApi> = {
    car: VEHICLE_TYPE_API.CAR,
    moto: VEHICLE_TYPE_API.MOTO,
    truck: VEHICLE_TYPE_API.TRUCK,
  }

  return map[type]
}
