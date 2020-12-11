import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols'
import { IAuthorization } from '@/domain/usecases/authorization/authorization.interface'
import { ok, serverError, unauthorized } from '../http/http-helper'

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly dbAuthorization: IAuthorization) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { authorization } = httpRequest.headers

      if (!authorization) return unauthorized('Insira o token.')

      const [, token] = authorization.split(' ')

      const authUser = await this.dbAuthorization.auth(token)

      if (authUser.error) return unauthorized(authUser.error)

      return ok({ userId: authUser.id })
    } catch (err) {
      return serverError(err)
    }
  }
}
