import {
  IAuthorization,
  IAuthorizationResult,
} from '@/domain/usecases/authorization/authorization.interface'
import { IVerify } from '@/data/protocols/jwtAdapter/verifyJwt.interface'
import { IFindUserByIdRepository } from '@/data/protocols/database/user/FindUserByIdRepository.interface'

export class DbAuthorization implements IAuthorization {
  constructor(
    private readonly Verify: IVerify,
    private readonly findUserByIdRepository: IFindUserByIdRepository
  ) {}

  async auth(token: string): Promise<IAuthorizationResult> {
    const decoded = await this.Verify.verify(token)

    if (!decoded) return { error: 'Token inválido.' }

    const user = await this.findUserByIdRepository.findId(decoded.id)

    if (!user) return { error: 'Este token não pertence a nenhum usuário.' }

    return { id: decoded.id }
  }
}
