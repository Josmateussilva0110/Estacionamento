import {
  Car,
  BarChart3,
  Users,
  DollarSign,
} from "lucide-react"

export const steps = [
    {
      step: "01",
      icon: Users,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-300",
      title: "Cadastre seus clientes e veículos",
      description: "Registre os dados do cliente, seus veículos, tipo de cobrança preferencial e informações de contato.",
    },
    {
      step: "02",
      icon: Car,
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-300",
      title: "Aloque a vaga em segundos",
      description: "Busque o cliente, escolha o tipo de veículo, a forma de pagamento e confirme a entrada em 3 cliques.",
    },
    {
      step: "03",
      icon: DollarSign,
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-300",
      title: "Encerre e receba automaticamente",
      description: "Ao registrar a saída, o sistema calcula o valor devido com base no tempo e tipo de cobrança.",
    },
    {
      step: "04",
      icon: BarChart3,
      iconBg: "bg-violet-500/20",
      iconColor: "text-violet-300",
      title: "Acompanhe o desempenho",
      description: "Visualize gráficos de ocupação, receita e fluxo em tempo real diretamente no dashboard.",
    },
  ]
