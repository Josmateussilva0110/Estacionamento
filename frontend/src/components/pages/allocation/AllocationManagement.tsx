import { useState, useCallback, useMemo, useEffect } from "react"
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
    Plus,
    CreditCard,
} from "lucide-react"
import { useUser } from "../../../context/useUser"
import { requestData } from "../../../services/requestApi"
import { type AllocationDetail } from "../../../types/allocation/allocationDetail"
import { type ListPaginationAllocationData } from "../../../types/allocation/listAllocations"
import ConfirmDeleteModal from "../../layout/DeleteModal"
import useFlashMessage from "../../../hooks/useFlashMessage"
import Pagination from "../../layout/Pagination"
import { formatDateTime, formatMinutesToDaysHHMM, formatPhone, } from "../../../utils/formatations"
import { formatPayment } from "../../../utils/formatations"



function AllocationManagement() {
    const navigate = useNavigate()
    const { user } = useUser()
    const { setFlashMessage } = useFlashMessage()
    const [isLoading, setIsLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState<string>("all")
    const [page, setPage] = useState(1)
    const limit = 3
    const [allocations, setAllocations] = useState<AllocationDetail[]>([])
    const [showFilters, setShowFilters] = useState(false)

    const fetchAllocations = useCallback(async () => {
        if (!user?.id) return

        setIsLoading(true)

        const response = await requestData<ListPaginationAllocationData>(
            `/allocations/pagination/${user.id}`,
            "GET",
            { page, limit },
            true
        )

        //console.log(response)

        if (response.success && response.data?.allocations) {
            setAllocations(response.data.allocations.rows)
            setTotal(response.data.allocations.total)
        } else {
            setAllocations([])
            setTotal(0)
        }

        setIsLoading(false)
    }, [user?.id, page, limit])

    useEffect(() => {
        fetchAllocations()
    }, [fetchAllocations])

    
    function updateAllocations() {
        fetchAllocations()
    }

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
            case "carro":
                return <Car className="w-4 h-4" />
            case "moto":
                return <Bike className="w-4 h-4" />
            case "caminhonete":
                return <Truck className="w-4 h-4" />
            default:
                return <Car className="w-4 h-4" />
        }
    }

    function getVehicleTypeLabel(type: string) {
        switch (type) {
            case "carro":
                return "Carro"
            case "moto":
                return "Moto"
            case "caminhonete":
                return "Caminhonete"
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
            carro: "bg-blue-500/20 text-blue-300 border-blue-500/30",
            moto: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
            caminhonete: "bg-orange-500/20 text-orange-300 border-orange-500/30",
            pcd: "bg-blue-500/20 text-blue-300 border-blue-500/30",
            elderly: "bg-pink-500/20 text-pink-300 border-pink-500/30"
        }
        return configs[type as keyof typeof configs] || configs.carro
    }

    
    function getPaymentTextColor(paymentType: string ) {
        switch (paymentType?.toLowerCase()) {
            case 'hour':
                return 'text-red-400';
            case 'day':
                return 'text-blue-400';
            case 'month':
                return 'text-emerald-400';
            default:
                return 'text-slate-200';
        }
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
    const filteredAllocations = useMemo(() => {
        return allocations.filter((allocation) => {
            const matchesSearch =
            allocation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            allocation.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            allocation.parkingName.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesType =
            filterType === "all" || allocation.vehicleType === filterType

            return matchesSearch && matchesType
        })
    }, [allocations, searchTerm, filterType])



    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="relative overflow-hidden bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-blue-600/20 to-blue-600/20" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

                    <div className="relative px-8 py-10">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl" />
                                    <div className="relative w-16 h-16 bg-blue-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-blue-400/30">
                                        <Activity className="w-8 h-8 text-blue-300" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
                                        Alocações Ativas
                                    </h1>
                                    <p className="text-blue-200 text-lg">
                                        Monitore veículos em tempo real
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => updateAllocations()}
                                    className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-700/80 backdrop-blur-xl text-white font-semibold px-5 py-3 rounded-xl transition-all border border-slate-600/50 hover:scale-105"
                                >
                                    <RefreshCw size={18} />
                                    Atualizar
                                </button>
                                <button
                                    onClick={handleRegister}
                                    className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                                >
                                    <Plus size={18} />
                                    Nova Alocação
                                </button>
                                <button
                                    onClick={() => navigate("/")}
                                    className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-700/80 backdrop-blur-xl text-white font-semibold px-5 py-3 rounded-xl transition-all border border-slate-600/50 hover:scale-105"
                                >
                                    <ChevronLeft size={18} />
                                    Voltar
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                            <div className="bg-slate-700/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-slate-300 text-sm font-medium">Total Ativo</p>
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                                        <Car className="w-5 h-5 text-blue-300" />
                                    </div>
                                </div>
                                <p className="text-4xl font-bold text-white mb-1">
                                    {allocations.length}
                                </p>
                                <p className="text-blue-300 text-sm flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    +12% vs ontem
                                </p>
                            </div>

                            <div className="bg-slate-700/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-slate-300 text-sm font-medium">Tempo Médio</p>
                                    <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-400/30">
                                        <Clock className="w-5 h-5 text-orange-300" />
                                    </div>
                                </div>
                                <p className="text-4xl font-bold text-white mb-1">
                                    3h 20min
                                </p>
                                <p className="text-slate-300 text-sm flex items-center gap-1">
                                    <Activity className="w-4 h-4" />
                                    Ocupação normal
                                </p>
                            </div>

                            <div className="bg-slate-700/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-slate-300 text-sm font-medium">Receita Estimada</p>
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30">
                                        <DollarSign className="w-5 h-5 text-emerald-300" />
                                    </div>
                                </div>
                                <p className="text-4xl font-bold text-white mb-1">
                                    R$ {allocations.reduce((acc, curr) => acc + curr.estimatedCost, 0).toFixed(2)}
                                </p>
                                <p className="text-emerald-300 text-sm flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    +8% vs ontem
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por cliente, placa ou estacionamento..."
                                className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-400"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-slate-700/50 text-slate-200 hover:bg-slate-700/80 transition-all"
                            >
                                <Filter size={16} />
                                Filtros
                                <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                                    {filterType === "all" ? "0" : "1"}
                                </span>
                            </button>

                            <p className="text-sm text-slate-400">
                                {filteredAllocations.length} resultado{filteredAllocations.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                        {/* Type Filters */}
                        {showFilters && (
                            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700">
                                <button
                                    onClick={() => setFilterType("all")}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterType === "all"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-700/50 text-slate-200 hover:bg-slate-700/80"
                                        }`}
                                >
                                    Todos
                                </button>
                                <button
                                    onClick={() => setFilterType("carro")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterType === "carro"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-700/50 text-slate-200 hover:bg-slate-700/80"
                                        }`}
                                >
                                    <Car size={16} />
                                    Carros
                                </button>
                                <button
                                    onClick={() => setFilterType("moto")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterType === "moto"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-700/50 text-slate-200 hover:bg-slate-700/80"
                                        }`}
                                >
                                    <Bike size={16} />
                                    Motos
                                </button>
                                <button
                                    onClick={() => setFilterType("caminhonete")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterType === "caminhonete"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-700/50 text-slate-200 hover:bg-slate-700/80"
                                        }`}
                                >
                                    <Truck size={16} />
                                    Caminhões
                                </button>
                                <button
                                    onClick={() => setFilterType("pcd")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterType === "pcd"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-700/50 text-slate-200 hover:bg-slate-700/80"
                                        }`}
                                >
                                    <User size={16} />
                                    PCD
                                </button>
                                <button
                                    onClick={() => setFilterType("elderly")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterType === "elderly"
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-slate-700/50 text-slate-200 hover:bg-slate-700/80"
                                        }`}
                                >
                                    <UsersIcon size={16} />
                                    Idosos
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-16">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-700 border-t-blue-600"></div>
                            <p className="text-slate-300 font-medium">Carregando alocações...</p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && filteredAllocations.length === 0 && (
                    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-16 text-center">
                        <div className="w-20 h-20 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Car className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-200 mb-2">
                            Nenhuma alocação encontrada
                        </h3>
                        <p className="text-slate-400 mb-6">
                            {searchTerm || filterType !== "all"
                                ? "Tente ajustar sua busca ou limpar os filtros"
                                : "Comece cadastrando seu primeiro veículo"
                            }
                        </p>
                        {!searchTerm && filterType === "all" && (
                            <button
                                onClick={handleRegister}
                                className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                            >
                                <Plus size={18} />
                                Nova Alocação
                            </button>
                        )}
                    </div>
                )}

                {/* Allocation Cards */}
                <div className="grid gap-4">
                    {!isLoading && (filteredAllocations.map((allocation) => (
                        <div
                            key={allocation.id}
                            className="group bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]"
                        >
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <h3 className="text-xl font-bold text-white">
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
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <span className="font-mono font-semibold text-base">
                                                    {allocation.plate}
                                                </span>
                                                <span className="text-slate-500">•</span>
                                                <span className="text-sm">
                                                    {allocation.brand}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/30">
                                                <MapPin className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="  text-xs text-slate-400 font-medium mb-0.5">
                                                    Estacionamento
                                                </p>
                                                <p className="font-semibold text-slate-200 text-sm">
                                                    {allocation.parkingName}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/30">
                                                <Calendar className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium mb-0.5">
                                                    Entrada
                                                </p>
                                                <p className="font-semibold text-slate-200 text-sm">
                                                    {formatDateTime(allocation.entryDate)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center shrink-0 border border-orange-500/30">
                                                <Clock className="w-5 h-5 text-orange-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium mb-0.5">
                                                    Tempo decorrido
                                                </p>
                                                <p className="font-bold text-orange-400 text-lg">
                                                    {formatMinutesToDaysHHMM(allocation.currentDuration)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/30">
                                                <DollarSign className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium mb-0.5">
                                                    Valor estimado
                                                </p>
                                                <p className="font-bold text-emerald-400 text-lg">
                                                    R$ {allocation.estimatedCost.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-slate-500/20 rounded-xl flex items-center justify-center shrink-0 border border-slate-500/30">
                                                <User className="w-5 h-5 text-slate-300" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium mb-0.5">
                                                    Contato
                                                </p>
                                                <p className="font-semibold text-slate-200 text-sm">
                                                    {formatPhone(allocation.phone)}
                                                </p>
                                            </div>
                                        </div>


                                        <div className="flex items-start gap-3 sm:col-span-1">
                                            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center shrink-0 border border-purple-500/30">
                                                <CreditCard className="w-5 h-5 text-slate-300" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium mb-0.5">
                                                    Tipo de Cobrança
                                                </p>
                                                <p className={`font-semibold text-sm ${getPaymentTextColor(allocation.paymentType)}`}>
                                                    {formatPayment(allocation.paymentType)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Observations */}
                                    {allocation.observations && (
                                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                                            <p className="text-xs text-blue-300 font-semibold mb-1 uppercase tracking-wide">
                                                Observações
                                            </p>
                                            <p className="text-sm text-slate-300">
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
                                                allocation.plate
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
                {total >= 1 && (
                    <Pagination
                        page={page}
                        total={total}
                        limit={limit}
                        label="Alocações"
                        onPageChange={setPage}
                    />
                )}
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
