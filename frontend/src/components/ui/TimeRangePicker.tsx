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

  const [position, setPosition] = useState({ top: 0, left: 0 })

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
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()

    const panelHeight = 340
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

    setPosition({ top, left })
  }

  useEffect(() => {
    if (!buttonRef.current) return

    const handleUpdate = () => updatePosition()

    window.addEventListener("resize", handleUpdate)
    window.addEventListener("scroll", handleUpdate, true)

    return () => {
      window.removeEventListener("resize", handleUpdate)
      window.removeEventListener("scroll", handleUpdate, true)
    }
  }, [])

  const hasValue = value?.start && value?.end

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-slate-300 mb-1.5">
          {label}
        </label>
      )}

      <Popover>
        {({ open, close }) => (
          <>
            <Popover.Button
              ref={buttonRef}
              onClick={() => requestAnimationFrame(updatePosition)}
              className={`
                w-full flex items-center justify-between gap-2
                rounded-xl border px-4 py-3
                bg-slate-700/50 backdrop-blur-sm
                hover:bg-slate-700/80 hover:border-blue-500/50
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                transition-all duration-200 cursor-pointer
                ${
                  error
                    ? "border-red-500/50 focus:ring-red-500/50"
                    : open
                    ? "border-blue-500/50 ring-2 ring-blue-500/20"
                    : "border-slate-600/50"
                }
              `}
            >
              <span
                className={`text-sm flex-1 text-left ${
                  hasValue ? "text-white font-medium" : "text-slate-400"
                }`}
              >
                {hasValue
                  ? `${value?.start} — ${value?.end}`
                  : "Selecione o horário"}
              </span>

              <Clock
                className={`w-4 h-4 shrink-0 transition-colors ${
                  hasValue ? "text-blue-400" : "text-slate-500"
                }`}
              />
            </Popover.Button>

            {open &&
              createPortal(
                <>
                  {/* backdrop */}
                  <div
                    className="fixed inset-0"
                    style={{ zIndex: 9998 }}
                    onClick={close}
                  />

                  {/* panel */}
                  <div
                    ref={panelRef}
                    className="fixed w-80 rounded-2xl border border-slate-700/50 bg-slate-800/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-5 animate-in fade-in zoom-in-95 duration-200"
                    style={{
                      zIndex: 9999,
                      top: `${position.top}px`,
                      left: `${position.left}px`,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* header */}
                    <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-700/60">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                        <Clock className="w-3.5 h-3.5 text-blue-300" />
                      </div>

                      <h3 className="text-sm font-semibold text-white">
                        Intervalo de horário
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {/* start */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Play className="w-3 h-3 text-blue-400" />
                          Início
                        </label>

                        <input
                          type="time"
                          value={temp.start}
                          onChange={(e) =>
                            setTemp((prev) => ({
                              ...prev,
                              start: e.target.value,
                            }))
                          }
                          className="
                            w-full border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm
                            text-white bg-slate-700/50
                            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                            hover:border-slate-500/70
                            transition-all duration-200
                            scheme-dark
                          "
                        />
                      </div>

                      {/* divider */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-700/60" />
                        <div className="w-6 h-6 rounded-full bg-slate-700/80 border border-slate-600/40 flex items-center justify-center">
                          <Clock className="w-3 h-3 text-slate-500" />
                        </div>
                        <div className="flex-1 h-px bg-slate-700/60" />
                      </div>

                      {/* end */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Square className="w-3 h-3 text-blue-400" />
                          Fim
                        </label>

                        <input
                          type="time"
                          value={temp.end}
                          onChange={(e) =>
                            setTemp((prev) => ({
                              ...prev,
                              end: e.target.value,
                            }))
                          }
                          className="
                            w-full border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm
                            text-white bg-slate-700/50
                            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                            hover:border-slate-500/70
                            transition-all duration-200
                            scheme-dark
                          "
                        />
                      </div>

                      {/* apply */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()

                          onChange?.(temp)

                          close()
                        }}
                        className="
                          w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                          text-white font-semibold py-2.5 px-4 rounded-xl
                          focus:outline-none focus:ring-2 focus:ring-blue-500/50
                          transition-all duration-200 active:scale-95
                          shadow-lg shadow-blue-500/20
                          text-sm
                        "
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                </>,
                document.body
              )}
          </>
        )}
      </Popover>

      {error && (
        <span className="mt-1.5 text-xs text-red-400">
          {error}
        </span>
      )}
    </div>
  )
}
