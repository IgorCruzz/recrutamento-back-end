import { adapRoute } from '../../adapters/express.adapter'
import { adapMiddleware } from '../../adapters/expressMiddleware.adapter'
import { Router } from 'express'
import { UserRepository } from '../../../infra/database/repositories/User.repository'
import { ActivationRepository } from '../../../infra/database/repositories/Activation.repository'
import { DbCreateUserPassword } from '../../../data/usecases/user/DbCreateUserPassword.data'
import { IController, IMiddleware } from '../../../presentation/protocols'
import { CreatePasswordController } from '../../../presentation/controllers/user/CreatePassword.controller'
import { ValidatorDecorator } from '../../../main/decorator/validator.decorator'
import { ICreateUserPassword } from '../../../domain/usecases/user/CreatePassword.domain'
import { CreatePasswordValidation } from '../../../infra/yupAdapter/CreatePassword.validator'
import { BcryptAdapter } from '../../../infra/bcryptAdapter/Bcrypt.adapter'

const routes = Router()

const createUserPasswordUseCase = (): ICreateUserPassword => {
  const userRepository = new UserRepository()
  const activationRepository = new ActivationRepository()
  const hasher = new BcryptAdapter()
  return new DbCreateUserPassword(activationRepository, userRepository, hasher)
}

export const createUserPasswordController = (): IController => {
  return new CreatePasswordController(createUserPasswordUseCase())
}

export const createUserPasswordValidation = (): IMiddleware => {
  const createPasswordValidation = new CreatePasswordValidation()
  return new ValidatorDecorator(createPasswordValidation)
}

routes.put(
  '/password/:code',
  adapMiddleware(createUserPasswordValidation()),
  adapRoute(createUserPasswordController())
)

export default routes
