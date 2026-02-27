import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

const SCROLL_THRESHOLD = 800

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const updateVisibility = () => {
      const shouldBeVisible = window.scrollY > SCROLL_THRESHOLD
      setIsVisible(prev => (prev !== shouldBeVisible ? shouldBeVisible : prev))
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility)
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        bg-blue-500 hover:bg-blue-700
        text-white p-3 rounded-full
        shadow-lg transition-all duration-300
        ${isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
