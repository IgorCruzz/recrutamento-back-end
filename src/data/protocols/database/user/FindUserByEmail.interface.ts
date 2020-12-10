import { IUserModel } from '@/domain/models/User.model'

export interface IFindUserByEmail {
  findMail(email: string): Promise<IUserModel>
}
