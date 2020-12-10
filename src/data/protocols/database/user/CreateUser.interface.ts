import { IUserModel } from '@/domain/models/User.model'

export interface ICreateUserRepository {
  create(email: string): Promise<IUserModel>
}
