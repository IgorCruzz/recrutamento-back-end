import { ICreateResetPasswordRepository } from '@/data/protocols/database/resetPassword/CreateUser.interface'
import { IResetPasswordModel } from '@/domain/models/ResetPassword.model'
import { getRepository } from 'typeorm'
import { ResetPassword } from '../entities/ResetPassword.entity'

export class ResetPasswordRepository implements ICreateResetPasswordRepository {
  async createResetPassword(id: number): Promise<IResetPasswordModel> {
    const orm = getRepository(ResetPassword)

    return await orm.save({
      user_id: id,
    })
  }
}
