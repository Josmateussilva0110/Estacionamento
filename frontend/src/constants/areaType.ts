export const AreaType = {
  COBERTA: 1,
  DESCOBERTA: 2,
  MISTA: 3,
} as const

export type AreaTypeValue = typeof AreaType[keyof typeof AreaType]
