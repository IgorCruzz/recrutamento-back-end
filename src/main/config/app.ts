import 'reflect-metadata'
import express, { Request, Response, NextFunction, json } from 'express'
import cors from 'cors'
import { serve, setup } from 'swagger-ui-express'
import { exposeRoutes } from '../routes'

const app = express()

app.use(json())
app.use(cors())
app.use(exposeRoutes)

export default app
