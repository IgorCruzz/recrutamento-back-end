import { Router } from 'express'

import createUser from './user/userCreate.route'

const routes = [createUser]

const router = Router()

export const exposeRoutes = routes.map((routerMap) => router.use(routerMap))
