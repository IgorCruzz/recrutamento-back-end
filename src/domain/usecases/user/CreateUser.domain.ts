export interface ICreateUserResult {
  id?: number
  email?: string
  error?: string
}

export interface ICreateUser {
  createUser(email: string): Promise<ICreateUserResult>
}
