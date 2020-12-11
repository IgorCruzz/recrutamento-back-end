import { ICreateUserRepository } from '@/data/protocols/database/user/CreateUser.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { IFindUserByIdRepository } from '@/data/protocols/database/user/FindUserByIdRepository.interface'
import {
  IUpdateUserPasswordRepository,
  IUpdateUserPasswordRepositoryDTO,
} from '@/data/protocols/database/user/UpdateUserPassword.interface'
import { IUserModel } from '@/domain/models/User.model'

import { getRepository } from 'typeorm'
import { User } from '../entities/User.entity'

export class UserRepository
  implements
    ICreateUserRepository,
    IFindUserByEmailRepository,
    IUpdateUserPasswordRepository,
    IFindUserByIdRepository {
  async create(email: string): Promise<IUserModel> {
    const orm = getRepository(User)

    return await orm.save({
      email,
    })
  }

  async findId(id: number): Promise<User> {
    const orm = getRepository(User)

    return await orm.findOne({ id })
  }

  async findMail(email: string): Promise<IUserModel> {
    const orm = getRepository(User)

    return await orm.findOne({
      email,
    })
  }

  async updatePassword(
    data: IUpdateUserPasswordRepositoryDTO
  ): Promise<boolean> {
    const { id, password } = data

    const orm = getRepository(User)

    const updatePassword = await orm.update(id, {
      password_hash: password,
    })

    return updatePassword && true
  }
}
