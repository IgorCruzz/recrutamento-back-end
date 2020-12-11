import { Router } from 'express'

import createUser from './user/userCreate.route'
import createPassword from './user/PasswordCreate.route'
import signIn from './signin/Signin.route'

const routes = [createUser, createPassword, signIn]

const router = Router()

export const exposeRoutes = routes.map((routerMap) =>
  router.use('/api', routerMap)
)
