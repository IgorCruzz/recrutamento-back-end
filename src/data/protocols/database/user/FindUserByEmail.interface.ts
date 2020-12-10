import { IUserModel } from '@/domain/models/User.model'

export interface IFindUserByEmailRepository {
  findMail(email: string): Promise<IUserModel>
}
