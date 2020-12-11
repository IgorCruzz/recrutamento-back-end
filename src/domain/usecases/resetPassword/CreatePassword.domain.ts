export interface ICreateResetPasswordResult {
  error?: string
  id?: string
  resetToken?: string
}

export interface ICreateResetPassword {
  createResetPassword(email: string): Promise<ICreateResetPasswordResult>
}
