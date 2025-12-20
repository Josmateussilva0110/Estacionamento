import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Car,
    MapPin,
    Phone,
    Clock,
    Edit,
    Trash2,
    Plus,
    Search,
    ChevronLeft,
    ChevronRight,
    Building2,
    DollarSign,
    MoreVertical,
} from "lucide-react"

// Mock data - substituir pela API
const mockParkings = [
    {
        id: 1,
        parkingName: "Estacionamento Central",
        managerName: "João Silva",
        address: {
            street: "Rua das Flores",
            number: "123",
            district: "Centro",
            city: "São Paulo",
            state: "SP",
        },
        contacts: {
            phone: "(11) 99999-9999",
            openingHours: { start: "06:00", end: "22:00" },
        },
        operations: {
            totalSpots: 150,
            carSpots: 100,
            motoSpots: 30,
            hasCameras: true,
        },
        prices: {
            priceHour: 15,
        },
    },
    {
        id: 2,
        parkingName: "Park Shopping",
        managerName: "Maria Santos",
        address: {
            street: "Av. Paulista",
            number: "1500",
            district: "Bela Vista",
            city: "São Paulo",
            state: "SP",
        },
        contacts: {
            phone: "(11) 88888-8888",
            openingHours: { start: "00:00", end: "23:59" },
        },
        operations: {
            totalSpots: 500,
            carSpots: 400,
            motoSpots: 80,
            hasCameras: true,
        },
        prices: {
            priceHour: 20,
        },
    },
]

function ParkingList() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")
    const [openMenuId, setOpenMenuId] = useState<number | null>(null)

    const filteredParkings = mockParkings.filter(
        (parking) =>
            parking.parkingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parking.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parking.address.district.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const ITEMS_PER_PAGE = 1
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(filteredParkings.length / ITEMS_PER_PAGE)

    const canGoPrev = currentPage > 1
    const canGoNext = currentPage < totalPages


    return (
        <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-linear-to-r from-blue-600 to-blue-500 px-8 py-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                                    <Building2 className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">
                                        Estacionamentos
                                    </h1>
                                    <p className="text-blue-100">
                                        Gerencie seus estacionamentos cadastrados
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/parking/register")}
                                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition"
                            >
                                <Plus size={18} />
                                Novo Estacionamento
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="px-8 py-6 border-b border-slate-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por nome, cidade ou bairro..."
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* List */}
                    <div className="px-8 py-6 space-y-6">
                        {filteredParkings.map((parking) => (
                            <div
                                key={parking.id}
                                className="
                                    bg-white
                                    border border-blue-200
                                    rounded-2xl
                                    shadow-sm
                                    p-6
                                    transition-all duration-300
                                    hover:shadow-lg
                                    hover:-translate-y-1
                                    hover:border-blue-400
                                    "
                            >
                                <div className="flex flex-col lg:flex-row justify-between gap-6">
                                    {/* Info */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold">
                                                    {parking.parkingName}
                                                </h3>
                                                <p className="text-gray-500 text-sm">
                                                    Responsável: {parking.managerName}
                                                </p>
                                            </div>

                                            {/* Mobile menu */}
                                            <div className="relative lg:hidden">
                                                <button
                                                    onClick={() =>
                                                        setOpenMenuId(
                                                            openMenuId === parking.id ? null : parking.id
                                                        )
                                                    }
                                                >
                                                    <MoreVertical />
                                                </button>

                                                {openMenuId === parking.id && (
                                                    <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-md">
                                                        <button
                                                            onClick={() =>
                                                                navigate(`/parking/edit/${parking.id}`)
                                                            }
                                                            className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 w-full"
                                                        >
                                                            <Edit size={16} /> Editar
                                                        </button>
                                                        <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full">
                                                            <Trash2 size={16} /> Excluir
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                                            <div className="flex gap-2">
                                                <MapPin className="text-blue-600 w-4 h-4" />
                                                {parking.address.street},{" "}
                                                {parking.address.number} -{" "}
                                                {parking.address.district},{" "}
                                                {parking.address.city}/{parking.address.state}
                                            </div>
                                            <div className="flex gap-2">
                                                <Phone className="text-blue-600 w-4 h-4" />
                                                {parking.contacts.phone}
                                            </div>
                                            <div className="flex gap-2">
                                                <Clock className="text-blue-600 w-4 h-4" />
                                                {parking.contacts.openingHours.start} -{" "}
                                                {parking.contacts.openingHours.end}
                                            </div>
                                            <div className="flex gap-2">
                                                <DollarSign className="text-blue-600 w-4 h-4" />
                                                R$ {parking.prices.priceHour.toFixed(2)}/hora
                                            </div>
                                        </div>

                                        {/* Chips */}
                                        <div className="flex flex-wrap gap-3 pt-2">
                                            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2">
                                                <Car size={14} />
                                                {parking.operations.totalSpots} vagas totais
                                            </span>
                                            <span className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold">
                                                {parking.operations.carSpots} carros
                                            </span>
                                            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                                {parking.operations.motoSpots} motos
                                            </span>
                                            {parking.operations.hasCameras && (
                                                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                                    📹 Câmeras
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Desktop actions */}
                                    <div className="hidden lg:flex items-center gap-4">
                                        {/* Editar */}
                                        <button
                                            onClick={() => navigate(`/parking/edit/${parking.id}`)}
                                            className="
                                                flex items-center gap-2
                                                h-12 px-6
                                                bg-blue-600
                                                text-white font-semibold
                                                rounded-xl
                                                transition-all duration-300
                                                hover:bg-blue-700
                                                hover:shadow-lg
                                                hover:-translate-y-0.5
                                                active:scale-95
                                            "
                                        >
                                            <Edit size={18} />
                                            Editar
                                        </button>

                                        {/* Excluir */}
                                        <button
                                            className="
                                                flex items-center gap-2
                                                h-12 px-6
                                                border border-red-200
                                                bg-red-50
                                                text-red-600 font-semibold
                                                rounded-xl
                                                transition-all duration-300
                                                hover:bg-red-100
                                                hover:border-red-300
                                                hover:shadow-md
                                                hover:-translate-y-0.5
                                                active:scale-95
                                            "
                                        >
                                            <Trash2 size={18} />
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        <div className="
                            flex flex-col gap-4
                            sm:flex-row sm:items-center sm:justify-between
                            pt-6 border-t border-slate-200
                            ">
                            <p className="text-sm text-gray-500 text-center sm:text-left">
                                Mostrando {filteredParkings.length} estacionamentos
                            </p>

                            <div className="flex items-center justify-center gap-2">
                                {/* Anterior */}
                                <button
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    disabled={!canGoPrev}
                                    className="
                                        flex items-center gap-1
                                        px-4 py-2
                                        rounded-lg text-sm font-medium
                                        transition-all
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        disabled:hover:shadow-none
                                        bg-gray-100 hover:bg-gray-200
                                    "
                                                                >
                                    <ChevronLeft size={16} />
                                    <span className="hidden sm:inline">Anterior</span>
                                </button>

                                {/* Página atual */}
                                <span className="
                                    px-4 py-2
                                    bg-blue-600 text-white
                                    rounded-lg text-sm font-semibold
                                    min-w-10 text-center
                                    ">
                                    {currentPage}
                                </span>

                                {/* Próximo */}
                                <button
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    disabled={!canGoNext}
                                    className="
                                        flex items-center gap-1
                                        px-4 py-2
                                        rounded-lg text-sm font-medium
                                        transition-all
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        disabled:hover:shadow-none
                                        bg-gray-100 hover:bg-gray-200
                                    "
                                >
                                    <span className="hidden sm:inline">Próximo</span>
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParkingList
