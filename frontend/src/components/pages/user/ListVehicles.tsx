import { useState, useEffect } from "react"
import {
    User,
    Edit,
    Trash2,
    Plus,
    Search,
    ChevronLeft,
    ChevronRight,
    Car,
    Calendar,
    MoreVertical,
    Palette,
    Bike,
    Truck,
    HelpCircle,
} from "lucide-react"

import { useNavigate } from "react-router-dom"

import ConfirmDeleteModal from "../../layout/DeleteModal"
import { requestData } from "../../../services/requestApi"
import { useUser } from "../../../context/useUser"
import { type ListPaginationVehiclesData } from "../../../types/client/listVehicles" 
import { type VehiclesDetails } from "../../../types/client/vehiclesDetail"




function VehicleList() {
    const navigate = useNavigate()
    const { user } = useUser()
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [openMenuId, setOpenMenuId] = useState<number | null>(null)
    const [page, setPage] = useState(1)
    const limit = 3
    const [total, setTotal] = useState(0)

    const [vehicles, setVehicles] = useState<VehiclesDetails[]>([])

    useEffect(() => {
        if (!user?.id) return
        async function fetchClients() {
            setIsLoading(true)
            const response = await requestData<ListPaginationVehiclesData>(`/clients/vehicles/pagination/${user?.id}`, "GET", {page, limit}, true)
            console.log(response)
            if(response.success && response.data?.vehicles) {
                setVehicles(response.data.vehicles.rows)
                setTotal(response.data.vehicles.total)
            }   
            else {
                setVehicles([])
                setTotal(0)
            }
            setIsLoading(false)
        }
        fetchClients()
    }, [user?.id, page, limit])

    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean
        clientId: number | null
        plate: string
    }>({
        isOpen: false,
        clientId: null,
        plate: ""
    })

    function openDeleteModal(id: number, name: string) {
        setDeleteModal({
            isOpen: true,
            clientId: id,
            plate: name
        })
        setOpenMenuId(null)
    }

    function closeDeleteModal() {
        setDeleteModal({
            isOpen: false,
            clientId: null,
            plate: ""
        })
    }

    async function confirmDelete() {
        if (!deleteModal.clientId) return

        setIsDeleting(true)

        // Simula uma chamada API
        setTimeout(() => {
            setVehicles((prev) => prev.filter((c) => c.id !== deleteModal.clientId))
            setIsDeleting(false)
            closeDeleteModal()
        }, 1000)
    }

    const filteredVehicles = vehicles.filter(
        (c) =>
            c.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.color.includes(searchTerm)

    )

    // Paginação
    const totalPages = Math.ceil(total / limit)
    const canGoPrev = page > 1
    const canGoNext = page < totalPages

    function formatDate(dateString: string) {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR')
    }

    function handleEdit(id: number) {
        console.log('Editar cliente:', id)
        // Aqui você adicionará a navegação quando integrar com seu router
    }

    function handleRegister() {
        navigate("/client/vehicle/register")
    }

    function getVehicleIcon(type: string) {
        switch (type) {
            case "carro":
                return Car
            case "moto":
                return Bike
            case "caminhonete":
                return Truck
            default:
                return HelpCircle
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-linear-to-r from-blue-600 to-blue-500 px-8 py-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                                    <Car className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">
                                        Veículos
                                    </h1>
                                    <p className="text-blue-100">
                                        Gerencie os veículos cadastrados
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleRegister}
                                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition"
                            >
                                <Plus size={18} />
                                Novo Veículo
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
                                placeholder="Buscar por placa, cliente, marca, cor ou tipo..."
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* List */}
                    <div className="px-8 py-6 space-y-6">
                        {/* Loading */}
                        {isLoading && (
                            <div className="flex justify-center py-16">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        )}

                        {/* Nenhum veículo */}
                        {!isLoading && filteredVehicles.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
                                <Car className="w-12 h-12 mb-4 text-gray-400" />
                                <p className="text-lg font-semibold">
                                    Nenhum veículo encontrado
                                </p>
                                <p className="text-sm">
                                    {searchTerm ? "Tente buscar com outros termos" : 'Clique em "Novo Veículo" para começar'}
                                </p>
                            </div>
                        )}

                        {!isLoading && filteredVehicles.map((vehicle) => {
                            const VehicleIcon = getVehicleIcon(vehicle.vehicleType)
                            return (
                                <div
                                    key={vehicle.id}
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
                                        <div className="space-y-3 flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                                        <VehicleIcon className="w-5 h-5 text-blue-600" />
                                                        {vehicle.plate}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm">
                                                        {vehicle.brand} - {vehicle.vehicleType}
                                                    </p>
                                                </div>

                                                {/* Mobile menu */}
                                                <div className="relative lg:hidden">
                                                    <button
                                                        onClick={() =>
                                                            setOpenMenuId(
                                                                openMenuId === vehicle.id ? null : vehicle.id
                                                            )
                                                        }
                                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                                    >
                                                        <MoreVertical className="w-5 h-5" />
                                                    </button>

                                                    {openMenuId === vehicle.id && (
                                                        <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-md z-10 min-w-[140px]">
                                                            <button
                                                                onClick={() => handleEdit(vehicle.id)}
                                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left rounded-t-xl"
                                                            >
                                                                <Edit size={16} /> Editar
                                                            </button>
                                                            <button
                                                                onClick={() => openDeleteModal(vehicle.id, vehicle.plate)}
                                                                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left rounded-b-xl"
                                                            >
                                                                <Trash2 size={16} /> Excluir
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                                                <div className="flex gap-2">
                                                    <User className="text-blue-600 w-4 h-4 shrink-0 mt-0.5" />
                                                    <span>{vehicle.clientName}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Palette className="text-blue-600 w-4 h-4 shrink-0" />
                                                    {vehicle.color}
                                                </div>
                                            </div>

                                            {/* Chips */}
                                            <div className="flex flex-wrap gap-3 pt-2">
                                                {/* Data de cadastro */}
                                                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                                                    bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                                                    <Calendar size={14} />
                                                    Cadastro: {formatDate(vehicle.registrationDate)}
                                                </span>

                                                {/* Tipo de veículo */}
                                                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                                                    bg-blue-100 text-blue-700 hover:bg-blue-200 transition">
                                                    <VehicleIcon size={14} />
                                                    {vehicle.vehicleType}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Desktop actions */}
                                        <div className="hidden lg:flex items-center gap-4">
                                            {/* Editar */}
                                            <button
                                                onClick={() => handleEdit(vehicle.id)}
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
                                                onClick={() => openDeleteModal(vehicle.id, vehicle.plate)}
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
                            )
                        })}

                        {/* Pagination */}
                        {!isLoading && filteredVehicles.length > 0 && (
                            <div className="
                                flex flex-col gap-4
                                sm:flex-row sm:items-center sm:justify-between
                                pt-6 border-t border-slate-200
                            ">
                                <p className="text-sm text-gray-500 text-center sm:text-left">
                                    Mostrando {filteredVehicles.length} de {total} veículos
                                </p>

                                <div className="flex items-center justify-center gap-2">
                                    {/* Anterior */}
                                    <button
                                        onClick={() => setPage((p) => p - 1)}
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
                                        {page}
                                    </span>

                                    {/* Próximo */}
                                    <button
                                        onClick={() => setPage((p) => p + 1)}
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
                        )}
                    </div>
                </div>
            </div>

            <ConfirmDeleteModal
                isOpen={deleteModal.isOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                itemName={deleteModal.plate}
                isLoading={isDeleting}
            />
        </div>
    )
}

export default VehicleList
