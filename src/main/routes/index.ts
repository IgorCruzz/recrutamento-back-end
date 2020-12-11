import { Router } from 'express'

import createUser from './user/userCreate.route'
import createPassword from './user/PasswordCreate.route'
import signIn from './signin/Signin.route'
import createResetPassword from './resetPassword/CreateResetPassword.route'
import updateResetPassword from './resetPassword/UpdateResetPassword.route'

const routes = [
  createUser,
  createPassword,
  signIn,
  createResetPassword,
  updateResetPassword,
]

const router = Router()

export const exposeRoutes = routes.map((routerMap) =>
  router.use('/api', routerMap)
)
