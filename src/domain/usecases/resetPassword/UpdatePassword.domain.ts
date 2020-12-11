export interface IUpdateResetPasswordResult {
  error?: string
  updated?: boolean
}

export interface IUpdateResetPasswordDTO {
  email: string
  password: string
  token: string
}

export interface IUpdateResetPassword {
  updateResetPassword(
    data: IUpdateResetPasswordDTO
  ): Promise<IUpdateResetPasswordResult>
}
