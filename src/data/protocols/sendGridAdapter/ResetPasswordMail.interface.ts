export interface IResetPasswordDTO {
  email: string
  token: string
}

export interface IResetPassword {
  resetPassword(data: IResetPasswordDTO): Promise<void>
}
