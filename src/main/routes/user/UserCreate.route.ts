import { adapRoute } from '../../adapters/Express.adapter'
import { adapMiddleware } from '../../adapters/ExpressMiddleware.adapter'
import { Router } from 'express'
import { ICreateUser } from '../../../domain/usecases/user/CreateUser.domain'
import { UserRepository } from '../../../infra/database/repositories/User.repository'
import { ActivationRepository } from '../../../infra/database/repositories/Activation.repository'
import { SendGridAdapter } from '../../../infra/sendGridAdapter/Sendgrid.adapter'
import { DbCreateUser } from '../../../data/usecases/user/DbCreateUser.data'
import { IController } from '../../../presentation/protocols'
import { CreateUserController } from '../../../presentation/controllers/user/CreateUser.controller'
import { SignupValidation } from '../../../infra/yupAdapter/Signup.validator'
import { ValidatorDecorator } from '../../../main/decorator/Validator.decorator'
import { CryptAdapter } from '../../../infra/cryptoAdapter/crypto.adapter'

const routes = Router()

const createUserUseCase = (): ICreateUser => {
  const userRepository = new UserRepository()
  const activationRepository = new ActivationRepository()
  const activationUserMail = new SendGridAdapter()
  const cryptAdapter = new CryptAdapter()

  return new DbCreateUser(
    userRepository,
    userRepository,
    activationRepository,
    activationUserMail,
    cryptAdapter
  )
}

export const createUserController = (): IController => {
  return new CreateUserController(createUserUseCase())
}

export const createUserValidation = (): any => {
  const signupValidation = new SignupValidation()
  return new ValidatorDecorator(signupValidation)
}

routes.post(
  '/user',
  adapMiddleware(createUserValidation()),
  adapRoute(createUserController())
)

export default routes
