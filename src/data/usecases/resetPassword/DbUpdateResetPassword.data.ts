import { IFindByUserIdRepository } from '@/data/protocols/database/resetPassword/FindByUserId.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import {
  IUpdateResetPassword,
  IUpdateResetPasswordDTO,
  IUpdateResetPasswordResult,
} from '@/domain/usecases/resetPassword/UpdatePassword.domain'

export class DbUpdateResetPassword implements IUpdateResetPassword {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly findByUserIdRepository: IFindByUserIdRepository
  ) {}

  async updateResetPassword(
    data: IUpdateResetPasswordDTO
  ): Promise<IUpdateResetPasswordResult> {
    const { email } = data

    const findUser = await this.findUserByEmailRepository.findMail(email)

    if (!findUser) return { error: 'Não existe um usuário com este e-mail.' }

    await this.findByUserIdRepository.findUserId(findUser.id)

    return await null
  }
}
