import { ICreateUserRepository } from '@/data/protocols/database/user/CreateUser.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { IUserModel } from '@/domain/models/User.model'

import { getRepository } from 'typeorm'
import { User } from '../entities/User.entity'

export class UserRepository
  implements ICreateUserRepository, IFindUserByEmailRepository {
  async create(email: string): Promise<IUserModel> {
    const orm = getRepository(User)

    return await orm.save({
      email,
    })
  }

  async findMail(email: string): Promise<IUserModel> {
    const orm = getRepository(User)

    return await orm.findOne({
      email,
    })
  }
}
