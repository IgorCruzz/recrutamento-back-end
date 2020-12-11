import { adapRoute } from '../../adapters/express.adapter'
import { adapMiddleware } from '../../adapters/expressMiddleware.adapter'
import { Router } from 'express'
import { ISignIn } from '../../../domain/usecases/signin/signin.domain'
import { UserRepository } from '../../../infra/database/repositories/User.repository'
import { DbSignIn } from '../../../data/usecases/signin/DbSignin.data'
import { IController } from '../../../presentation/protocols'
import { SignInController } from '../../../presentation/controllers/signin/SignIn.controller'
import { SiginValidation } from '../../../infra/yupAdapter/Signin.validator'
import { ValidatorDecorator } from '../../../main/decorator/validator.decorator'
import { JwtAdapter } from '../../../infra/jwtAdapter/jwt.adapter'
import { BcryptAdapter } from '../../../infra/bcryptAdapter/Bcrypt.adapter'

const routes = Router()

const signInUseCase = (): ISignIn => {
  const userRepository = new UserRepository()
  const jwtAdapter = new JwtAdapter()
  const bcryptAdapter = new BcryptAdapter()

  return new DbSignIn(userRepository, bcryptAdapter, jwtAdapter)
}

const signInController = (): IController => {
  return new SignInController(signInUseCase())
}

const signInValidation = (): any => {
  const signinValidation = new SiginValidation()
  return new ValidatorDecorator(signinValidation)
}

routes.post(
  '/signin',
  adapMiddleware(signInValidation()),
  adapRoute(signInController())
)

export default routes
