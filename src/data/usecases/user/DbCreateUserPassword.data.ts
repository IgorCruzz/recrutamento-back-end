import { IFindByActivationCodeRepository } from '@/data/protocols/database/activation/findByActivationCode.interface'
import { IUpdateUserPasswordRepository } from '@/data/protocols/database/user/UpdateUserPassword.interface'
import {
  ICreateUserPassword,
  ICreateUserPasswordDTO,
  ICreateUserPasswordResult,
} from '@/domain/usecases/user/CreatePassword.domain'

export class DbCreateUserPassword implements ICreateUserPassword {
  constructor(
    private readonly findByActivationCodeRepository: IFindByActivationCodeRepository,
    private readonly updateUserPasswordRepository: IUpdateUserPasswordRepository
  ) {}

  async createPassword(
    data: ICreateUserPasswordDTO
  ): Promise<ICreateUserPasswordResult> {
    const { code, password, email } = data

    const findUserByCode = await this.findByActivationCodeRepository.findCode(
      code
    )

    if (!findUserByCode || findUserByCode.user.email !== email)
      return {
        error: 'Por favor, verifique se o seu código está correto.',
      }

    const updated = await this.updateUserPasswordRepository.updatePassword({
      id: findUserByCode.user_id,
      password: password,
    })

    return { updated }
  }
}
