export const VEHICLE_TYPES = {
  CARRO: 1,
  MOTO: 2,
  CAMINHONETE: 3,
} as const

export type VehicleType =
  typeof VEHICLE_TYPES[keyof typeof VEHICLE_TYPES]
