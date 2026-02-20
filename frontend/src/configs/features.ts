import {
  BarChart3,
  Users,
  CreditCard,
  Shield,
  Search,
  Activity,
  Bell,
  Layers,
} from "lucide-react"

export interface Feature {
  icon: React.ElementType
  iconBg: string
  iconColor: string
  title: string
  description: string
}


export const features: Feature[] = [
  {
    icon: Activity,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-300",
    title: "Monitoramento em Tempo Real",
    description: "Acompanhe todas as alocações ativas, ocupação e movimentações no momento em que acontecem.",
  },
  {
    icon: BarChart3,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-300",
    title: "Dashboard Completo",
    description: "Visualize gráficos de ocupação, receita por tipo de cobrança e movimentação semanal em um único painel.",
  },
  {
    icon: Users,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-300",
    title: "Gestão de Clientes",
    description: "Cadastre e gerencie clientes com seus veículos, histórico de alocações e informações de contato.",
  },
  {
    icon: CreditCard,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-300",
    title: "Cobrança Flexível",
    description: "Suporte a tarifação por hora, dia ou mensalidade — com receita estimada calculada automaticamente.",
  },
  {
    icon: Search,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-300",
    title: "Busca e Filtros Avançados",
    description: "Encontre alocações, clientes e veículos rapidamente por placa, nome, tipo ou estacionamento.",
  },
  {
    icon: Bell,
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-300",
    title: "Alertas e Notificações",
    description: "Receba alertas de ocupação crítica, mensalistas vencendo e movimentações fora do horário.",
  },
  {
    icon: Shield,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-300",
    title: "Segurança e Controle",
    description: "Acesso por perfis de usuário, autenticação segura e histórico completo de todas as operações.",
  },
  {
    icon: Layers,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-300",
    title: "Multi-Estacionamento",
    description: "Gerencie múltiplos estacionamentos e pontos de cobrança em uma única conta.",
  },
]
