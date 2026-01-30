export interface ApiPayload<T = undefined> {
  status: boolean          
  message: string
  user?: T                
}