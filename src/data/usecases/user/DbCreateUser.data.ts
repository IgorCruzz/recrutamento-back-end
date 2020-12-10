import { IFindUserByEmail } from '@/data/protocols/database/user/FindUserByEmail.interface'
import {
  ICreateUser,
  ICreateUserResult,
} from '@/domain/usecases/user/CreateUser.domain'

export class DbCreateUser implements ICreateUser {
  constructor(private readonly findUserByEmail: IFindUserByEmail) {}

  async createUser(email: string): Promise<ICreateUserResult> {
    const findUser = await this.findUserByEmail.findMail(email)

    if (findUser) return { error: 'Já existe um usuário com este e-mail.' }

    return await null
  }
}
