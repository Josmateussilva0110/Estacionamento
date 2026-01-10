export const getStatusColor = (status) => {
  switch (status) {
    case "available": return "bg-green-100 text-green-700 border-green-300"
    case "occupied": return "bg-red-100 text-red-700 border-red-300"
    case "reserved": return "bg-yellow-100 text-yellow-700 border-yellow-300"
    default: return "bg-gray-100 text-gray-700 border-gray-300"
  }
}

export const getStatusLabel = (status) => {
  switch (status) {
    case "available": return "Disponível"
    case "occupied": return "Ocupada"
    case "reserved": return "Reservada"
    default: return "Desconhecido"
  }
}
