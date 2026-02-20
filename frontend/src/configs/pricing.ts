export interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted: boolean
  badge?: string
}

export const plans: PricingPlan[] = [
  {
    name: "Básico",
    price: "R$ 89",
    period: "/mês",
    description: "Ideal para estacionamentos de pequeno porte",
    features: [
      "Até 50 vagas",
      "1 usuário operador",
      "Relatórios básicos",
      "Suporte por e-mail",
      "Cobrança por hora e dia",
    ],
    highlighted: false,
  },
  {
    name: "Profissional",
    price: "R$ 189",
    period: "/mês",
    description: "Para quem precisa de controle total",
    badge: "Mais popular",
    features: [
      "Até 200 vagas",
      "5 usuários operadores",
      "Dashboard completo",
      "Gestão de mensalistas",
      "Suporte prioritário",
      "Relatórios avançados",
      "Multi-estacionamento",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    period: "",
    description: "Soluções customizadas para redes",
    features: [
      "Vagas ilimitadas",
      "Usuários ilimitados",
      "API dedicada",
      "Suporte 24/7",
      "Onboarding presencial",
      "SLA personalizado",
    ],
    highlighted: false,
  },
]