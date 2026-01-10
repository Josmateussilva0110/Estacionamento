import { User, Filter, AlertCircle, X } from "lucide-react"
import { getVehicleIcon, getVehicleLabel } from "../utils/vehicleUtils"
import { getStatusColor, getStatusLabel } from "../utils/statusUtils"

const mockParkingSpots = [
  { id: 1, number: "A-01", type: "car", status: "available", floor: "Térreo" },
  { id: 2, number: "A-02", type: "car", status: "occupied", floor: "Térreo" },
  { id: 3, number: "A-03", type: "car", status: "available", floor: "Térreo" },
  { id: 4, number: "A-04", type: "car", status: "reserved", floor: "Térreo" },
  { id: 5, number: "B-01", type: "moto", status: "available", floor: "Térreo" },
  { id: 6, number: "B-02", type: "moto", status: "available", floor: "Térreo" },
  { id: 7, number: "C-01", type: "truck", status: "available", floor: "1º Andar" },
  { id: 8, number: "C-02", type: "truck", status: "occupied", floor: "1º Andar" },
]

function SelectSpotStep({
  selectedClient,
  vehicleType,
  setVehicleType,
  filterFloor,
  setFilterFloor,
  setFilterType,
  onSpotSelect,
  onChangeClient
}) {
  const filteredSpots = mockParkingSpots.filter(spot => {
    const matchType = vehicleType === spot.type
    const matchFloor = filterFloor === "all" || spot.floor === filterFloor
    const matchStatus = spot.status === "available"
    return matchType && matchFloor && matchStatus
  })

  const floors = [...new Set(mockParkingSpots.map(s => s.floor))]

  return (
    <div className="space-y-6">
      {/* Header com info do cliente */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Cliente selecionado</p>
              <p className="text-lg font-bold text-gray-800">{selectedClient?.name}</p>
            </div>
          </div>
          <button
            onClick={onChangeClient}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
          >
            <X size={16} />
            Alterar
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Selecione a Vaga
        </h2>
        <p className="text-gray-600">
          Escolha uma vaga disponível para o veículo
        </p>
      </div>

      {/* Vehicle Type Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Tipo de Veículo
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(["car", "moto", "truck"]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setVehicleType(type)
                setFilterType(type)
              }}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                vehicleType === type
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-slate-50 border-slate-200 text-gray-600 hover:border-slate-300"
              }`}
            >
              {getVehicleIcon(type)}
              <span className="font-semibold text-sm">{getVehicleLabel(type)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 items-center">
        <Filter className="w-5 h-5 text-gray-500" />
        <select
          value={filterFloor}
          onChange={(e) => setFilterFloor(e.target.value)}
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">Todos os andares</option>
          {floors.map(floor => (
            <option key={floor} value={floor}>{floor}</option>
          ))}
        </select>
      </div>

      {/* Spots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredSpots.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>Nenhuma vaga disponível com os filtros selecionados</p>
          </div>
        ) : (
          filteredSpots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => onSpotSelect(spot)}
              disabled={spot.status !== "available"}
              className={`p-5 rounded-xl border-2 transition-all ${
                spot.status === "available"
                  ? "bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-400 hover:shadow-lg transform hover:-translate-y-1"
                  : getStatusColor(spot.status)
              } disabled:cursor-not-allowed disabled:hover:transform-none`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  spot.status === "available" ? "bg-green-200" : "bg-gray-200"
                }`}>
                  {getVehicleIcon(spot.type)}
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{spot.number}</p>
                  <p className="text-xs text-gray-600">{spot.floor}</p>
                  <span className={`text-xs font-semibold mt-1 inline-block px-2 py-1 rounded ${
                    spot.status === "available" ? "bg-green-200 text-green-800" : ""
                  }`}>
                    {getStatusLabel(spot.status)}
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default SelectSpotStep
