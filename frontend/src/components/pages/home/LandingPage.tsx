import { useState, useEffect, useRef } from "react"
import {
  Car,
  BarChart3,
  Users,
  CreditCard,
  Shield,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  ParkingCircle,
  Bike,
  Truck,
  DollarSign,
  Activity,
  Star,
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  RefreshCw,
  Search,
  Bell,
  Layers,
  Lock,
} from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────────────────
interface Feature {
  icon: React.ElementType
  iconBg: string
  iconColor: string
  title: string
  description: string
}

interface Stat {
  value: string
  label: string
  icon: React.ElementType
  color: string
}

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted: boolean
  badge?: string
}

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
}

// ── Hook: useInView ────────────────────────────────────────────────────────────
function useInView(options: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? "0px" }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return { ref, inView }
}

// ── Data ───────────────────────────────────────────────────────────────────────
const features: Feature[] = [
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

const stats: Stat[] = [
  { value: "200+", label: "Vagas gerenciadas", icon: ParkingCircle, color: "text-blue-300" },
  { value: "98%", label: "Uptime garantido", icon: Activity, color: "text-emerald-300" },
  { value: "3x", label: "Mais rápido que planilhas", icon: Zap, color: "text-orange-300" },
  { value: "24/7", label: "Suporte disponível", icon: Clock, color: "text-violet-300" },
]

const testimonials: Testimonial[] = [
  {
    name: "Ricardo Mendes",
    role: "Proprietário, Estacionamento Central",
    content: "Antes usávamos caderno e planilha. Com o ParkSys, economizamos 3 horas por dia e o controle de receita ficou muito mais preciso.",
    rating: 5,
  },
  {
    name: "Fernanda Costa",
    role: "Gestora, Park Express",
    content: "O dashboard em tempo real me dá tranquilidade para saber exatamente o que está acontecendo no estacionamento mesmo quando não estou lá.",
    rating: 5,
  },
  {
    name: "Marcos Oliveira",
    role: "Administrador, Parking Plaza",
    content: "A gestão de mensalistas ficou muito mais fácil. Hoje consigo ver quem está ocupando qual vaga e o valor acumulado na hora.",
    rating: 5,
  },
]

const plans: PricingPlan[] = [
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

// ── Components ─────────────────────────────────────────────────────────────────
function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 30) }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
            <ParkingCircle className="w-5 h-5 text-blue-300" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">ParkSys</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Recursos", "Como Funciona", "Planos", "Depoimentos"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm text-slate-300 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2">
            Entrar
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/30">
            Começar grátis
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-300">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-xl border-t border-slate-700/50 px-6 py-4 space-y-4">
          {["Recursos", "Como Funciona", "Planos", "Depoimentos"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="block text-slate-300 hover:text-white py-2 transition-colors">
              {item}
            </a>
          ))}
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl mt-2">
            Começar grátis
          </button>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-slate-900 to-indigo-900/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(to right, #94a3b8 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm text-blue-300 font-medium">Sistema 100% online · Sem instalação</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Gerencie seu<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            estacionamento
          </span>
          <br />com inteligência
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Controle alocações, clientes, veículos e receitas em tempo real.
          Diga adeus às planilhas e cadernos de papel.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-2xl shadow-blue-500/30 text-lg">
            Começar gratuitamente
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-xl text-white font-semibold px-8 py-4 rounded-xl transition-all border border-slate-600/50 hover:scale-105 text-lg">
            Ver demonstração
          </button>
        </div>

        {/* Mini stats */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: Car, label: "Carros, motos e caminhonetes" },
            { icon: DollarSign, label: "Cobrança automatizada" },
            { icon: BarChart3, label: "Relatórios em tempo real" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-slate-400">
              <Icon className="w-4 h-4 text-blue-400" />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs">Rolar para baixo</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-20 bg-slate-900 border-y border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600/30">
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
              </div>
              <p className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</p>
              <p className="text-sm text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const { ref, inView } = useInView()
  return (
    <section id="recursos" ref={ref} className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
            <Zap className="w-4 h-4 text-blue-300" />
            <span className="text-sm text-blue-300 font-medium">Recursos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Tudo que você precisa<br />em um só lugar
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Do cadastro de clientes ao fechamento do caixa, o ParkSys cobre todas as etapas da operação.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center border border-white/10 mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const { ref, inView } = useInView()
  const steps = [
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

  return (
    <section id="como-funciona" ref={ref} className="py-24 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-4">
            <RefreshCw className="w-4 h-4 text-emerald-300" />
            <span className="text-sm text-emerald-300 font-medium">Como Funciona</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Simples do início ao fim
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Em menos de 5 minutos você já consegue registrar sua primeira alocação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-slate-600/50 z-10" />
              )}

              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${s.iconBg} rounded-xl flex items-center justify-center border border-white/10`}>
                  <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>
                <span className="text-3xl font-black text-slate-700">{s.step}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VehicleTypesSection() {
  const { ref, inView } = useInView()
  const types = [
    { icon: Car, label: "Carros", badge: "bg-blue-500/20 text-blue-300 border-blue-500/30", desc: "Veículos de passeio de todos os portes" },
    { icon: Bike, label: "Motos", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", desc: "Motocicletas e scooters" },
    { icon: Truck, label: "Caminhonetes", badge: "bg-orange-500/20 text-orange-300 border-orange-500/30", desc: "Picapes e utilitários" },
    { icon: Users, label: "PCD", badge: "bg-violet-500/20 text-violet-300 border-violet-500/30", desc: "Vagas especiais para PCD" },
  ]

  return (
    <section ref={ref} className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
              <Car className="w-4 h-4 text-orange-300" />
              <span className="text-sm text-orange-300 font-medium">Multi-veículo</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Suporte a todos os<br />tipos de veículo
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              O ParkSys identifica e classifica automaticamente cada tipo de veículo, 
              aplicando a tarifa correta e controlando vagas especiais como PCD e idosos.
            </p>
            <ul className="space-y-3">
              {["Tarifas diferenciadas por categoria", "Controle de vagas especiais (PCD, Idoso)", "Histórico por tipo de veículo", "Relatórios de ocupação segmentados"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            {types.map((t) => (
              <div key={t.label} className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-500/50 hover:scale-[1.02] transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${t.badge}`}>
                    <t.icon className="w-3.5 h-3.5" />
                    {t.label}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function BillingSection() {
  const { ref, inView } = useInView()
  const types = [
    {
      type: "Por Hora",
      color: "#ef4444",
      textColor: "text-red-300",
      bg: "bg-red-500/20 border-red-500/30",
      desc: "Ideal para rotativo. Cobrança calculada automaticamente com base no tempo de permanência.",
    },
    {
      type: "Por Dia",
      color: "#3b82f6",
      textColor: "text-blue-300",
      bg: "bg-blue-500/20 border-blue-500/30",
      desc: "Para clientes que ficam o dia inteiro. Tarifa fixa diária sem surpresas na saída.",
    },
    {
      type: "Mensalista",
      color: "#10b981",
      textColor: "text-emerald-300",
      bg: "bg-emerald-500/20 border-emerald-500/30",
      desc: "Controle completo de mensalistas com histórico e gestão de renovações.",
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 mb-4">
            <CreditCard className="w-4 h-4 text-violet-300" />
            <span className="text-sm text-violet-300 font-medium">Cobrança Flexível</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Três modalidades,<br />zero complicação
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Configure tarifas diferentes para cada tipo de cliente e deixe o sistema calcular tudo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {types.map((t, i) => (
            <div
              key={t.type}
              className={`bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 transition-all duration-700 hover:scale-[1.02] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ borderLeft: `3px solid ${t.color}`, transitionDelay: `${i * 100}ms` }}
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold border ${t.bg} ${t.textColor} mb-4`}>
                <DollarSign className="w-4 h-4" />
                {t.type}
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">{t.desc}</p>
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <p className={`text-xs font-semibold ${t.textColor} flex items-center gap-1`}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  Receita calculada automaticamente
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const { ref, inView } = useInView()
  return (
    <section id="depoimentos" ref={ref} className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-4">
            <Star className="w-4 h-4 text-orange-300" />
            <span className="text-sm text-orange-300 font-medium">Depoimentos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Quem usa, aprova
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Veja o que nossos clientes dizem depois de adotar o ParkSys.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-orange-400 fill-orange-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.content}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                  <Users className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const { ref, inView } = useInView()
  return (
    <section id="planos" ref={ref} className="py-24 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
            <Lock className="w-4 h-4 text-blue-300" />
            <span className="text-sm text-blue-300 font-medium">Planos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Planos para todos<br />os tamanhos
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Comece gratuitamente por 14 dias. Sem cartão de crédito.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-700 ${p.highlighted
                ? "bg-gradient-to-b from-blue-600/20 to-slate-800/80 border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-[1.02]"
                : "bg-slate-800/80 backdrop-blur-xl border-slate-700/50"
              } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                    {p.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{p.description}</p>
                <div className="flex items-end gap-1">
                  <span className={`text-4xl font-black ${p.highlighted ? "text-blue-300" : "text-white"}`}>{p.price}</span>
                  {p.period && <span className="text-slate-400 mb-1">{p.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.highlighted ? "text-blue-400" : "text-emerald-400"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-semibold transition-all hover:scale-105 ${p.highlighted
                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30"
                : "bg-slate-700/50 hover:bg-slate-700/80 text-white border border-slate-600/50"
              }`}>
                {p.name === "Enterprise" ? "Falar com vendas" : "Começar agora"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div
          className={`relative overflow-hidden bg-slate-800/80 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50 transition-all duration-700 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-800/80 to-indigo-600/20" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-400/30 mx-auto mb-6">
              <ParkingCircle className="w-8 h-8 text-blue-300" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Pronto para transformar<br />seu estacionamento?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
              Junte-se a centenas de gestores que já saíram das planilhas e ganharam controle total da operação.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-2xl shadow-blue-500/30 text-lg">
                Começar grátis por 14 dias
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-4">Sem cartão de crédito · Cancele quando quiser</p>
          </div>
        </div>
      </div>
    </section>
  )
}


// ── Main ───────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <NavBar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <VehicleTypesSection />
      <BillingSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
    </div>
  )
}