export interface ServiceResult<T = void> {
  status: boolean
  data?: T
  error?: {
    code: string
    message?: string
  }
}
