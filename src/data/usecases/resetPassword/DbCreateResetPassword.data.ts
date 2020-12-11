import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import {
  ICreateResetPassword,
  ICreateResetPasswordResult,
} from '@/domain/usecases/resetPassword/CreatePassword.domain'

export class DbCreateResetPassword implements ICreateResetPassword {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository
  ) {}

  async createResetPassword(
    email: string
  ): Promise<ICreateResetPasswordResult> {
    const findUser = await this.findUserByEmailRepository.findMail(email)

    return await null
  }
}
