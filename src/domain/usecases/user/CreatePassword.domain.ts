export interface ICreateUserPasswordResult {
  error?: string
  updated?: boolean
}

export interface ICreateUserPasswordDTO {
  password: string
  code: string
  email: string
}

export interface ICreateUserPassword {
  createPassword(
    data: ICreateUserPasswordDTO
  ): Promise<ICreateUserPasswordResult>
}
