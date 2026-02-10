import { useState, useEffect } from "react"
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
    Building2,
    DollarSign,
    Droplets,
    Camera,
    Bike,
} from "lucide-react"
import { type ListParkingData } from "../../../types/parking/listParking"
import { type ParkingDetails } from "../../../types/parking/parkingDetail"
import { type RemoveParkingResponse } from "../../../types/parking/parkingResponses"
import ConfirmDeleteModal from "../../layout/DeleteModal"
import { requestData } from "../../../services/requestApi"
import { useUser } from "../../../context/useUser"
import useFlashMessage from "../../../hooks/useFlashMessage"
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage"
import Pagination from "../../layout/Pagination"



function ParkingList() {
    const navigate = useNavigate()
    const { setFlashMessage } = useFlashMessage()
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const { user } = useUser()
    const [page, setPage] = useState(1)
    const limit = 6
    const [total, setTotal] = useState(0)

    const [parkings, setParkings] = useState<ParkingDetails[]>([])

    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean
        parkingId: number | null
        parkingName: string
    }>({
        isOpen: false,
        parkingId: null,
        parkingName: ""
    })


    useEffect(() => {
        if (!user?.id) return

        async function fetchParking() {
            setIsLoading(true)

            const response = await requestData<ListParkingData>(
                `/parking/list/${user?.id}`,
                "GET",
                { page, limit },
                true
            )

            if (response.success && response.data?.parking) {
                setParkings(response.data.parking.rows)
                setTotal(response.data.parking.total)
            } else {
                setParkings([])
                setTotal(0)
            }

            setIsLoading(false)
        }

        fetchParking()
    }, [user?.id, page, limit])

    function openDeleteModal(id: number, name: string) {
        setDeleteModal({
            isOpen: true,
            parkingId: id,
            parkingName: name
        })
    }

    function closeDeleteModal() {
        setDeleteModal({
            isOpen: false,
            parkingId: null,
            parkingName: ""
        })
    }

    async function confirmDelete() {
        if (!deleteModal.parkingId) return

        setIsDeleting(true)

        const response = await requestData<RemoveParkingResponse>(
            `/parking/${deleteModal.parkingId}`,
            "DELETE",
            {},
            true
        )

        if (response.success && response.data?.status) {
            setFlashMessage(response.data.message, "success")

            setParkings((prev) => prev.filter((p) => p.id !== deleteModal.parkingId))
            setTotal((prev) => Math.max(prev - 1, 0))
            
            if (parkings.length === 1 && page > 1) {
                setPage((p) => p - 1)
            }
        } else {
            setFlashMessage(getApiErrorMessage(response), "error")
        }

        setIsDeleting(false)
        closeDeleteModal()
    }

    const filteredParkings = parkings.filter(
        (p) =>
            p.parkingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.address.district.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
                                        <Building2 className="w-8 h-8 text-blue-300" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
                                        Estacionamentos
                                    </h1>
                                    <p className="text-blue-200 text-lg">
                                        Gerencie seus estacionamentos cadastrados
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => navigate("/parking/register")}
                                    className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                                >
                                    <Plus size={18} />
                                    Novo Estacionamento
                                </button>
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
                                placeholder="Buscar por nome, cidade ou bairro..."
                                className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-16">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-700 border-t-blue-600"></div>
                            <p className="text-slate-300 font-medium">Carregando estacionamentos...</p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && filteredParkings.length === 0 && (
                    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-16 text-center">
                        <div className="w-20 h-20 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Building2 className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-200 mb-2">
                            Nenhum estacionamento encontrado
                        </h3>
                        <p className="text-slate-400 mb-6">
                            {searchTerm 
                                ? "Tente ajustar sua busca ou limpar os filtros"
                                : "Comece cadastrando seu primeiro estacionamento"
                            }
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => navigate("/parking/register")}
                                className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                            >
                                <Plus size={18} />
                                Novo Estacionamento
                            </button>
                        )}
                    </div>
                )}

                {/* Parking Cards */}
                <div className="grid gap-4">
                    {!isLoading && filteredParkings.map((parking) => (
                        <div
                            key={parking.id}
                            className="group bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]"
                        >
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {parking.parkingName}
                                            </h3>
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <span className="text-sm">
                                                    Responsável: <span className="font-semibold">{parking.managerName}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/30">
                                                <MapPin className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium mb-0.5">
                                                    Endereço
                                                </p>
                                                <p className="font-semibold text-slate-200 text-sm">
                                                    {parking.address.street}, {parking.address.number}
                                                </p>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    {parking.address.district}, {parking.address.city}/{parking.address.state}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/30">
                                                <Phone className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium mb-0.5">
                                                    Contato
                                                </p>
                                                <p className="font-semibold text-slate-200 text-sm">
                                                    {parking.contacts.phone}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center shrink-0 border border-orange-500/30">
                                                <Clock className="w-5 h-5 text-orange-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium mb-0.5">
                                                    Horário
                                                </p>
                                                <p className="font-semibold text-slate-200 text-sm">
                                                    {parking.contacts.openingHours?.start} - {parking.contacts.openingHours?.end}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/30">
                                                <DollarSign className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium mb-0.5">
                                                    Preço/Hora
                                                </p>
                                                <p className="font-bold text-emerald-400 text-lg">
                                                    R$ {parking.prices.priceHour.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chips */}
                                    <div className="flex flex-wrap gap-2">
                                        <span className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-500/20 text-slate-300 border border-slate-500/30">
                                            <Car size={14} />
                                            {parking.operations.totalSpots} vagas totais
                                        </span>

                                        <span className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                            <Car size={14} />
                                            {parking.operations.carSpots} carros
                                        </span>

                                        <span className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                            <Bike size={14} />
                                            {parking.operations.motoSpots} motos
                                        </span>

                                        {parking.operations.hasCameras && (
                                            <span className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                                <Camera size={14} />
                                                Câmeras
                                            </span>
                                        )}

                                        {parking.operations.hasWashing && (
                                            <span className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                                <Droplets size={14} />
                                                Lavagem
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Right side - Actions */}
                                <div className="flex lg:flex-col items-center justify-center gap-3 lg:min-w-[180px]">
                                    <button
                                        onClick={() => navigate(`/parking/edit/${parking.id}`)}
                                        className="
                                            group/btn
                                            flex items-center justify-center gap-2
                                            w-full
                                            px-6 py-4
                                            bg-linear-to-r from-blue-600 to-blue-600
                                            text-white font-semibold
                                            rounded-xl
                                            transition-all duration-300
                                            hover:from-blue-700 hover:to-blue-700
                                            hover:shadow-xl hover:shadow-blue-500/30
                                            hover:scale-105
                                            active:scale-95
                                        "
                                    >
                                        <Edit size={18} className="group-hover/btn:rotate-12 transition-transform" />
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => openDeleteModal(parking.id, parking.parkingName)}
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
                    ))}
                </div>

                {/* Pagination */}
                {total >= 1 && (
                    <Pagination
                        page={page}
                        total={total}
                        limit={limit}
                        label="Estacionamentos"
                        onPageChange={setPage}
                    />
                )}

            </div>

            <ConfirmDeleteModal
                isOpen={deleteModal.isOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                itemName={deleteModal.parkingName}
                isLoading={isDeleting}
            />
        </div>
    )
}

export default ParkingList
