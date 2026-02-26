export interface ApiPayload<T = unknown> {
  success: boolean
  status: number
  message?: string
  data?: T
}
