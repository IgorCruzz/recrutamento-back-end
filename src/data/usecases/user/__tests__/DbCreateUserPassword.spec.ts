import { FindByActivationCodeRepositoryStub } from '@/data/mocks/activationRepo.mock'
import { IFindByActivationCodeRepository } from '@/data/protocols/database/activation/findByActivationCode.interface'
import { ICreateUserPassword } from '@/domain/usecases/user/CreatePassword.domain'
import { DbCreateUserPassword } from '../DbCreateUserPassword.data'

let dbCreateUserPassword: ICreateUserPassword
let findByActivationCodeRepository: IFindByActivationCodeRepository

describe('DbCreateUserPassword  ( DATA )', () => {
  beforeEach(() => {
    findByActivationCodeRepository = new FindByActivationCodeRepositoryStub()
    dbCreateUserPassword = new DbCreateUserPassword(
      findByActivationCodeRepository
    )
  })

  it('should be defined', () => {
    expect(dbCreateUserPassword).toBeDefined()
  })

  it('should call FindByActivationCodeRepository with success', async () => {
    const res = jest.spyOn(findByActivationCodeRepository, 'findCode')

    await dbCreateUserPassword.createPassword({
      code: 'code_generated',
      password: 'password',
    })

    expect(res).toHaveBeenCalledWith('code_generated')
  })
})
