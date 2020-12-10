import { IGenerateCode } from '@/data/protocols/cryptoAdapter/GenerateCode.interface'
import { ICreateActivationRepository } from '@/data/protocols/database/activation/createActivation.interface'
import { ICreateUserRepository } from '@/data/protocols/database/user/CreateUser.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { IActivationUser } from '@/data/protocols/sendGridAdapter/ActivationMail.interface'
import {
  ICreateUser,
  ICreateUserResult,
} from '@/domain/usecases/user/CreateUser.domain'

export class DbCreateUser implements ICreateUser {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly createUserRepository: ICreateUserRepository,
    private readonly createActivationRepository: ICreateActivationRepository,
    private readonly activationUser: IActivationUser,
    private readonly generateCode: IGenerateCode
  ) {}

  async createUser(email: string): Promise<ICreateUserResult> {
    const findUser = await this.findUserByEmailRepository.findMail(email)

    if (findUser) return { error: 'Já existe um usuário com este e-mail.' }

    const newUser = await this.createUserRepository.create(email)

    const activation = await this.createActivationRepository.create({
      user_id: newUser.id,
      code: this.generateCode.generate(),
    })

    await this.activationUser.activationUser({
      code: activation.code,
      email: newUser.email,
    })

    return {
      id: newUser.id,
      email: newUser.email,
    }
  }
}
