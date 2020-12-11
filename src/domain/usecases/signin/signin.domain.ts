export interface ISignInDTOResult {
  error?: string
  id?: number
  email?: number
  token?: string
}

export interface ISignInDTO {
  email: string
  password: string
}

export interface ISignIn {
  signIn(data: ISignInDTO): Promise<ISignInDTOResult>
}
