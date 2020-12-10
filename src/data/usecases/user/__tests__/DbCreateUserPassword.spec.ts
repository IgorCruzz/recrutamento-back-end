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
      email: 'user@mail.com',
    })

    expect(res).toHaveBeenCalledWith('code_generated')
  })

  it('should return an error message if FindByActivationCodeRepository returns null', async () => {
    jest
      .spyOn(findByActivationCodeRepository, 'findCode')
      .mockResolvedValue(undefined)

    const res = await dbCreateUserPassword.createPassword({
      code: 'code_generated',
      password: 'password',
      email: 'user@mail.com',
    })

    expect(res).toEqual({
      error: 'Porfavor, verifique se o seu código está correto.',
    })
  })

  test('should throw if FindByActivationCodeRepository throws', async () => {
    jest
      .spyOn(findByActivationCodeRepository, 'findCode')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = dbCreateUserPassword.createPassword({
      code: 'code_generated',
      password: 'password',
      email: 'user@mail.com',
    })
    await expect(promise).rejects.toThrow()
  })

  it('should return an error message if the code doesnt belongs to the user with the email passed', async () => {
    const res = await dbCreateUserPassword.createPassword({
      code: 'code_generated',
      password: 'password',
      email: 'wrongr@mail.com',
    })

    expect(res).toEqual({
      error: 'Porfavor, verifique se o seu código está correto.',
    })
  })
})
