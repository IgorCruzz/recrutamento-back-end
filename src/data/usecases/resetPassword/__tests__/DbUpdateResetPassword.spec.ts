import { FindByUserIdRepositoryStub } from '@/data/mocks/ResetPassword.mock'
import { FindUserByEmailRepositoryStub } from '@/data/mocks/userRepo.mock'
import { IFindByUserIdRepository } from '@/data/protocols/database/resetPassword/FindByUserId.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { IUpdateResetPassword } from '@/domain/usecases/resetPassword/UpdatePassword.domain'
import { DbUpdateResetPassword } from '../DbUpdateResetPassword.data'

let dbUpdateResetPassword: IUpdateResetPassword
let findUserByEmailRepository: IFindUserByEmailRepository
let findByUserIdRepository: IFindByUserIdRepository

describe('DbUpdateResetPassword ( DATA )', () => {
  beforeEach(() => {
    findUserByEmailRepository = new FindUserByEmailRepositoryStub()
    findByUserIdRepository = new FindByUserIdRepositoryStub()
    dbUpdateResetPassword = new DbUpdateResetPassword(
      findUserByEmailRepository,
      findByUserIdRepository
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
})
