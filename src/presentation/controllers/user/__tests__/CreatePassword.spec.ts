import { ICreateUserPassword } from '@/domain/usecases/user/CreatePassword.domain'
import { badRequest, ok, serverError } from '@/presentation/http/http-helper'
import { DbCreateUserPasswordStub } from '@/presentation/mocks/User.mock'
import { IController, IHttpRequest } from '@/presentation/protocols'
import { CreatePasswordController } from '../CreatePassword.controller'

let createUserController: IController
let createUserPassword: ICreateUserPassword

describe('createUser  ( Controller )', () => {
  beforeEach(() => {
    createUserPassword = new DbCreateUserPasswordStub()
    createUserController = new CreatePasswordController(createUserPassword)
  })

  it('should be defined', () => {
    expect(createUserController).toBeDefined()
  })

  it('should return 201 if createPassword return true', async () => {
    const req: IHttpRequest = {
      params: {
        code: 'code_generated',
      },
      body: {
        email: 'user@mail.com',
        password: 'password',
        confirmPassword: 'password',
      },
    }

    const res = await createUserController.handle(req)

    expect(res).toEqual(ok({ message: 'Senha criada com sucesso.' }))
  })

  it('should return 400 if createUserPassword return an error message', async () => {
    const req: IHttpRequest = {
      params: {
        code: 'code_generated',
      },
      body: {
        email: 'user@mail.com',
        password: 'password',
        confirmPassword: 'password',
      },
    }

    jest.spyOn(createUserPassword, 'createPassword').mockResolvedValue({
      error: 'Por favor, verifique se o seu código está correto.',
    })

    const res = await createUserController.handle(req)

    expect(res).toEqual(
      badRequest('Por favor, verifique se o seu código está correto.')
    )
  })

  it('should return 500 if createUserPassword throws', async () => {
    const req: IHttpRequest = {
      params: {
        code: 'code_generated',
      },
      body: {
        email: 'user@mail.com',
        password: 'password',
        confirmPassword: 'password',
      },
    }

    jest.spyOn(createUserPassword, 'createPassword').mockImplementation(() => {
      throw new Error()
    })

    const res = await createUserController.handle(req)

    expect(res).toEqual(serverError(new Error()))
  })
})
