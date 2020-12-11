import {
  ICreateResetPassword,
  ICreateResetPasswordResult,
} from '@/domain/usecases/resetPassword/CreatePassword.domain'
import {
  IUpdateResetPassword,
  IUpdateResetPasswordDTO,
  IUpdateResetPasswordResult,
} from '@/domain/usecases/resetPassword/UpdatePassword.domain'

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

export class DbUpdateResetPasswordStub implements IUpdateResetPassword {
  async updateResetPassword(
    data: IUpdateResetPasswordDTO
  ): Promise<IUpdateResetPasswordResult> {
    return Promise.resolve({ updated: true })
  }
}
