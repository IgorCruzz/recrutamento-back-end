export interface IUserModel {
  id: number
  email: string
  password_hash: string
}

export interface ICreateUser {
  (email: string): Promise<IUserModel>
}
