import { BcryptCompareStub } from '@/data/mocks/Bcrypt.mock'
import { FindUserByEmailRepositoryStub } from '@/data/mocks/userRepo.mock'
import { ICompare } from '@/data/protocols/bcryptAdapter/Compare.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { ISign } from '@/data/protocols/jwtAdapter/signJwt.interface'
import { ISignIn } from '@/domain/usecases/signin/signin.domain'
import { DbSignIn } from '../DbSignin.data'

let dbSignIn: ISignIn
let findUserByEmailRepository: IFindUserByEmailRepository
let bcryptCompare: ICompare
let sign: ISign

describe('DbSignin ( DATA )', () => {
  beforeEach(() => {
    findUserByEmailRepository = new FindUserByEmailRepositoryStub()
    bcryptCompare = new BcryptCompareStub()
    dbSignIn = new DbSignIn(findUserByEmailRepository, bcryptCompare)
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

  it('should return an error message if findUserByEmailRepository returns an user with password with null value', async () => {
    const res = await dbSignIn.signIn({
      email: 'user@mail.com',
      password: 'password',
    })

    expect(res).toEqual({
      error:
        'Primeiramente, crie uma senha pelo link que enviamos para seu e-mail, no momento do cadastro.',
    })
  })

  it('should call bcryptCompare with success', async () => {
    jest.spyOn(findUserByEmailRepository, 'findMail').mockResolvedValue({
      id: 1,
      email: 'user@mail.com',
      password_hash: 'password',
      created_at: new Date(),
      updated_at: new Date(),
    })

    const res = jest.spyOn(bcryptCompare, 'compare')

    await dbSignIn.signIn({
      email: 'user@mail.com',
      password: 'password',
    })

    expect(res).toHaveBeenCalledWith('password', 'password')
  })
})
