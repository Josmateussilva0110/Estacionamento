import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Car,
    Clock,
    User,
    MapPin,
    Search,
    DollarSign,
    Calendar,
    Bike,
    Truck,
    Users as UsersIcon,
    LogOut,
    ChevronLeft,
    Filter,
    RefreshCw,
    TrendingUp,
    Activity,
    Plus
} from "lucide-react"
import ConfirmDeleteModal from "../../layout/DeleteModal"
import useFlashMessage from "../../../hooks/useFlashMessage"
import Pagination from "../../layout/Pagination"

// Tipos
interface ActiveAllocation {
    id: number
    clientName: string
    clientPhone: string
    vehiclePlate: string
    vehicleModel: string
    vehicleType: "car" | "moto" | "truck" | "pcd" | "elderly"
    parkingName: string
    entryDate: string
    entryTime: string
    observations?: string
    currentDuration: string
    estimatedCost: number
}

// Dados mockados
const mockAllocations: ActiveAllocation[] = [
    {
        id: 1,
        clientName: "João Silva",
        clientPhone: "(11) 98765-4321",
        vehiclePlate: "ABC-1234",
        vehicleModel: "Honda Civic 2020",
        vehicleType: "car",
        parkingName: "Estacionamento Centro",
        entryDate: "27/01/2026",
        entryTime: "08:30",
        observations: "Cliente preferencial",
        currentDuration: "3h 45min",
        estimatedCost: 45.0,
    },
    {
        id: 2,
        clientName: "Maria Santos",
        clientPhone: "(11) 97654-3210",
        vehiclePlate: "XYZ-5678",
        vehicleModel: "Honda CG 160",
        vehicleType: "moto",
        parkingName: "Estacionamento Shopping",
        entryDate: "27/01/2026",
        entryTime: "10:15",
        observations: "",
        currentDuration: "2h 00min",
        estimatedCost: 16.0,
    },
    {
        id: 3,
        clientName: "Pedro Oliveira",
        clientPhone: "(11) 96543-2109",
        vehiclePlate: "DEF-9012",
        vehicleModel: "Toyota Corolla 2022",
        vehicleType: "car",
        parkingName: "Estacionamento Centro",
        entryDate: "27/01/2026",
        entryTime: "07:00",
        observations: "",
        currentDuration: "5h 15min",
        estimatedCost: 63.0,
    },
    {
        id: 4,
        clientName: "Ana Costa",
        clientPhone: "(11) 95432-1098",
        vehiclePlate: "GHI-3456",
        vehicleModel: "Fiat Uno 2019",
        vehicleType: "pcd",
        parkingName: "Estacionamento Norte",
        entryDate: "27/01/2026",
        entryTime: "09:00",
        observations: "Vaga PCD",
        currentDuration: "3h 15min",
        estimatedCost: 39.0,
    },
    {
        id: 5,
        clientName: "Carlos Mendes",
        clientPhone: "(11) 94321-0987",
        vehiclePlate: "JKL-7890",
        vehicleModel: "Mercedes Sprinter",
        vehicleType: "truck",
        parkingName: "Estacionamento Shopping",
        entryDate: "27/01/2026",
        entryTime: "06:30",
        observations: "Veículo de carga",
        currentDuration: "5h 45min",
        estimatedCost: 86.25,
    },
    {
        id: 6,
        clientName: "Rosa Lima",
        clientPhone: "(11) 93210-9876",
        vehiclePlate: "MNO-2345",
        vehicleModel: "Chevrolet Onix 2021",
        vehicleType: "elderly",
        parkingName: "Estacionamento Norte",
        entryDate: "27/01/2026",
        entryTime: "11:00",
        observations: "Vaga para idosos",
        currentDuration: "1h 15min",
        estimatedCost: 15.0,
    },
    {
        id: 7,
        clientName: "Lucas Ferreira",
        clientPhone: "(11) 92109-8765",
        vehiclePlate: "PQR-6789",
        vehicleModel: "Yamaha Fazer 250",
        vehicleType: "moto",
        parkingName: "Estacionamento Centro",
        entryDate: "27/01/2026",
        entryTime: "08:45",
        observations: "",
        currentDuration: "3h 30min",
        estimatedCost: 28.0,
    },
    {
        id: 8,
        clientName: "Juliana Rocha",
        clientPhone: "(11) 91098-7654",
        vehiclePlate: "STU-0123",
        vehicleModel: "Volkswagen Gol 2020",
        vehicleType: "car",
        parkingName: "Estacionamento Shopping",
        entryDate: "27/01/2026",
        entryTime: "10:30",
        observations: "",
        currentDuration: "1h 45min",
        estimatedCost: 21.0,
    }
]

function AllocationManagement() {
    const navigate = useNavigate()
    const { setFlashMessage } = useFlashMessage()
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState<string>("all")
    const [allocations] = useState<ActiveAllocation[]>(mockAllocations)
    const [page, setPage] = useState(1)
    const limit = 3
    const [showFilters, setShowFilters] = useState(false)

    const [endModal, setEndModal] = useState<{
        isOpen: boolean
        allocationId: number | null
        clientName: string
        vehiclePlate: string
    }>({
        isOpen: false,
        allocationId: null,
        clientName: "",
        vehiclePlate: ""
    })

    function getVehicleIcon(type: string) {
        switch (type) {
            case "car":
                return <Car className="w-4 h-4" />
            case "moto":
                return <Bike className="w-4 h-4" />
            case "truck":
                return <Truck className="w-4 h-4" />
            case "pcd":
                return <User className="w-4 h-4" />
            case "elderly":
                return <UsersIcon className="w-4 h-4" />
            default:
                return <Car className="w-4 h-4" />
        }
    }

    function getVehicleTypeLabel(type: string) {
        switch (type) {
            case "car":
                return "Carro"
            case "moto":
                return "Moto"
            case "truck":
                return "Caminhão"
            case "pcd":
                return "PCD"
            case "elderly":
                return "Idoso"
            default:
                return "Desconhecido"
        }
    }

    function getVehicleTypeBadge(type: string) {
        const configs = {
            car: "bg-blue-500/10 text-blue-600 border-blue-500/20",
            moto: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
            truck: "bg-orange-500/10 text-orange-600 border-orange-500/20",
            pcd: "bg-purple-500/10 text-purple-600 border-purple-500/20",
            elderly: "bg-pink-500/10 text-pink-600 border-pink-500/20"
        }
        return configs[type as keyof typeof configs] || configs.car
    }


    function openEndModal(id: number, clientName: string, vehiclePlate: string) {
        setEndModal({
            isOpen: true,
            allocationId: id,
            clientName,
            vehiclePlate
        })
    }

    function closeEndModal() {
        setEndModal({
            isOpen: false,
            allocationId: null,
            clientName: "",
            vehiclePlate: ""
        })
    }

    function confirmEndAllocation() {
        setFlashMessage(
            `Alocação encerrada com sucesso para ${endModal.clientName}`,
            "success"
        )
        closeEndModal()
    }

    function handleRegister() {
        navigate("/parking/allocation")
    }

    // Filtros
    const filteredAllocations = allocations.filter((allocation) => {
        const matchesSearch =
            allocation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            allocation.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            allocation.parkingName.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesType =
            filterType === "all" || allocation.vehicleType === filterType

        return matchesSearch && matchesType
    })

    // Paginação
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedAllocations = filteredAllocations.slice(startIndex, endIndex)

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl border border-slate-200/60">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 opacity-[0.97]" />
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
                    
                    <div className="relative px-8 py-10">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl" />
                                    <div className="relative w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
                                        <Activity className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
                                        Alocações Ativas
                                    </h1>
                                    <p className="text-blue-100 text-lg">
                                        Monitore veículos em tempo real
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setFlashMessage("Dados atualizados!", "success")}
                                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-xl text-white font-semibold px-5 py-3 rounded-xl transition-all border border-white/30 hover:scale-105"
                                >
                                    <RefreshCw size={18} />
                                    Atualizar
                                </button>
                                <button
                                    onClick={handleRegister}
                                    className="flex items-center gap-2 bg-white hover:bg-white/90 text-blue-600 font-semibold px-5 py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
                                >
                                    <Plus size={18} />
                                    Nova Alocação
                                </button>
                                <button
                                    onClick={() => navigate("/")}
                                    className="flex items-center gap-2 bg-white hover:bg-white/90 text-blue-600 font-semibold px-5 py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
                                >
                                    <ChevronLeft size={18} />
                                    Voltar
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-blue-100 text-sm font-medium">Total Ativo</p>
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                        <Car className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <p className="text-4xl font-bold text-white mb-1">
                                    {allocations.length}
                                </p>
                                <p className="text-blue-200 text-sm flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    +12% vs ontem
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-blue-100 text-sm font-medium">Tempo Médio</p>
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <p className="text-4xl font-bold text-white mb-1">
                                    3h 20min
                                </p>
                                <p className="text-blue-200 text-sm flex items-center gap-1">
                                    <Activity className="w-4 h-4" />
                                    Ocupação normal
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-blue-100 text-sm font-medium">Receita Estimada</p>
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <p className="text-4xl font-bold text-white mb-1">
                                    R$ {allocations.reduce((acc, curr) => acc + curr.estimatedCost, 0).toFixed(2)}
                                </p>
                                <p className="text-emerald-200 text-sm flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    +8% vs ontem
                                </p>
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
                                placeholder="Buscar por cliente, placa ou estacionamento..."
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
                                Filtros
                                <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                                    {filterType === "all" ? "0" : "1"}
                                </span>
                            </button>

                            <p className="text-sm text-slate-500">
                                {filteredAllocations.length} resultado{filteredAllocations.length !== 1 ? "s" : ""}
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
                                    onClick={() => setFilterType("car")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        filterType === "car"
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
                                    onClick={() => setFilterType("truck")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        filterType === "truck"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                                >
                                    <Truck size={16} />
                                    Caminhões
                                </button>
                                <button
                                    onClick={() => setFilterType("pcd")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        filterType === "pcd"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                                >
                                    <User size={16} />
                                    PCD
                                </button>
                                <button
                                    onClick={() => setFilterType("elderly")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        filterType === "elderly"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                                >
                                    <UsersIcon size={16} />
                                    Idosos
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Allocation Cards */}
                <div className="grid gap-4">
                    {paginatedAllocations.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-16 text-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Car className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">
                                Nenhuma alocação encontrada
                            </h3>
                            <p className="text-slate-500">
                                Tente ajustar os filtros ou realizar uma nova busca
                            </p>
                        </div>
                    ) : (
                        paginatedAllocations.map((allocation) => (
                            <div
                                key={allocation.id}
                                className="group bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                    <h3 className="text-xl font-bold text-slate-800">
                                                        {allocation.clientName}
                                                    </h3>
                                                    <span
                                                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${getVehicleTypeBadge(
                                                            allocation.vehicleType
                                                        )}`}
                                                    >
                                                        {getVehicleIcon(allocation.vehicleType)}
                                                        {getVehicleTypeLabel(allocation.vehicleType)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <span className="font-mono font-semibold text-base">
                                                        {allocation.vehiclePlate}
                                                    </span>
                                                    <span className="text-slate-400">•</span>
                                                    <span className="text-sm">
                                                        {allocation.vehicleModel}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Grid */}
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                                    <MapPin className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium mb-0.5">
                                                        Estacionamento
                                                    </p>
                                                    <p className="font-semibold text-slate-800 text-sm">
                                                        {allocation.parkingName}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                                                    <Calendar className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium mb-0.5">
                                                        Entrada
                                                    </p>
                                                    <p className="font-semibold text-slate-800 text-sm">
                                                        {allocation.entryDate} às {allocation.entryTime}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                                                    <Clock className="w-5 h-5 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium mb-0.5">
                                                        Tempo decorrido
                                                    </p>
                                                    <p className="font-bold text-orange-600 text-lg">
                                                        {allocation.currentDuration}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                                                    <DollarSign className="w-5 h-5 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium mb-0.5">
                                                        Valor estimado
                                                    </p>
                                                    <p className="font-bold text-emerald-600 text-lg">
                                                        R$ {allocation.estimatedCost.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3 sm:col-span-2">
                                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                                                    <User className="w-5 h-5 text-slate-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium mb-0.5">
                                                        Contato
                                                    </p>
                                                    <p className="font-semibold text-slate-800 text-sm">
                                                        {allocation.clientPhone}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Observations */}
                                        {allocation.observations && (
                                            <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-xl p-4">
                                                <p className="text-xs text-blue-700 font-semibold mb-1 uppercase tracking-wide">
                                                    Observações
                                                </p>
                                                <p className="text-sm text-slate-700">
                                                    {allocation.observations}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right side - Action */}
                                    <div className="flex lg:flex-col items-center justify-center gap-3 lg:min-w-[180px]">
                                        <button
                                            onClick={() =>
                                                openEndModal(
                                                    allocation.id,
                                                    allocation.clientName,
                                                    allocation.vehiclePlate
                                                )
                                            }
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
                                            <LogOut size={20} className="group-hover/btn:rotate-12 transition-transform" />
                                            Encerrar Vaga
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <Pagination
                    page={page}
                    total={filteredAllocations.length}
                    limit={limit}
                    label="alocações"
                    onPageChange={setPage}
                />
            </div>

            <ConfirmDeleteModal
                isOpen={endModal.isOpen}
                onClose={closeEndModal}
                onConfirm={confirmEndAllocation}
                itemName={`a vaga de ${endModal.clientName} (${endModal.vehiclePlate})`}
                isLoading={false}
                title="Encerrar Alocação"
            />
        </div>
    )
}

export default AllocationManagement
