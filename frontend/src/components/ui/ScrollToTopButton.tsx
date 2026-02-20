import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const pageHeight = document.body.scrollHeight - window.innerHeight

      // Aparece quando passar de 60% da página
      if (scrollPosition > pageHeight * 0.6) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 
                 bg-blue-500 hover:bg-blue-700
                 text-white p-3 rounded-full
                 shadow-lg transition-all duration-300
                 hover:scale-110"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
