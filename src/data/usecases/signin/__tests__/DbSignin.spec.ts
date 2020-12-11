import { FindUserByEmailRepositoryStub } from '@/data/mocks/userRepo.mock'
import { ICompare } from '@/data/protocols/bcryptAdapter/Compare.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { ISign } from '@/data/protocols/jwtAdapter/signJwt.interface'
import { ISignIn } from '@/domain/usecases/signin/signin.domain'
import { DbSignIn } from '../DbSignin.data'

let dbSignIn: ISignIn
let findUserByEmailRepository: IFindUserByEmailRepository
let compare: ICompare
let sign: ISign

describe('DbSignin ( DATA )', () => {
  beforeEach(() => {
    findUserByEmailRepository = new FindUserByEmailRepositoryStub()
    dbSignIn = new DbSignIn(findUserByEmailRepository)
  })

  it('should be defined', () => {
    expect(dbSignIn).toBeDefined()
  })

  it('should call findUserByEmailRepository with success', async () => {
    const res = jest.spyOn(findUserByEmailRepository, 'findMail')

    await dbSignIn.signIn({
      email: 'user@mail.com',
      password: 'password',
    })

    expect(res).toHaveBeenCalledWith('user@mail.com')
  })

  it('should return an error message if findUserByEmailRepository returns undefined', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockResolvedValue(undefined)

    const res = await dbSignIn.signIn({
      email: 'user@mail.com',
      password: 'password',
    })

    expect(res).toEqual({ error: 'Não existe um usuário com este e-mail.' })
  })
})
