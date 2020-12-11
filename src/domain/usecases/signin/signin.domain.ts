export interface ISignInDTOResult {
  error?: string
  id?: number
  email?: string
  token?: string
}

export interface ISignInDTO {
  email: string
  password: string
}

export interface ISignIn {
  signIn(data: ISignInDTO): Promise<ISignInDTOResult>
}
