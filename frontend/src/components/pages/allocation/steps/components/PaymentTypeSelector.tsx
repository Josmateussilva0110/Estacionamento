import {
  DollarSign,
  Clock,
  Calendar,
  CalendarDays,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

export type PaymentType = "hour" | "day" | "month"

interface PaymentTypeSelectorProps {
  paymentType: PaymentType
  setPaymentType: (type: PaymentType) => void
  className?: string
}

function PaymentTypeSelector({
  paymentType,
  setPaymentType,
  className = ""
}: PaymentTypeSelectorProps) {
  const getPaymentInfo = (type: PaymentType): string => {
    switch (type) {
      case "hour":
        return "A cobrança será calculada por hora de permanência no estacionamento."
      case "day":
        return "Valor fixo por dia, independente do horário de entrada ou saída."
      case "month":
        return "Mensalidade com acesso irrestrito durante todo o mês."
      default:
        return ""
    }
  }

  return (
    <div className={`bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50 p-4 sm:p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 border border-purple-400/30">
          <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Tipo de Pagamento
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Escolha o período de cobrança
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Hourly */}
        <button
          type="button"
          onClick={() => setPaymentType("hour")}
          className={`group relative overflow-hidden p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all ${
            paymentType === "hour"
              ? "bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20"
              : "bg-slate-700/30 border-slate-600/50 hover:border-slate-500 hover:shadow-md hover:bg-slate-700/50"
          }`}
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
              paymentType === "hour"
                ? "bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 border border-blue-400/30"
                : "bg-slate-600/50 group-hover:bg-slate-600/70 border border-slate-500/30"
            }`}>
              <Clock className={`w-6 h-6 sm:w-7 sm:h-7 ${
                paymentType === "hour" ? "text-white" : "text-slate-300"
              }`} />
            </div>
            <div className="text-center">
              <p className={`font-bold text-base sm:text-lg ${
                paymentType === "hour" ? "text-blue-300" : "text-slate-200"
              }`}>
                Por Hora
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Cobrança horária
              </p>
            </div>
            {paymentType === "hour" && (
              <div className="absolute top-2 right-2">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
              </div>
            )}
          </div>
        </button>

        {/* Daily */}
        <button
          type="button"
          onClick={() => setPaymentType("day")}
          className={`group relative overflow-hidden p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all ${
            paymentType === "day"
              ? "bg-emerald-500/20 border-emerald-400 shadow-lg shadow-emerald-500/20"
              : "bg-slate-700/30 border-slate-600/50 hover:border-slate-500 hover:shadow-md hover:bg-slate-700/50"
          }`}
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
              paymentType === "day"
                ? "bg-linear-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 border border-emerald-400/30"
                : "bg-slate-600/50 group-hover:bg-slate-600/70 border border-slate-500/30"
            }`}>
              <Calendar className={`w-6 h-6 sm:w-7 sm:h-7 ${
                paymentType === "day" ? "text-white" : "text-slate-300"
              }`} />
            </div>
            <div className="text-center">
              <p className={`font-bold text-base sm:text-lg ${
                paymentType === "day" ? "text-emerald-300" : "text-slate-200"
              }`}>
                Por Dia
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Diária completa
              </p>
            </div>
            {paymentType === "day" && (
              <div className="absolute top-2 right-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            )}
          </div>
        </button>

        {/* Monthly */}
        <button
          type="button"
          onClick={() => setPaymentType("month")}
          className={`group relative overflow-hidden p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all ${
            paymentType === "month"
              ? "bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/20"
              : "bg-slate-700/30 border-slate-600/50 hover:border-slate-500 hover:shadow-md hover:bg-slate-700/50"
          }`}
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
              paymentType === "month"
                ? "bg-linear-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30 border border-purple-400/30"
                : "bg-slate-600/50 group-hover:bg-slate-600/70 border border-slate-500/30"
            }`}>
              <CalendarDays className={`w-6 h-6 sm:w-7 sm:h-7 ${
                paymentType === "month" ? "text-white" : "text-slate-300"
              }`} />
            </div>
            <div className="text-center">
              <p className={`font-bold text-base sm:text-lg ${
                paymentType === "month" ? "text-purple-300" : "text-slate-200"
              }`}>
                Por Mês
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Mensalidade
              </p>
            </div>
            {paymentType === "month" && (
              <div className="absolute top-2 right-2">
                <CheckCircle2 className="w-5 h-5 text-purple-400" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Info Banner */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-2 sm:gap-3">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-blue-300 font-medium">
              {getPaymentInfo(paymentType)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentTypeSelector
