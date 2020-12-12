import { Router } from 'express'
import { adapRoute } from '../../adapters/Express.adapter'
import { adapMiddleware } from '../../adapters/ExpressMiddleware.adapter'
import { IUpdateResetPassword } from '../../../domain/usecases/resetPassword/UpdatePassword.domain'
import { UserRepository } from '../../../infra/database/repositories/User.repository'
import { DbUpdateResetPassword } from '../../../data/usecases/resetPassword/DbUpdateResetPassword.data'
import { IController, IMiddleware } from '../../../presentation/protocols'
import { UpdateResetPassword } from '../../../presentation/controllers/resetPassword/UpdateResetPassword.controller'
import { ValidatorDecorator } from '../../../main/decorator/Validator.decorator'
import { ResetPasswordRepository } from '../../../infra/database/repositories/ResetPassword.repository'
import { UpdateResetPasswordValidation } from '../../../infra/yupAdapter/UpdateResetPassword.validator'
import { BcryptAdapter } from '../../../infra/bcryptAdapter/Bcrypt.adapter'

const routes = Router()

const updateResetPasswordUseCase = (): IUpdateResetPassword => {
  const userRepository = new UserRepository()
  const resetPasswordRepository = new ResetPasswordRepository()
  const hasher = new BcryptAdapter()

  return new DbUpdateResetPassword(
    userRepository,
    resetPasswordRepository,
    userRepository,
    hasher
  )
}

const updateResetPasswordController = (): IController => {
  return new UpdateResetPassword(updateResetPasswordUseCase())
}

const updateResetPassworValidation = (): IMiddleware => {
  const updateResetPassworValidation = new UpdateResetPasswordValidation()
  return new ValidatorDecorator(updateResetPassworValidation)
}

routes.put(
  '/resetPassword/:token',
  adapMiddleware(updateResetPassworValidation()),
  adapRoute(updateResetPasswordController())
)

export default routes
