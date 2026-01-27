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
    Palette,
    Bike,
    Truck,
    HelpCircle,
    Filter,
} from "lucide-react"

import { useNavigate } from "react-router-dom"

import ConfirmDeleteModal from "../../layout/DeleteModal"
import { requestData } from "../../../services/requestApi"
import { useUser } from "../../../context/useUser"
import { type ListPaginationVehiclesData } from "../../../types/client/listVehicles" 
import { type VehiclesDetails } from "../../../types/client/vehiclesDetail"
import { type RemoveVehicleResponse } from "../../../types/client/clientResponse"
import useFlashMessage from "../../../hooks/useFlashMessage"
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage"


function VehicleList() {
    const navigate = useNavigate()
    const { user } = useUser()
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [page, setPage] = useState(1)
    const limit = 6
    const [total, setTotal] = useState(0)
    const [showFilters, setShowFilters] = useState(false)
    const [filterType, setFilterType] = useState<string>("all")
    const { setFlashMessage } = useFlashMessage()

    const [vehicles, setVehicles] = useState<VehiclesDetails[]>([])

    useEffect(() => {
        if (!user?.id) return
        async function fetchClients() {
            setIsLoading(true)
            const response = await requestData<ListPaginationVehiclesData>(`/vehicles/pagination/${user?.id}`, "GET", {page, limit}, true)
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
        vehicleId: number | null
        plate: string
    }>({
        isOpen: false,
        vehicleId: null,
        plate: ""
    })

    function openDeleteModal(id: number, name: string) {
        setDeleteModal({
            isOpen: true,
            vehicleId: id,
            plate: name
        })
    }

    function closeDeleteModal() {
        setDeleteModal({
            isOpen: false,
            vehicleId: null,
            plate: ""
        })
    }

    async function confirmDelete() {
        if (!deleteModal.vehicleId) return

        setIsDeleting(true)

        const response = await requestData<RemoveVehicleResponse>(`/vehicle/${deleteModal.vehicleId}`, "DELETE", {}, true)
        if(response.success && response.data?.status) {
            setFlashMessage(response.data.message, "success")
            setVehicles((prev) => prev.filter((p) => p.id !== deleteModal.vehicleId))
            setTotal((prev) => Math.max(prev - 1, 0))
            
            if (vehicles.length === 1 && page > 1) {
                setPage((p) => p - 1)
            }
            closeDeleteModal()
        }
        else {
            setFlashMessage(getApiErrorMessage(response), "error")
        }
        setIsDeleting(false)
    }

    const filteredVehicles = vehicles.filter((v) => {
        const matchesSearch =
            v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.color.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesType =
            filterType === "all" || v.vehicleType.toLowerCase() === filterType.toLowerCase()

        return matchesSearch && matchesType
    })

    // Paginação
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    function formatDate(dateString: string) {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR')
    }

    function handleEdit(id: number) {
        navigate(`/vehicle/edit/${id}`)
    }

    function handleRegister() {
        navigate("/vehicle/register")
    }

    function getVehicleIcon(type: string) {
        switch (type.toLowerCase()) {
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

    function getVehicleTypeBadge(type: string) {
        switch (type.toLowerCase()) {
            case "carro":
                return "bg-blue-50 text-blue-700 border-blue-200"
            case "moto":
                return "bg-emerald-50 text-emerald-700 border-emerald-200"
            case "caminhonete":
                return "bg-orange-50 text-orange-700 border-orange-200"
            default:
                return "bg-slate-50 text-slate-700 border-slate-200"
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl border border-slate-200/60">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 opacity-[0.97]" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
                    
                    <div className="relative px-8 py-10">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl" />
                                    <div className="relative w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
                                        <Car className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
                                        Veículos
                                    </h1>
                                    <p className="text-blue-100 text-lg">
                                        Gerencie os veículos cadastrados
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={handleRegister}
                                    className="flex items-center gap-2 bg-white hover:bg-white/90 text-blue-600 font-semibold px-5 py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
                                >
                                    <Plus size={18} />
                                    Novo Veículo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por placa, cliente, marca ou cor..."
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder:text-slate-400"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
                            >
                                <Filter size={16} />
                                Filtrar por Tipo
                                <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                                    {filterType === "all" ? "0" : "1"}
                                </span>
                            </button>

                            <p className="text-sm text-slate-500">
                                {filteredVehicles.length} resultado{filteredVehicles.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                        {/* Type Filters */}
                        {showFilters && (
                            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                                <button
                                    onClick={() => setFilterType("all")}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        filterType === "all"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                                >
                                    Todos
                                </button>
                                <button
                                    onClick={() => setFilterType("carro")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        filterType === "carro"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                                >
                                    <Car size={16} />
                                    Carros
                                </button>
                                <button
                                    onClick={() => setFilterType("moto")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        filterType === "moto"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                                >
                                    <Bike size={16} />
                                    Motos
                                </button>
                                <button
                                    onClick={() => setFilterType("caminhonete")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        filterType === "caminhonete"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                                >
                                    <Truck size={16} />
                                    Caminhonetes
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-16">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600"></div>
                            <p className="text-slate-600 font-medium">Carregando veículos...</p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && filteredVehicles.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-16 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Car className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-700 mb-2">
                            Nenhum veículo encontrado
                        </h3>
                        <p className="text-slate-500 mb-6">
                            {searchTerm || filterType !== "all"
                                ? "Tente ajustar sua busca ou limpar os filtros"
                                : "Comece cadastrando seu primeiro veículo"
                            }
                        </p>
                        {!searchTerm && filterType === "all" && (
                            <button
                                onClick={handleRegister}
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105"
                            >
                                <Plus size={18} />
                                Novo Veículo
                            </button>
                        )}
                    </div>
                )}

                {/* Vehicle Cards */}
                <div className="grid gap-4">
                    {!isLoading && filteredVehicles.map((vehicle) => {
                        const VehicleIcon = getVehicleIcon(vehicle.vehicleType)
                        return (
                            <div
                                key={vehicle.id}
                                className="group bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                    <h3 className="text-xl font-bold text-slate-800 font-mono">
                                                        {vehicle.plate}
                                                    </h3>
                                                    <span
                                                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${getVehicleTypeBadge(
                                                            vehicle.vehicleType
                                                        )}`}
                                                    >
                                                        <VehicleIcon className="w-3.5 h-3.5" />
                                                        {vehicle.vehicleType}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 text-sm font-semibold">
                                                    Marca: {vehicle.brand}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Info Grid */}
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                                    <User className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium mb-0.5">
                                                        Proprietário
                                                    </p>
                                                    <p className="font-semibold text-slate-800 text-sm">
                                                        {vehicle.clientName}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                                                    <Palette className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium mb-0.5">
                                                        Cor
                                                    </p>
                                                    <p className="font-semibold text-slate-800 text-sm">
                                                        {vehicle.color}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                                                    <Calendar className="w-5 h-5 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium mb-0.5">
                                                        Cadastrado em
                                                    </p>
                                                    <p className="font-semibold text-slate-800 text-sm">
                                                        {formatDate(vehicle.registrationDate)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right side - Actions */}
                                    <div className="flex lg:flex-col items-center justify-center gap-3 lg:min-w-[180px]">
                                        <button
                                            onClick={() => handleEdit(vehicle.id)}
                                            className="
                                                group/btn
                                                flex items-center justify-center gap-2
                                                w-full
                                                px-6 py-4
                                                bg-linear-to-r from-blue-600 to-indigo-600
                                                text-white font-semibold
                                                rounded-xl
                                                transition-all duration-300
                                                hover:from-blue-700 hover:to-indigo-700
                                                hover:shadow-xl hover:shadow-blue-500/30
                                                hover:scale-105
                                                active:scale-95
                                            "
                                        >
                                            <Edit size={18} className="group-hover/btn:rotate-12 transition-transform" />
                                            Editar
                                        </button>

                                        <button
                                            onClick={() => openDeleteModal(vehicle.id, vehicle.plate)}
                                            className="
                                                group/btn
                                                flex items-center justify-center gap-2
                                                w-full
                                                px-6 py-4
                                                bg-linear-to-r from-red-500 to-red-600
                                                text-white font-semibold
                                                rounded-xl
                                                transition-all duration-300
                                                hover:from-red-600 hover:to-red-700
                                                hover:shadow-xl hover:shadow-red-500/30
                                                hover:scale-105
                                                active:scale-95
                                            "
                                        >
                                            <Trash2 size={18} className="group-hover/btn:rotate-12 transition-transform" />
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Pagination */}
                {filteredVehicles.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-slate-600 text-center sm:text-left">
                                Mostrando <span className="font-semibold text-slate-800">{startIndex + 1}-
                                {Math.min(endIndex, filteredVehicles.length)}</span> de{" "}
                                <span className="font-semibold text-slate-800">{filteredVehicles.length}</span> veículos
                            </p>

                            <div className="flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="
                                        flex items-center gap-1
                                        px-4 py-2.5
                                        rounded-xl text-sm font-medium
                                        transition-all
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        bg-slate-100 hover:bg-slate-200
                                        text-slate-700
                                    "
                                >
                                    <ChevronLeft size={16} />
                                    <span className="hidden sm:inline">Anterior</span>
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNum
                                        if (totalPages <= 5) {
                                            pageNum = i + 1
                                        } else if (page <= 3) {
                                            pageNum = i + 1
                                        } else if (page >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i
                                        } else {
                                            pageNum = page - 2 + i
                                        }
                                        
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setPage(pageNum)}
                                                className={`
                                                    min-w-10 h-10
                                                    rounded-xl text-sm font-semibold
                                                    transition-all
                                                    ${page === pageNum
                                                        ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                    }
                                                `}
                                            >
                                                {pageNum}
                                            </button>
                                        )
                                    })}
                                </div>

                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="
                                        flex items-center gap-1
                                        px-4 py-2.5
                                        rounded-xl text-sm font-medium
                                        transition-all
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        bg-slate-100 hover:bg-slate-200
                                        text-slate-700
                                    "
                                >
                                    <span className="hidden sm:inline">Próximo</span>
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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
