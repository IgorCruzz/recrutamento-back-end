import { ICreateResetPasswordRepository } from '@/data/protocols/database/resetPassword/CreateUser.interface'
import { IFindByUserIdRepository } from '@/data/protocols/database/resetPassword/FindByUserId.interface'
import { IResetPasswordModel } from '@/domain/models/ResetPassword.model'
import { getRepository } from 'typeorm'
import { ResetPassword } from '../entities/ResetPassword.entity'

export class ResetPasswordRepository
  implements ICreateResetPasswordRepository, IFindByUserIdRepository {
  async createResetPassword(id: number): Promise<IResetPasswordModel> {
    const orm = getRepository(ResetPassword)

    return await orm.save({
      user_id: id,
    })
  }

  async findUserId(id: number): Promise<IResetPasswordModel> {
    const orm = getRepository(ResetPassword)

    return await orm.findOne({
      where: { user_id: id },
    })
  }
}
