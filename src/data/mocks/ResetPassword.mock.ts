import { IResetPasswordModel } from '@/domain/models/ResetPassword.model'
import { ICreateResetPasswordRepository } from '../protocols/database/resetPassword/CreateUser.interface'

export class CreateResetPasswordRepository
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
