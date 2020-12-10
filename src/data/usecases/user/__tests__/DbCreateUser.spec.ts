import { CreateActivationStub } from '@/data/mocks/activationRepo.mock'
import { FindUserByEmailRepositoryStub } from '@/data/mocks/userRepo.mock'
import { ICreateActivationRepository } from '@/data/protocols/database/activation/createActivation.interface'
import { IFindUserByEmailRepository } from '@/data/protocols/database/user/FindUserByEmail.interface'
import { ICreateUser } from '@/domain/usecases/user/CreateUser.domain'
import { DbCreateUser } from '../DbCreateUser.data'

let dBCreateUser: ICreateUser
let findUserByEmailRepository: IFindUserByEmailRepository
let createActivationRepository: ICreateActivationRepository

describe('DbCreateUser  ( DATA )', () => {
  beforeEach(() => {
    createActivationRepository = new CreateActivationStub()
    findUserByEmailRepository = new FindUserByEmailRepositoryStub()
    dBCreateUser = new DbCreateUser(
      findUserByEmailRepository,
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

  it('should call createActivation with success', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockResolvedValue(undefined)
    const res = jest.spyOn(createActivationRepository, 'create')

    await dBCreateUser.createUser('user@mail.com')

    expect(res).toHaveBeenCalledWith({ user_id: 1, code: 'generated_code' })
  })

  it('should call createActivationRepository with success', async () => {
    jest
      .spyOn(findUserByEmailRepository, 'findMail')
      .mockResolvedValue(undefined)
    const res = jest.spyOn(createActivationRepository, 'create')

    await dBCreateUser.createUser('user@mail.com')

    expect(res).toHaveBeenCalledWith({ user_id: 1, code: 'generated_code' })
  })
})
