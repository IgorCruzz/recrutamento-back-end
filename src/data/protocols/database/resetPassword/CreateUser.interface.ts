import { IResetPasswordModel } from '@/domain/models/ResetPassword.model'

export interface ICreateResetPasswordRepository {
  createResetPassword(id: number): Promise<IResetPasswordModel>
}
