export interface ApiResponse<T = any> {
    success: boolean
    status: number
    data?: T
    message?: string
}

export interface ApiPayload<T = undefined> {
  status: boolean          
  message: string
  user?: T                
}