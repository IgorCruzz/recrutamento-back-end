import { IFindByActivationCodeRepository } from '@/data/protocols/database/activation/findByActivationCode.interface'
import {
  ICreateUserPassword,
  ICreateUserPasswordDTO,
  ICreateUserPasswordResult,
} from '@/domain/usecases/user/CreatePassword.domain'

export class DbCreateUserPassword implements ICreateUserPassword {
  constructor(
    private readonly findByActivationCodeRepository: IFindByActivationCodeRepository
  ) {}

  async createPassword(
    data: ICreateUserPasswordDTO
  ): Promise<ICreateUserPasswordResult> {
    const { code, password } = data

    const findUserByCode = await this.findByActivationCodeRepository.findCode(
      code
    )

    if (!findUserByCode)
      return {
        error: 'Porfavor, verifique se o seu código está correto.',
      }

    return await null
  }
}
