import { ICreateUser } from '@/domain/usecases/user/CreateUser.domain'
import {
  badRequest,
  created,
  serverError,
} from '../../../presentation/http/http-helper'
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@/presentation/protocols'

export class CreateUserController implements IController {
  constructor(private readonly createUser: ICreateUser) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email } = httpRequest.body

      const user = await this.createUser.createUser(email)

      if (user.error) return badRequest(user.error)

      return created(user)
    } catch (err) {
      return serverError(err)
    }
  }
}
