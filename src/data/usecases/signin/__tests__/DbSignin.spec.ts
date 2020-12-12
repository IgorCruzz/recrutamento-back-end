import { BcryptCompareStub } from '@/data/mocks/Bcrypt.mock'
import { JwtSignAdapterStub } from '@/data/mocks/Jwt.mock'
import { FindUserByEmailRepositoryStub } from '@/data/mocks/UserRepo.mock'
import { ICompare } from '@/data/protocols/bcryptAdapter/Compare.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { ISign } from '@/data/protocols/jwtAdapter/SignJwt.interface'
import { ISignIn } from '@/domain/usecases/signin/signin.domain'
import { DbSignIn } from '../DbSignin.data'

let dbSignIn: ISignIn
let findUserByEmailRepository: IFindUserByEmailRepository
let bcryptCompare: ICompare
let jwtSign: ISign

describe('DbSignin ( DATA )', () => {
  beforeEach(() => {
    findUserByEmailRepository = new FindUserByEmailRepositoryStub()
    bcryptCompare = new BcryptCompareStub()
    jwtSign = new JwtSignAdapterStub()
    dbSignIn = new DbSignIn(findUserByEmailRepository, bcryptCompare, jwtSign)
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

  it('should return an error messga if bcryptCompare returns false', async () => {
    jest.spyOn(findUserByEmailRepository, 'findMail').mockResolvedValue({
      id: 1,
      email: 'user@mail.com',
      password_hash: 'different_password',
      created_at: new Date(),
      updated_at: new Date(),
    })

    jest.spyOn(bcryptCompare, 'compare').mockResolvedValue(false)

    const res = await dbSignIn.signIn({
      email: 'user@mail.com',
      password: 'password',
    })

    expect(res).toEqual({ error: 'Senha incorreta, tente novamente.' })
  })

  it('should call jwtSign with success', async () => {
    jest.spyOn(findUserByEmailRepository, 'findMail').mockResolvedValue({
      id: 1,
      email: 'user@mail.com',
      password_hash: 'password',
      created_at: new Date(),
      updated_at: new Date(),
    })

    const res = jest.spyOn(jwtSign, 'sign')

    await dbSignIn.signIn({
      email: 'user@mail.com',
      password: 'password',
    })

    expect(res).toHaveBeenCalledWith(1)
  })

  it('should able to signIn', async () => {
    jest.spyOn(findUserByEmailRepository, 'findMail').mockResolvedValue({
      id: 1,
      email: 'user@mail.com',
      password_hash: 'password',
      created_at: new Date(),
      updated_at: new Date(),
    })

    const res = await dbSignIn.signIn({
      email: 'user@mail.com',
      password: 'password',
    })

    expect(res).toEqual({
      id: 1,
      email: 'user@mail.com',
      token: 'token',
    })
  })
})
