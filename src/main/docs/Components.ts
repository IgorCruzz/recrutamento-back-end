import { badRequest } from './components/Bad-request'
import { forbidden } from './components/Forbidden'
import { serverError } from './components/Server-error'
import { unauthorized } from './components/Unauthorized'
import { notFound } from './components/Not-found'
import { BearerSchema } from './schemas/results/apiKey/Bearerschema'

export default {
  securitySchemes: {
    apiKeyAuth: BearerSchema,
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
}
