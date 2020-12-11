import {
  ICreateUserPassword,
  ICreateUserPasswordDTO,
  ICreateUserPasswordResult,
} from '@/domain/usecases/user/CreatePassword.domain'
import {
  ICreateUser,
  ICreateUserResult,
} from '@/domain/usecases/user/CreateUser.domain'

export class DbCreateUserStub implements ICreateUser {
  async createUser(email: string): Promise<ICreateUserResult> {
    return Promise.resolve({
      id: 1,
      email: 'user@mail.com',
    })
  }
}

export class DbCreateUserPasswordStub implements ICreateUserPassword {
  async createPassword(
    data: ICreateUserPasswordDTO
  ): Promise<ICreateUserPasswordResult> {
    return Promise.resolve({ updated: true })
  }
}
