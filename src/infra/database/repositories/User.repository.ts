import {
  ICreateUser,
  IUserModel,
} from 'data/protocols/database/user/CreateUser.interface'

export class UserRepository implements ICreateUser {
  async(email: string): Promise<IUserModel> {
    const orm = getRepository(User)

    await orm.save(email)
  }
}
