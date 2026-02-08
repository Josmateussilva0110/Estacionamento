export type PaymentType = "hour" | "day" | "month"

export interface PaymentInfo {
  type: PaymentType
  label: string
  description: string
  info: string
}

export const paymentOptions: PaymentInfo[] = [
  {
    type: "hour",
    label: "Por Hora",
    description: "Cobrança horária",
    info: "A cobrança será calculada por hora de permanência no estacionamento."
  },
  {
    type: "day",
    label: "Por Dia",
    description: "Diária completa",
    info: "Valor fixo por dia, independente do horário de entrada ou saída."
  },
  {
    type: "month",
    label: "Por Mês",
    description: "Mensalidade",
    info: "Mensalidade com acesso irrestrito durante todo o mês."
  }
]
