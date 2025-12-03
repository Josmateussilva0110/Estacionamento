import Model from "./Model"

export interface UserData {
  id?: number
  username: string
  email: string
  password: string
  created_at?: string 
  updated_at?: string
}

class User extends Model<UserData> {
  constructor() {
    super("users")
  }
}

export default new User()
