import { FindUserByEmailRepositoryStub } from '@/data/mocks/userRepo.mock'
import { ICreateResetPasswordRepository } from '@/data/protocols/database/resetPassword/CreateUser.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { ICreateResetPassword } from '@/domain/usecases/resetPassword/CreatePassword.domain'
import { DbCreateResetPassword } from '../DbCreateResetPassword.data'

let dbCreateResetPassword: ICreateResetPassword
let findUserByEmailRepository: IFindUserByEmailRepository
let createResetPasswordRepository: ICreateResetPasswordRepository

describe('CreateResetPassword ( DATA )', () => {
  beforeEach(() => {
    findUserByEmailRepository = new FindUserByEmailRepositoryStub()
    dbCreateResetPassword = new DbCreateResetPassword(findUserByEmailRepository)
  })

  it('should be defined', () => {
    expect(dbCreateResetPassword).toBeDefined()
  })

  it('should call findUserByEmailRepository with success', async () => {
    const res = jest.spyOn(findUserByEmailRepository, 'findMail')

    await dbCreateResetPassword.createResetPassword('user@mail.com')

    expect(res).toHaveBeenCalledWith('user@mail.com')
  })
})
