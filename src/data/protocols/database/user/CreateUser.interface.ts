export interface IUserModel {
  id: number
  email: string
  password_hash?: string | null
  created_at: Date
  updated_at: Date
}

export interface ICreateUser {
  create(email: string): Promise<IUserModel>
}
