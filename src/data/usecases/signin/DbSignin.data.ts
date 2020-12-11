import { ICompare } from '@/data/protocols/bcryptAdapter/Compare.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import {
  ISignIn,
  ISignInDTO,
  ISignInDTOResult,
} from '@/domain/usecases/signin/signin.domain'

export class DbSignIn implements ISignIn {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly bcryptCompare: ICompare
  ) {}

  async signIn(data: ISignInDTO): Promise<ISignInDTOResult> {
    const { email, password } = data

    const findUser = await this.findUserByEmailRepository.findMail(email)

    if (!findUser) return { error: 'Não existe um usuário com este e-mail.' }

    if (!findUser.password_hash) {
      return {
        error:
          'Primeiramente, crie uma senha pelo link que enviamos para seu e-mail, no momento do cadastro.',
      }
    }

    const checkPassword = await this.bcryptCompare.compare(
      password,
      findUser.password_hash
    )

    if (!checkPassword) return { error: 'Senha incorreta, tente novamente.' }

    return await null
  }
}
