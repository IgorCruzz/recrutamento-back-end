import { ISignIn } from '@/domain/usecases/signin/signin.domain'
import {
  badRequest,
  created,
  serverError,
} from '@/presentation/http/http-helper'
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@/presentation/protocols'

export class SignInController implements IController {
  constructor(private readonly dbSignIn: ISignIn) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const session = await this.dbSignIn.signIn({
        email,
        password,
      })

      if (session.error) return badRequest(session.error)

      return created(session)
    } catch (err) {
      return serverError(err)
    }
  }
}
