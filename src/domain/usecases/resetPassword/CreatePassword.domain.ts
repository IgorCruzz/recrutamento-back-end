export interface ICreateResetPasswordResult {
  error?: string
  id?: number
  resetToken?: string
}

export interface ICreateResetPassword {
  createResetPassword(email: string): Promise<ICreateResetPasswordResult>
}
