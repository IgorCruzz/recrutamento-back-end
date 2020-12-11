import { IResetPasswordModel } from '@/domain/models/ResetPassword.model'

export interface IFindByUserIdRepository {
  findUserId(id: number): Promise<IResetPasswordModel>
}
