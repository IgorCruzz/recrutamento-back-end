import { ISignIn } from '@/domain/usecases/signin/signin.domain'
import { created } from '@/presentation/http/http-helper'
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@/presentation/protocols'

export class SignInController implements IController {
  constructor(private readonly dbSignIn: ISignIn) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { email, password } = httpRequest.body

    const session = await this.dbSignIn.signIn({
      email,
      password,
    })
    return created(session)
  }
}
