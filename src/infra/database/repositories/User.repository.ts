import { IFindUserByEmail } from '@/data/protocols/database/user/FindUserByEmail.interface'
import {
  ICreateUser,
  IUserModel,
} from 'data/protocols/database/user/CreateUser.interface'
import { getRepository } from 'typeorm'
import { User } from '../entities/User.entity'

export class UserRepository implements ICreateUser, IFindUserByEmail {
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
