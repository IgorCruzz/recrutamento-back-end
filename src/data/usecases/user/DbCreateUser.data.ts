import { ICreateActivationRepository } from '@/data/protocols/database/activation/createActivation.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import {
  ICreateUser,
  ICreateUserResult,
} from '@/domain/usecases/user/CreateUser.domain'

export class DbCreateUser implements ICreateUser {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly createActivationRepository: ICreateActivationRepository
  ) {}

  async createUser(email: string): Promise<ICreateUserResult> {
    const findUser = await this.findUserByEmailRepository.findMail(email)

    if (findUser) return { error: 'Já existe um usuário com este e-mail.' }

    await this.createActivationRepository.create({
      user_id: 1,
      code: 'generated_code',
    })

    return await null
  }
}
