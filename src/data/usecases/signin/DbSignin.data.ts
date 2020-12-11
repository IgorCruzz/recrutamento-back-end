import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import {
  ISignIn,
  ISignInDTO,
  ISignInDTOResult,
} from '@/domain/usecases/signin/signin.domain'

export class DbSignIn implements ISignIn {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository
  ) {}

  async signIn(data: ISignInDTO): Promise<ISignInDTOResult> {
    const { email } = data

    const findUser = await this.findUserByEmailRepository.findMail(email)

    if (!findUser) return { error: 'Não existe um usuário com este e-mail.' }
    return await null
  }
}
