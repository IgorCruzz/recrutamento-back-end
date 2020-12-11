import { IHasher } from '@/data/protocols/bcryptAdapter/Hasher.interface'
import { IFindByUserIdRepository } from '@/data/protocols/database/resetPassword/FindByUserId.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { IUpdateUserPasswordRepository } from '@/data/protocols/database/user/UpdateUserPassword.interface'
import {
  IUpdateResetPassword,
  IUpdateResetPasswordDTO,
  IUpdateResetPasswordResult,
} from '@/domain/usecases/resetPassword/UpdatePassword.domain'

export class DbUpdateResetPassword implements IUpdateResetPassword {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly findByUserIdRepository: IFindByUserIdRepository,
    private readonly updateUserPasswordRepository: IUpdateUserPasswordRepository,
    private readonly hasher: IHasher
  ) {}

  async updateResetPassword(
    data: IUpdateResetPasswordDTO
  ): Promise<IUpdateResetPasswordResult> {
    const { email, token, password } = data

    const user = await this.findUserByEmailRepository.findMail(email)

    if (!user) return { error: 'Não existe um usuário com este e-mail.' }

    const getToken = await this.findByUserIdRepository.findUserId(user.id)

    if (getToken.reset_token !== token)
      return { error: 'Solicitação inválida.' }

    const updated = await this.updateUserPasswordRepository.updatePassword({
      id: getToken.user_id,
      password: await this.hasher.hash(password),
    })

    return { updated }
  }
}
