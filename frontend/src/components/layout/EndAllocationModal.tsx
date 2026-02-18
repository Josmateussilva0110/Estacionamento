// components/layout/EndAllocationModal.tsx
import { X, LogOut, Clock, DollarSign, CreditCard, User, MapPin } from "lucide-react"
import { formatMinutesToDaysHHMM, formatPhone } from "../../utils/formations"
import { formatPayment } from "../../utils/formations"
import { type AllocationDetail } from "../../types/allocation/allocationDetail"

interface EndAllocationModalProps {
    isOpen: boolean
    allocation: AllocationDetail | null
    isLoading: boolean
    onClose: () => void
    onConfirm: () => void
}

function EndAllocationModal({ isOpen, allocation, isLoading, onClose, onConfirm }: EndAllocationModalProps) {
    if (!isOpen || !allocation) return null

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal — bottom sheet no mobile, centered no desktop */}
           <div className="relative w-full sm:max-w-lg bg-slate-800 border border-slate-700/50 rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[90vh]">
             
                {/* Header */}
                <div className="bg-red-500/10 border-b border-red-500/20 px-5 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/30 shrink-0">
                            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-white leading-tight">Encerrar Alocação</h2>
                            <p className="text-xs sm:text-sm text-slate-400">Confirme os dados antes de finalizar</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all shrink-0"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 space-y-3">

                    {/* Cliente + Placa */}
                    <div className="flex items-center gap-3 bg-slate-700/40 rounded-xl p-4 border border-slate-600/30">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30 shrink-0">
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-slate-400 font-medium">Cliente</p>
                            <p className="text-white font-bold truncate">{allocation.clientName}</p>
                            <p className="text-slate-300 text-sm font-mono truncate">
                                {allocation.plate} · {allocation.brand}
                            </p>
                        </div>
                    </div>

                    {/* Grid de infos — 1 coluna no mobile, 2 no sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <div className="bg-slate-700/40 rounded-xl p-3 sm:p-4 border border-slate-600/30 flex items-center gap-3 sm:block">
                            <div className="flex items-center gap-2 sm:mb-2 shrink-0">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <p className="text-xs text-slate-400 font-medium">Estacionamento</p>
                            </div>
                            <p className="text-white font-semibold text-sm truncate">{allocation.parkingName}</p>
                        </div>

                        <div className="bg-slate-700/40 rounded-xl p-3 sm:p-4 border border-slate-600/30 flex items-center gap-3 sm:block">
                            <div className="flex items-center gap-2 sm:mb-2 shrink-0">
                                <Clock className="w-4 h-4 text-orange-400" />
                                <p className="text-xs text-slate-400 font-medium">Tempo decorrido</p>
                            </div>
                            <p className="text-orange-400 font-bold">{formatMinutesToDaysHHMM(allocation.currentDuration)}</p>
                        </div>

                        <div className="bg-slate-700/40 rounded-xl p-3 sm:p-4 border border-slate-600/30 flex items-center gap-3 sm:block">
                            <div className="flex items-center gap-2 sm:mb-2 shrink-0">
                                <CreditCard className="w-4 h-4 text-purple-400" />
                                <p className="text-xs text-slate-400 font-medium">Tipo de cobrança</p>
                            </div>
                            <p className="text-slate-200 font-semibold text-sm">{formatPayment(allocation.paymentType)}</p>
                        </div>

                        <div className="bg-slate-700/40 rounded-xl p-3 sm:p-4 border border-slate-600/30 flex items-center gap-3 sm:block">
                            <div className="flex items-center gap-2 sm:mb-2 shrink-0">
                                <User className="w-4 h-4 text-slate-400" />
                                <p className="text-xs text-slate-400 font-medium">Contato</p>
                            </div>
                            <p className="text-slate-200 font-semibold text-sm">{formatPhone(allocation.phone)}</p>
                        </div>
                    </div>

                    {/* Valor final */}
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30 shrink-0">
                                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium">Valor a cobrar</p>
                                <p className="text-xs text-slate-500">Calculado até agora</p>
                            </div>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-emerald-400 shrink-0">
                            R$ {allocation.estimatedCost.toFixed(2)}
                        </p>
                    </div>

                    {/* Observações */}
                    {allocation.observations && (
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                            <p className="text-xs text-blue-300 font-semibold mb-1 uppercase tracking-wide">Observações</p>
                            <p className="text-sm text-slate-300">{allocation.observations}</p>
                        </div>
                    )}

                    {/* Espaço extra para não colar no footer */}
                    <div className="h-1" />
                </div>

                {/* Footer — fixo na base */}
                <div className="px-4 sm:px-6 py-4 border-t border-slate-700/50 flex gap-3 shrink-0 bg-slate-800">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 py-3.5 sm:py-3 rounded-xl font-semibold text-slate-200 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 transition-all disabled:opacity-50 text-sm sm:text-base"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-3 rounded-xl font-semibold text-white bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30 transition-all active:scale-95 disabled:opacity-50 text-sm sm:text-base"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <LogOut size={18} />
                                Confirmar Encerramento
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EndAllocationModal
