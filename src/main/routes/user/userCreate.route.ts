import { adapRoute } from '../../adapters/express.adapter'
import { adapMiddleware } from '../../adapters/expressMiddleware.adapter'
import { Router } from 'express'
import { ICreateUser } from '../../../domain/usecases/user/CreateUser.domain'
import { UserRepository } from '../../../infra/database/repositories/User.repository'
import { ActivationRepository } from '../../../infra/database/repositories/Activation.repository'
import { SendGridAdapter } from '../../../infra/sendGridAdapter/sendgrid.adapter'
import { DbCreateUser } from '../../../data/usecases/user/DbCreateUser.data'
import { IController } from '../../../presentation/protocols'
import { CreateUserController } from '../../../presentation/controllers/user/CreateUser.controller'
import { SignupValidation } from '../../../infra/yupAdapter/Signup.validator'
import { ValidatorDecorator } from '../../../main/decorator/validator.decorator'

const routes = Router()

const createUserUseCase = (): ICreateUser => {
  const userRepository = new UserRepository()
  const activationRepository = new ActivationRepository()
  const activationUserMail = new SendGridAdapter()

  return new DbCreateUser(
    userRepository,
    userRepository,
    activationRepository,
    activationUserMail
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
