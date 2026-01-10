import { Car, Bike, Truck } from "lucide-react"

export const getVehicleIcon = (type) => {
  switch (type) {
    case "car": return <Car className="w-5 h-5" />
    case "moto": return <Bike className="w-5 h-5" />
    case "truck": return <Truck className="w-5 h-5" />
  }
}

export const getVehicleLabel = (type) => {
  switch (type) {
    case "car": return "Carro"
    case "moto": return "Moto"
    case "truck": return "Caminhonete"
  }
}
