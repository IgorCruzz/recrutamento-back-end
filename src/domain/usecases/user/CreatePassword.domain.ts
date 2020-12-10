export interface ICreateUserPasswordResult {
  error?: string
  updated?: boolean
}

export interface ICreateUserPasswordDTO {
  password: string
  code: string
}

export interface ICreateUserPassword {
  createPassword(
    data: ICreateUserPasswordDTO
  ): Promise<ICreateUserPasswordResult>
}
