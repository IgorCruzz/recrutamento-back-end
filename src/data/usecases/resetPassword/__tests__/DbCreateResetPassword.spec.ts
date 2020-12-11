import { CreateResetPasswordRepositoryStub } from '@/data/mocks/ResetPassword.mock'
import { ResetPasswordStub } from '@/data/mocks/sendgrid.mock'
import { FindUserByEmailRepositoryStub } from '@/data/mocks/userRepo.mock'
import { ICreateResetPasswordRepository } from '@/data/protocols/database/resetPassword/CreateUser.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { IResetPassword } from '@/data/protocols/sendGridAdapter/ResetPasswordMail.interface'
import { ICreateResetPassword } from '@/domain/usecases/resetPassword/CreatePassword.domain'
import { DbCreateResetPassword } from '../DbCreateResetPassword.data'

let dbCreateResetPassword: ICreateResetPassword
let findUserByEmailRepository: IFindUserByEmailRepository
let createResetPasswordRepository: ICreateResetPasswordRepository
let resetPassword: IResetPassword

describe('CreateResetPassword ( DATA )', () => {
  beforeEach(() => {
    findUserByEmailRepository = new FindUserByEmailRepositoryStub()
    createResetPasswordRepository = new CreateResetPasswordRepositoryStub()
    resetPassword = new ResetPasswordStub()
    dbCreateResetPassword = new DbCreateResetPassword(
      findUserByEmailRepository,
      createResetPasswordRepository,
      resetPassword
    )
  })

  it('should be defined', () => {
    expect(dbCreateResetPassword).toBeDefined()
  })

  it('should call findUserByEmailRepository with success', async () => {
    const res = jest.spyOn(findUserByEmailRepository, 'findMail')

    await dbCreateResetPassword.createResetPassword('user@mail.com')

    expect(res).toHaveBeenCalledWith('user@mail.com')
  })

  it('should return an error message if findUserByEmailRepository returns undefined', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockResolvedValue(undefined)

    const res = await dbCreateResetPassword.createResetPassword('user@mail.com')

    expect(res).toEqual({ error: 'Não existe um usuário com este e-mail.' })
  })

  it('should throw if findUserByEmailRepository throws', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = dbCreateResetPassword.createResetPassword('user@mail.com')
    await expect(promise).rejects.toThrow()
  })

  it('should call createResetPasswordRepository with success', async () => {
    const res = jest.spyOn(createResetPasswordRepository, 'createResetPassword')

    await dbCreateResetPassword.createResetPassword('user@mail.com')

    expect(res).toHaveBeenCalledWith(1)
  })

  it('should throw if createResetPasswordRepository throws', async () => {
    jest
      .spyOn(createResetPasswordRepository, 'createResetPassword')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = dbCreateResetPassword.createResetPassword('user@mail.com')
    await expect(promise).rejects.toThrow()
  })

  it('should call resetPassword with success', async () => {
    const res = jest.spyOn(resetPassword, 'resetPassword')

    await dbCreateResetPassword.createResetPassword('user@mail.com')

    expect(res).toHaveBeenCalledWith({ email: 'user@mail.com', token: 'token' })
  })

  it('should throw if resetPassword throws', async () => {
    jest.spyOn(resetPassword, 'resetPassword').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = dbCreateResetPassword.createResetPassword('user@mail.com')
    await expect(promise).rejects.toThrow()
  })

  it('should return a token to reset the password', async () => {
    const res = await dbCreateResetPassword.createResetPassword('user@mail.com')

    expect(res).toEqual({
      id: 1,
      resetToken: 'token',
    })
  })
})
