import {
  ICreateResetPassword,
  ICreateResetPasswordResult,
} from '@/domain/usecases/resetPassword/CreatePassword.domain'

export class DbCreateResetPasswordStub implements ICreateResetPassword {
  async createResetPassword(
    email: string
  ): Promise<ICreateResetPasswordResult> {
    return Promise.resolve({
      id: 1,
      resetToken: 'token',
    })
  }
}
