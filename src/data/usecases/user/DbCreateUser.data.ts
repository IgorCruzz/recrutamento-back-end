import { ICreateActivationRepository } from '@/data/protocols/database/activation/createActivation.interface'
import { ICreateUserRepository } from '@/data/protocols/database/user/CreateUser.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import {
  ICreateUser,
  ICreateUserResult,
} from '@/domain/usecases/user/CreateUser.domain'

export class DbCreateUser implements ICreateUser {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly createUserRepository: ICreateUserRepository,
    private readonly createActivationRepository: ICreateActivationRepository
  ) {}

  async createUser(email: string): Promise<ICreateUserResult> {
    const findUser = await this.findUserByEmailRepository.findMail(email)

    if (findUser) return { error: 'Já existe um usuário com este e-mail.' }

    const newUser = await this.createUserRepository.create(email)

    await this.createActivationRepository.create({
      user_id: newUser.id,
      code: 'generated_code',
    })

    return {
      id: newUser.id,
      email: newUser.email,
    }
  }
}
