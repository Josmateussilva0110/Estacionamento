import { useCallback } from "react"
import bus from "../utils/bus"
import type { AppEvents } from "../utils/bus"

type FlashPayload = Parameters<AppEvents["flash"]>[0]

export default function useFlashMessage() {
  const setFlashMessage = useCallback(
    (message: string, type: "success" | "error" | "warning") => {
      const payload: FlashPayload = { message, type }
      bus.emit("flash", payload)
    },
    []
  )

  return { setFlashMessage }
}
