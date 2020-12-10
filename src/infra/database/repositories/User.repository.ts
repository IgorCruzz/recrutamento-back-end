import {
  ICreateUser,
  IUserModel,
} from 'data/protocols/database/user/CreateUser.interface'
import { getRepository } from 'typeorm'
import { User } from '../entities/User.entity'

export class UserRepository implements ICreateUser {
  private readonly UserRepository = getRepository(User)

  async create(email: string): Promise<IUserModel> {
    return await this.UserRepository.save({
      email,
    })
  }
}
