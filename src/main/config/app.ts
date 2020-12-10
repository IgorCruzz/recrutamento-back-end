import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { serve, setup } from 'swagger-ui-express'

const app = express()

app.use(express.json())

export default app
