import { CreateActivationStub } from '@/data/mocks/activationRepo.mock'
import {
  CreateUserRepositoryStub,
  FindUserByEmailRepositoryStub,
} from '@/data/mocks/userRepo.mock'
import { ICreateActivationRepository } from '@/data/protocols/database/activation/createActivation.interface'
import { ICreateUserRepository } from '@/data/protocols/database/user/CreateUser.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { ICreateUser } from '@/domain/usecases/user/CreateUser.domain'
import { DbCreateUser } from '../DbCreateUser.data'

let dBCreateUser: ICreateUser
let findUserByEmailRepository: IFindUserByEmailRepository
let createActivationRepository: ICreateActivationRepository
let createUserRepository: ICreateUserRepository

describe('DbCreateUser  ( DATA )', () => {
  beforeEach(() => {
    createActivationRepository = new CreateActivationStub()
    findUserByEmailRepository = new FindUserByEmailRepositoryStub()
    createUserRepository = new CreateUserRepositoryStub()
    dBCreateUser = new DbCreateUser(
      findUserByEmailRepository,
      createUserRepository,
      createActivationRepository
    )
  })

  it('should be defined', () => {
    expect(dBCreateUser).toBeDefined()
  })

  it('should call findUserByEmailRepository with success', async () => {
    const res = jest.spyOn(findUserByEmailRepository, 'findMail')

    await dBCreateUser.createUser('user@mail.com')

    expect(res).toHaveBeenCalledWith('user@mail.com')
  })

  it('should return an error message if has already an user with email passed', async () => {
    const res = await dBCreateUser.createUser('user@mail.com')

    expect(res).toEqual({ error: 'Já existe um usuário com este e-mail.' })
  })

  it('should call createUserRepository with success', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockResolvedValue(undefined)
    const res = jest.spyOn(createUserRepository, 'create')

    await dBCreateUser.createUser('user@mail.com')

    expect(res).toHaveBeenCalledWith('user@mail.com')
  })

  it('should call createActivationRepository with success', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockResolvedValue(undefined)
    const res = jest.spyOn(createActivationRepository, 'create')

    await dBCreateUser.createUser('user@mail.com')

    expect(res).toHaveBeenCalledWith({ user_id: 1, code: 'generated_code' })
  })

  it('should return an user registered', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockResolvedValue(undefined)

    const res = await dBCreateUser.createUser('user@mail.com')

    expect(res).toEqual({
      id: 1,
      email: 'user@mail.com',
    })
  })

  test('should throw if AddAccountRepository throws', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = dBCreateUser.createUser('user@mail.com')
    await expect(promise).rejects.toThrow()
  })

  test('should throw if createActivationRepository throws', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockResolvedValue(undefined)
    jest
      .spyOn(createActivationRepository, 'create')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = dBCreateUser.createUser('user@mail.com')
    await expect(promise).rejects.toThrow()
  })

  test('should throw if createUserRepository throws', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockResolvedValue(undefined)

    jest.spyOn(createUserRepository, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = dBCreateUser.createUser('user@mail.com')
    await expect(promise).rejects.toThrow()
  })
})
