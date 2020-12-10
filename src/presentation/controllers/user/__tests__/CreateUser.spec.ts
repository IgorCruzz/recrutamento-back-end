import { ICreateUser } from '@/domain/usecases/user/CreateUser.domain'
import {
  badRequest,
  created,
  serverError,
} from '@/presentation/http/http-helper'
import { DbCreateUserStub } from '@/presentation/mocks/User.mock'
import { IController, IHttpRequest } from '@/presentation/protocols'
import { CreateUserController } from '../CreateUser.controller'

let createUserController: IController
let createUser: ICreateUser

describe('createUser  ( Controller )', () => {
  beforeEach(() => {
    createUser = new DbCreateUserStub()
    createUserController = new CreateUserController(createUser)
  })

  it('should be defined', () => {
    expect(createUserController).toBeDefined()
  })

  it('should return 201 if createUser return a new User', async () => {
    const req: IHttpRequest = {
      body: {
        email: 'user@mail.com',
      },
    }

    const res = await createUserController.handle(req)

    expect(res).toEqual(
      created({
        id: 1,
        email: 'user@mail.com',
      })
    )
  })

  it('should return 400 if createUser return an error message', async () => {
    const req: IHttpRequest = {
      body: {
        email: 'user@mail.com',
      },
    }

    jest
      .spyOn(createUser, 'createUser')
      .mockResolvedValue({ error: 'Já existe um usuário com este e-mail.' })

    const res = await createUserController.handle(req)

    expect(res).toEqual(badRequest('Já existe um usuário com este e-mail.'))
  })

  it('should return 500 if createUser throws', async () => {
    const req: IHttpRequest = {
      body: {
        email: 'user@mail.com',
      },
    }

    jest.spyOn(createUser, 'createUser').mockImplementation(() => {
      throw new Error()
    })

    const res = await createUserController.handle(req)

    expect(res).toEqual(serverError(new Error()))
  })
})
