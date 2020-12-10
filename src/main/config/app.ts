import 'reflect-metadata'
import express, { Request, Response, NextFunction, json } from 'express'
import cors from 'cors'
import { serve, setup } from 'swagger-ui-express'

const app = express()

app.use(json())
app.use(cors())

export default app
