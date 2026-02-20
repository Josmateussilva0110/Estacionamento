
export interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: "Ricardo Mendes",
    role: "Proprietário, Estacionamento Central",
    content: "Antes usávamos caderno e planilha. Com o Estacionamento, economizamos 3 horas por dia e o controle de receita ficou muito mais preciso.",
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
