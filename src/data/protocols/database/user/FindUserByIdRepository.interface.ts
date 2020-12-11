import { IUserModel } from '@/domain/models/User.model'

export interface IFindUserByIdRepository {
  findId(id: number): Promise<IUserModel>
}
