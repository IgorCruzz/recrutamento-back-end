export interface IUserModel {
  id: number
  email: string
  password_hash?: string | null
  created_at: Date
  updated_at: Date
}
