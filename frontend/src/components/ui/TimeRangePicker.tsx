import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { Popover } from "@headlessui/react"
import { Clock, Play, Square } from "lucide-react"

interface TimeRange {
  start: string
  end: string
}

interface TimeRangePickerProps {
  value?: TimeRange
  onChange?: (value: TimeRange) => void
  label?: string
  error?: string
}

export function TimeRangePicker({ value, onChange, label, error }: TimeRangePickerProps) {
  const [temp, setTemp] = useState<TimeRange>({
    start: value?.start ?? "",
    end: value?.end ?? "",
  })
  const [position, setPosition] = useState<{ top: number; left: number; placement: "top" | "bottom" }>({ top: 0, left: 0, placement: "bottom" })
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      setTemp({
        start: value.start ?? "",
        end: value.end ?? "",
      })
    }
  }, [value])

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const panelHeight = 320
      const panelWidth = 320
      const spacing = 8
      
      let left = rect.left
      let top = rect.top - panelHeight - spacing
      
      if (left + panelWidth > window.innerWidth) {
        left = window.innerWidth - panelWidth - 16
      }
      if (left < 16) {
        left = 16
      }
      if (top < spacing) {
        top = spacing
      }
      
      setPosition({ top, left, placement: "top" })
    }
  }

  useEffect(() => {
    if (isOpen) {
      updatePosition()
      const handleResize = () => updatePosition()
      const handleScroll = () => updatePosition()
      
      window.addEventListener("resize", handleResize)
      window.addEventListener("scroll", handleScroll, true)
      
      return () => {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("scroll", handleScroll, true)
      }
    }
  }, [isOpen])

  const applySelection = () => {
    onChange?.(temp)
  }

  const hasValue = value?.start && value?.end

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      <Popover>
        {({ open, close }) => {
          if (open !== isOpen) {
            setIsOpen(open)
            if (open) {
              requestAnimationFrame(() => {
                updatePosition()
              })
            }
          }

          return (
            <>
              {/* 👇 AQUI está igual ao Input */}
              <Popover.Button
                ref={buttonRef}
                className={`w-full flex items-center justify-between gap-2
                  rounded-lg border px-3 py-3 bg-gray-50
                  shadow-sm hover:border-blue-400 hover:shadow-md
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition-all duration-200 cursor-pointer
                  ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}
                `}
              >
                <span
                  className={`text-sm flex-1 text-left ${
                    hasValue ? "text-gray-900 font-medium" : "text-gray-500"
                  }`}
                >
                  {hasValue ? `${value.start} — ${value.end}` : "Selecione o horário"}
                </span>

                <Clock
                  className={`w-4 h-4 shrink-0 ${
                    hasValue ? "text-blue-600" : "text-gray-400"
                  }`}
                />
              </Popover.Button>

              {open && createPortal(
                <>
                  <div
                    className="fixed inset-0"
                    style={{ zIndex: 9998 }}
                    onClick={close}
                  />

                  <div
                    ref={panelRef}
                    className="fixed w-80 rounded-xl border border-gray-200 bg-white shadow-xl p-5 animate-in fade-in zoom-in-95 duration-200"
                    style={{
                      zIndex: 9999,
                      top: `${position.top}px`,
                      left: `${position.left}px`
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-5">
                      <div className="pb-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Selecione o intervalo de horário
                        </h3>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                          <Play className="w-3.5 h-3.5 text-blue-600" />
                          Início
                        </label>
                        <input
                          type="time"
                          value={temp.start}
                          onChange={(e) =>
                            setTemp((prev) => ({ ...prev, start: e.target.value }))
                          }
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-gray-50 
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white 
                                     transition-all duration-200 hover:border-gray-400"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div className="flex-1 h-px bg-gray-200"></div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                          <Square className="w-3.5 h-3.5 text-blue-600" />
                          Fim
                        </label>
                        <input
                          type="time"
                          value={temp.end}
                          onChange={(e) =>
                            setTemp((prev) => ({ ...prev, end: e.target.value }))
                          }
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-gray-50 
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white 
                                     transition-all duration-200 hover:border-gray-400"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          applySelection()
                          close()
                        }}
                        className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 
                                   active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                   focus:ring-offset-2 transition-all duration-200 font-medium text-sm 
                                   shadow-sm hover:shadow-md"
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                </>,
                document.body
              )}
            </>
          )
        }}
      </Popover>

      {error && (
        <span className="mt-1.5 text-xs text-red-600">{error}</span>
      )}
    </div>
  )
}
