import { IUserModel } from '@/domain/models/User.model'
import { ICreateUserRepository } from '../protocols/database/user/CreateUser.interface'
import { IFindUserByEmailRepository } from '../protocols/database/user/FindUserByEmail.interface'
import {
  IUpdateUserPasswordRepository,
  IUpdateUserPasswordRepositoryDTO,
} from '../protocols/database/user/UpdateUserPassword.interface'

export class CreateUserRepositoryStub implements ICreateUserRepository {
  async create(email: string): Promise<IUserModel> {
    return Promise.resolve({
      id: 1,
      email: 'user@mail.com',
      password_hash: undefined,
      created_at: new Date(),
      updated_at: new Date(),
    })
  }
}

export class FindUserByEmailRepositoryStub
  implements IFindUserByEmailRepository {
  async findMail(email: string): Promise<IUserModel> {
    return Promise.resolve({
      id: 1,
      email: 'user@mail.com',
      password_hash: null,
      created_at: new Date(),
      updated_at: new Date(),
    })
  }
}

export class UpdateUserPasswordRepositoryStub
  implements IUpdateUserPasswordRepository {
  async updatePassword(
    data: IUpdateUserPasswordRepositoryDTO
  ): Promise<boolean> {
    return Promise.resolve(true)
  }
}
