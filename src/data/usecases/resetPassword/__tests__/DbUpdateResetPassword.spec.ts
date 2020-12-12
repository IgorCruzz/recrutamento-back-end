import { BcryptHasherStub } from '@/data/mocks/Bcrypt.mock'
import { FindByUserIdRepositoryStub } from '@/data/mocks/ResetPassword.mock'
import {
  FindUserByEmailRepositoryStub,
  UpdateUserPasswordRepositoryStub,
} from '@/data/mocks/UserRepo.mock'
import { IHasher } from '@/data/protocols/bcryptAdapter/Hasher.interface'
import { IFindByUserIdRepository } from '@/data/protocols/database/resetPassword/FindByUserId.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { IUpdateUserPasswordRepository } from '@/data/protocols/database/user/UpdateUserPassword.interface'
import { IUpdateResetPassword } from '@/domain/usecases/resetPassword/UpdatePassword.domain'
import { DbUpdateResetPassword } from '../DbUpdateResetPassword.data'

let dbUpdateResetPassword: IUpdateResetPassword
let findUserByEmailRepository: IFindUserByEmailRepository
let findByUserIdRepository: IFindByUserIdRepository
let updateUserPasswordRepository: IUpdateUserPasswordRepository
let hasher: IHasher

describe('DbUpdateResetPassword ( DATA )', () => {
  beforeEach(() => {
    findUserByEmailRepository = new FindUserByEmailRepositoryStub()
    findByUserIdRepository = new FindByUserIdRepositoryStub()
    updateUserPasswordRepository = new UpdateUserPasswordRepositoryStub()
    hasher = new BcryptHasherStub()
    dbUpdateResetPassword = new DbUpdateResetPassword(
      findUserByEmailRepository,
      findByUserIdRepository,
      updateUserPasswordRepository,
      hasher
    )
  })

  it('should be defined', () => {
    expect(dbUpdateResetPassword).toBeDefined()
  })

  it('should call findUserByEmailRepository with success', async () => {
    const res = jest.spyOn(findUserByEmailRepository, 'findMail')

    await dbUpdateResetPassword.updateResetPassword({
      email: 'user@mail.com',
      password: 'password',
      token: 'token',
    })

    expect(res).toHaveBeenCalledWith('user@mail.com')
  })

  it('should return an error message if findUserByEmailRepository returns undefined', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockResolvedValue(undefined)

    const res = await dbUpdateResetPassword.updateResetPassword({
      email: 'user@mail.com',
      password: 'password',
      token: 'token',
    })

    expect(res).toEqual({ error: 'Não existe um usuário com este e-mail.' })
  })

  it('should throw if findUserByEmailRepository throws', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = dbUpdateResetPassword.updateResetPassword({
      email: 'user@mail.com',
      password: 'password',
      token: 'token',
    })
    await expect(promise).rejects.toThrow()
  })

  it('should call findByUserIdRepository with success', async () => {
    const res = jest.spyOn(findByUserIdRepository, 'findUserId')

    await dbUpdateResetPassword.updateResetPassword({
      email: 'user@mail.com',
      password: 'password',
      token: 'token',
    })

    expect(res).toHaveBeenCalledWith(1)
  })

  it('return an error message if token passed through params doesnt match', async () => {
    const res = await dbUpdateResetPassword.updateResetPassword({
      email: 'user@mail.com',
      password: 'password',
      token: 'another_token',
    })

    expect(res).toEqual({ error: 'Solicitação inválida.' })
  })

  it('should call updateUserPasswordRepository with success', async () => {
    const res = jest.spyOn(updateUserPasswordRepository, 'updatePassword')

    await dbUpdateResetPassword.updateResetPassword({
      email: 'user@mail.com',
      password: 'password',
      token: 'token',
    })

    expect(res).toHaveBeenCalledWith({
      id: 1,
      password: 'hashed_password',
    })
  })

  it('should throw if updateUserPasswordRepository throws', async () => {
    jest
      .spyOn(updateUserPasswordRepository, 'updatePassword')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = dbUpdateResetPassword.updateResetPassword({
      email: 'user@mail.com',
      password: 'password',
      token: 'token',
    })
    await expect(promise).rejects.toThrow()
  })

  it('should call hasher with success', async () => {
    const res = jest.spyOn(hasher, 'hash')

    await dbUpdateResetPassword.updateResetPassword({
      email: 'user@mail.com',
      password: 'password',
      token: 'token',
    })

    expect(res).toHaveBeenCalledWith('password')
  })

  it('should throw if hasher throws', async () => {
    jest.spyOn(hasher, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = dbUpdateResetPassword.updateResetPassword({
      email: 'user@mail.com',
      password: 'password',
      token: 'token',
    })
    await expect(promise).rejects.toThrow()
  })
})
