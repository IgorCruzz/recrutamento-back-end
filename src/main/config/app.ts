import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.json({ ok: 'ok' });
});

export default app;
