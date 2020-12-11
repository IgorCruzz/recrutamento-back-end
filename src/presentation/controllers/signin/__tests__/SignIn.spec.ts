import { ISignIn } from '@/domain/usecases/signin/signin.domain'
import { created } from '../../../../presentation/http/http-helper'
import { DbSignInStub } from '@/presentation/mocks/SignIn.mock'
import { IController, IHttpRequest } from '@/presentation/protocols'
import { SignInController } from '../SignIn.controller'

let signInController: IController
let signIn: ISignIn

describe('SignIn ( Controller )', () => {
  beforeEach(() => {
    signIn = new DbSignInStub()
    signInController = new SignInController(signIn)
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
})
