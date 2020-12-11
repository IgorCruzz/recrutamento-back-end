import { IResetPasswordModel } from '@/domain/models/ResetPassword.model'
import { ICreateResetPasswordRepository } from '../protocols/database/resetPassword/CreateUser.interface'
import { IFindByUserIdRepository } from '../protocols/database/resetPassword/FindByUserId.interface'

export class CreateResetPasswordRepositoryStub
  implements ICreateResetPasswordRepository {
  async createResetPassword(id: number): Promise<IResetPasswordModel> {
    return Promise.resolve({
      user_id: 1,
      reset_token: 'token',
      created_at: new Date(),
      updated_at: new Date(),
    })
  }
}

export class FindByUserIdRepositoryStub implements IFindByUserIdRepository {
  async findUserId(id: number): Promise<IResetPasswordModel> {
    return Promise.resolve({
      user_id: 1,
      reset_token: 'token',
      created_at: new Date(),
      updated_at: new Date(),
    })
  }
}
