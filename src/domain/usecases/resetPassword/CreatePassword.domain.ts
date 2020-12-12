export interface ICreateResetPasswordResult {
  error?: string
  resetToken?: string
}

export interface ICreateResetPassword {
  createResetPassword(email: string): Promise<ICreateResetPasswordResult>
}
