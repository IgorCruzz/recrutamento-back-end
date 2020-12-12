import { ICreateResetPasswordRepository } from '@/data/protocols/database/resetPassword/CreateUser.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { IResetPassword } from '@/data/protocols/sendGridAdapter/ResetPasswordMail.interface'
import {
  ICreateResetPassword,
  ICreateResetPasswordResult,
} from '@/domain/usecases/resetPassword/CreatePassword.domain'

export class DbCreateResetPassword implements ICreateResetPassword {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly createResetPasswordRepository: ICreateResetPasswordRepository,
    private readonly resetPassword: IResetPassword
  ) {}

  async createResetPassword(
    email: string
  ): Promise<ICreateResetPasswordResult> {
    const findUser = await this.findUserByEmailRepository.findMail(email)

    if (!findUser) return { error: 'Não existe um usuário com este e-mail.' }

    const reset = await this.createResetPasswordRepository.createResetPassword(
      findUser.id
    )

    await this.resetPassword.resetPassword({
      email: findUser.email,
      token: reset.reset_token,
    })

    return {
      resetToken: reset.reset_token,
    }
  }
}
