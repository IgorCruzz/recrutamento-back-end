import { ICreateUserRepository } from '@/data/protocols/database/user/CreateUser.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { IUserModel } from '@/domain/models/User.model'

import { getRepository } from 'typeorm'
import { User } from '../entities/User.entity'

export class UserRepository
  implements ICreateUserRepository, IFindUserByEmailRepository {
  private readonly UserRepository = getRepository(User)

  async create(email: string): Promise<IUserModel> {
    return await this.UserRepository.save({
      email,
    })
  }

  async findMail(email: string): Promise<IUserModel> {
    return await this.UserRepository.findOne({
      email,
    })
  }
}
