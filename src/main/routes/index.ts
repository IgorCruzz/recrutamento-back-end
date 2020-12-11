import { Router } from 'express'

import createUser from './user/userCreate.route'
import createPassword from './user/PasswordCreate.route'

const routes = [createUser, createPassword]

const router = Router()

export const exposeRoutes = routes.map((routerMap) =>
  router.use('/api', routerMap)
)
