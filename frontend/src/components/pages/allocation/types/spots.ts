export type VehicleType = "car" | "moto" | "truck" | "pcd" | "elderly"

export interface Spots {
  carSpots: number
  motoSpots: number
  truckSpots: number
  pcdSpots: number
  elderlySpots: number
}

export interface SpotTypeInfo {
  type: VehicleType
  label: string
  icon: string
  color: {
    bg: string
    border: string
    icon: string
    text: string
  }
  category: "standard" | "special"
}

export const spotTypesInfo: SpotTypeInfo[] = [
  {
    type: "car",
    label: "Carros",
    icon: "Car",
    color: {
      bg: "from-emerald-50 to-green-50",
      border: "emerald",
      icon: "from-emerald-400 to-emerald-500",
      text: "text-emerald-600"
    },
    category: "standard"
  },
  {
    type: "moto",
    label: "Motos",
    icon: "Bike",
    color: {
      bg: "from-cyan-50 to-blue-50",
      border: "cyan",
      icon: "from-cyan-400 to-cyan-500",
      text: "text-cyan-600"
    },
    category: "standard"
  },
  {
    type: "truck",
    label: "Caminhões",
    icon: "Truck",
    color: {
      bg: "from-orange-50 to-amber-50",
      border: "orange",
      icon: "from-orange-400 to-orange-500",
      text: "text-orange-600"
    },
    category: "standard"
  },
  {
    type: "pcd",
    label: "PCD",
    icon: "User",
    color: {
      bg: "from-blue-50 to-indigo-50",
      border: "blue",
      icon: "from-blue-400 to-blue-500",
      text: "text-blue-600"
    },
    category: "special"
  },
  {
    type: "elderly",
    label: "Idosos",
    icon: "Users",
    color: {
      bg: "from-purple-50 to-pink-50",
      border: "purple",
      icon: "from-purple-400 to-purple-500",
      text: "text-purple-600"
    },
    category: "special"
  }
]

export function getSpotCount(spotsData: Spots | null, type: VehicleType): number {
  if (!spotsData) return 0
  
  const mapping: Record<VehicleType, keyof Spots> = {
    car: "carSpots",
    moto: "motoSpots",
    truck: "truckSpots",
    pcd: "pcdSpots",
    elderly: "elderlySpots"
  }
  
  return spotsData[mapping[type]]
}
