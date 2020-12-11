import { JwtVerifydapterStub } from '@/data/mocks/Jwt.mock'
import { FindUserByIdRepositoryStub } from '@/data/mocks/userRepo.mock'
import { IFindUserByIdRepository } from '@/data/protocols/database/user/FindUserByIdRepository.interface'
import { IVerify } from '@/data/protocols/jwtAdapter/verifyJwt.interface'
import { IAuthorization } from '@/domain/usecases/authorization/authorization.interface'
import { DbAuthorization } from '../dbAuthorization.data'

let authorizationData: IAuthorization
let verifyRepository: IVerify
let userFindIdRepository: IFindUserByIdRepository

describe('Authorization Data', () => {
  beforeEach(() => {
    verifyRepository = new JwtVerifydapterStub()
    userFindIdRepository = new FindUserByIdRepositoryStub()
    authorizationData = new DbAuthorization(
      verifyRepository,
      userFindIdRepository
    )
  })

  it('should be defined', () => {
    expect(authorizationData).toBeDefined()
  })

  it('should be able to call VerifyRepository with success', async () => {
    const res = jest.spyOn(verifyRepository, 'verify')

    await authorizationData.auth({ token: 'token' })

    expect(res).toHaveBeenCalledWith('token')
  })

  it('should be able to return an user id', async () => {
    const res = await authorizationData.auth({ token: 'token' })

    expect(res).toEqual({
      id: 1,
    })
  })

  it('should be returns an error message if VerifyRepository returns false', async () => {
    jest.spyOn(verifyRepository, 'verify').mockReturnValue(false)

    const res = await authorizationData.auth({ token: 'token' })

    expect(res).toEqual({
      error: 'Token inválido.',
    })
  })

  it('should be able to call userFindIdRepository with success', async () => {
    const res = jest.spyOn(userFindIdRepository, 'findId')

    await authorizationData.auth({ token: 'token' })

    expect(res).toHaveBeenCalledWith(1)
  })

  it('should return an error message if userFindIdRepository returns undefined', async () => {
    jest.spyOn(userFindIdRepository, 'findId').mockResolvedValue(undefined)

    const res = await authorizationData.auth({ token: 'token' })

    expect(res).toEqual({
      error: 'Este token não pertence a nenhum usuário.',
    })
  })
})
