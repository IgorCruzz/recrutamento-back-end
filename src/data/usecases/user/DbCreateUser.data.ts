import {
  ICreateUser,
  ICreateUserResult,
} from '@/domain/usecases/user/CreateUser.domain'

export class DbCreateUser implements ICreateUser {
  constructor() {}

  async createUser(email: string): Promise<ICreateUserResult> {
    return await null
  }
}
