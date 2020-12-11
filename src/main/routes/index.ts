import { Router } from 'express'

import createUser from './user/userCreate.route'
import createPassword from './user/PasswordCreate.route'
import signIn from './signin/Signin.route'
import createResetPassword from './resetPassword/CreateResetPassword'

const routes = [createUser, createPassword, signIn, createResetPassword]

const router = Router()

export const exposeRoutes = routes.map((routerMap) =>
  router.use('/api', routerMap)
)
