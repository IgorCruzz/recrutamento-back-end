import { IUserModel } from '@/domain/models/User.model'
import { ICreateUser } from '../protocols/database/user/CreateUser.interface'
import { IFindUserByEmail } from '../protocols/database/user/FindUserByEmail.interface'

export class CreateUserStub implements ICreateUser {
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

export class FindUserByEmailStub implements IFindUserByEmail {
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
