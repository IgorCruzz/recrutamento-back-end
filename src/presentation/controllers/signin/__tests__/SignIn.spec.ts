import { ISignIn } from '@/domain/usecases/signin/signin.domain'
import { DbSignInStub } from '@/presentation/mocks/SignIn.mock'
import { IController } from '@/presentation/protocols'
import { SignInController } from '../SignIn.controller'

let signInController: IController
let signIn: ISignIn

describe('SignIn ( Controller )', () => {
  beforeEach(() => {
    signIn = new DbSignInStub()
    signInController = new SignInController()
  })

  it('should be defined', () => {
    expect(signInController).toBeDefined()
  })
})
