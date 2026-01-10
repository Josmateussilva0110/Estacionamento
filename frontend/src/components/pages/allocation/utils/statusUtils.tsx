export type SpotStatus = "available" | "occupied" | "reserved"

export const getStatusColor = (status: SpotStatus) => {
  switch (status) {
    case "available": return "bg-green-100 text-green-700 border-green-300"
    case "occupied": return "bg-red-100 text-red-700 border-red-300"
    case "reserved": return "bg-yellow-100 text-yellow-700 border-yellow-300"
  }
}

export const getStatusLabel = (status: SpotStatus) => {
  switch (status) {
    case "available": return "Disponível"
    case "occupied": return "Ocupada"
    case "reserved": return "Reservada"
  }
}
