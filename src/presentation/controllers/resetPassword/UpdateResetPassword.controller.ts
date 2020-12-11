import { IUpdateResetPassword } from '@/domain/usecases/resetPassword/UpdatePassword.domain'
import {
  badRequest,
  created,
  ok,
  serverError,
} from '../../../presentation/http/http-helper'
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@/presentation/protocols'

export class UpdateResetPassword implements IController {
  constructor(private readonly dbUpdateResetPassword: IUpdateResetPassword) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const { token } = httpRequest.params

      const updateResetPassword = await this.dbUpdateResetPassword.updateResetPassword(
        {
          email,
          password,
          token,
        }
      )

      if (updateResetPassword.error) {
        return badRequest(updateResetPassword.error)
      }

      return created({ message: 'Senha atualizada com sucesso.' })
    } catch (err) {
      return serverError(err)
    }
  }
}
