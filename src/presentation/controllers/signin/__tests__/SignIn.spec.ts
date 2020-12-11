import { ISignIn } from '@/domain/usecases/signin/signin.domain'
import {
  badRequest,
  created,
  serverError,
} from '../../../../presentation/http/http-helper'
import { DbSignInStub } from '@/presentation/mocks/SignIn.mock'
import { IController, IHttpRequest } from '@/presentation/protocols'
import { SignInController } from '../SignIn.controller'

let signInController: IController
let dbSignIn: ISignIn

describe('SignIn ( Controller )', () => {
  beforeEach(() => {
    dbSignIn = new DbSignInStub()
    signInController = new SignInController(dbSignIn)
  })

  it('should be defined', () => {
    expect(signInController).toBeDefined()
  })

  it('should return 201 if signInController return an session data', async () => {
    const req: IHttpRequest = {
      body: {
        email: 'user@mail.com',
        password: 'password',
      },
    }

    const res = await signInController.handle(req)

    expect(res).toEqual(
      created({ id: 1, email: 'user@mail.com', token: 'token' })
    )
  })

  it('should return 400 if dbSignIn return an error message', async () => {
    const req: IHttpRequest = {
      body: {
        email: 'user@mail.com',
        password: 'password',
      },
    }

    jest.spyOn(dbSignIn, 'signIn').mockResolvedValue({
      error: 'Não existe um usuário com este e-mail.',
    })

    const res = await signInController.handle(req)

    expect(res).toEqual(badRequest('Não existe um usuário com este e-mail.'))
  })

  it('should return 500 if dbSignIn throws', async () => {
    const req: IHttpRequest = {
      body: {
        email: 'user@mail.com',
        password: 'password',
      },
    }

    jest.spyOn(dbSignIn, 'signIn').mockImplementation(() => {
      throw new Error()
    })

    const res = await signInController.handle(req)

    expect(res).toEqual(serverError(new Error()))
  })
})
