import { AreaType, type AreaTypeValue } from "../constants/areaType"

export function mapAreaTypeToNumber(type: string): AreaTypeValue {
  const map = {
    coberta: AreaType.COBERTA,
    descoberta: AreaType.DESCOBERTA,
    mista: AreaType.MISTA,
  } as const

  return map[type as keyof typeof map]
}
