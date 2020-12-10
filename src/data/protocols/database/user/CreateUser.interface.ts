import { IUserModel } from '@/domain/models/User.model'

export interface ICreateUser {
  create(email: string): Promise<IUserModel>
}
