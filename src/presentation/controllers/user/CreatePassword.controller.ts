import { ICreateUserPassword } from '@/domain/usecases/user/CreatePassword.domain'
import { badRequest, ok, serverError } from '@/presentation/http/http-helper'
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@/presentation/protocols'

export class CreatePasswordController implements IController {
  constructor(private readonly createUserPassword: ICreateUserPassword) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { code, email, password } = httpRequest.params

      const user = await this.createUserPassword.createPassword({
        code,
        email,
        password,
      })

      if (user.error) return badRequest(user.error)

      return ok({ message: 'Senha criada com sucesso.' })
    } catch (err) {
      return serverError(err)
    }
  }
}
