import { Router } from 'express'
import { adapRoute } from '../../adapters/express.adapter'
import { adapMiddleware } from '../../adapters/expressMiddleware.adapter'
import { ICreateResetPassword } from '../../../domain/usecases/resetPassword/CreatePassword.domain'
import { UserRepository } from '../../../infra/database/repositories/User.repository'
import { DbCreateResetPassword } from '../../../data/usecases/resetPassword/DbCreateResetPassword.data'
import { IController, IMiddleware } from '../../../presentation/protocols'
import { ResetPasswordController } from '../../../presentation/controllers/resetPassword/ResetPassword.controller'
import { ValidatorDecorator } from '../../../main/decorator/validator.decorator'
import { ResetPasswordRepository } from '../../../infra/database/repositories/ResetPassword.repository'
import { SendGridAdapter } from '../../../infra/sendGridAdapter/sendgrid.adapter'
import { CreateResetPasswordValidation } from '../../../infra/yupAdapter/CreateResetPassword.validator'

const routes = Router()

const createResetPasswordUseCase = (): ICreateResetPassword => {
  const userRepository = new UserRepository()
  const resetPasswordRepository = new ResetPasswordRepository()
  const sendGridAdapter = new SendGridAdapter()

  return new DbCreateResetPassword(
    userRepository,
    resetPasswordRepository,
    sendGridAdapter
  )
}

const createResetPasswordController = (): IController => {
  return new ResetPasswordController(createResetPasswordUseCase())
}

const createResetPassworValidation = (): IMiddleware => {
  const creaResetPassworValidation = new CreateResetPasswordValidation()
  return new ValidatorDecorator(creaResetPassworValidation)
}

routes.post(
  '/resetPassword',
  adapMiddleware(createResetPassworValidation()),
  adapRoute(createResetPasswordController())
)

export default routes
