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
    <div className={`bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/60 p-4 sm:p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
          <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Tipo de Pagamento
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
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
              ? "bg-linear-to-br from-blue-50 to-indigo-50 border-blue-400 shadow-lg shadow-blue-500/20"
              : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md"
          }`}
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
              paymentType === "hour"
                ? "bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30"
                : "bg-slate-200 group-hover:bg-slate-300"
            }`}>
              <Clock className={`w-6 h-6 sm:w-7 sm:h-7 ${
                paymentType === "hour" ? "text-white" : "text-slate-600"
              }`} />
            </div>
            <div className="text-center">
              <p className={`font-bold text-base sm:text-lg ${
                paymentType === "hour" ? "text-blue-700" : "text-slate-700"
              }`}>
                Por Hora
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Cobrança horária
              </p>
            </div>
            {paymentType === "hour" && (
              <div className="absolute top-2 right-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
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
              ? "bg-linear-to-br from-emerald-50 to-green-50 border-emerald-400 shadow-lg shadow-emerald-500/20"
              : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md"
          }`}
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
              paymentType === "day"
                ? "bg-linear-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30"
                : "bg-slate-200 group-hover:bg-slate-300"
            }`}>
              <Calendar className={`w-6 h-6 sm:w-7 sm:h-7 ${
                paymentType === "day" ? "text-white" : "text-slate-600"
              }`} />
            </div>
            <div className="text-center">
              <p className={`font-bold text-base sm:text-lg ${
                paymentType === "day" ? "text-emerald-700" : "text-slate-700"
              }`}>
                Por Dia
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Diária completa
              </p>
            </div>
            {paymentType === "day" && (
              <div className="absolute top-2 right-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
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
              ? "bg-linear-to-br from-purple-50 to-pink-50 border-purple-400 shadow-lg shadow-purple-500/20"
              : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md"
          }`}
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
              paymentType === "month"
                ? "bg-linear-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30"
                : "bg-slate-200 group-hover:bg-slate-300"
            }`}>
              <CalendarDays className={`w-6 h-6 sm:w-7 sm:h-7 ${
                paymentType === "month" ? "text-white" : "text-slate-600"
              }`} />
            </div>
            <div className="text-center">
              <p className={`font-bold text-base sm:text-lg ${
                paymentType === "month" ? "text-purple-700" : "text-slate-700"
              }`}>
                Por Mês
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Mensalidade
              </p>
            </div>
            {paymentType === "month" && (
              <div className="absolute top-2 right-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Info Banner */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2 sm:gap-3">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-blue-800 font-medium">
              {getPaymentInfo(paymentType)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentTypeSelector
