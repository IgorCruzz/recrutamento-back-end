import { ICreateResetPassword } from '@/domain/usecases/resetPassword/CreatePassword.domain'
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

export class ResetPasswordController implements IController {
  constructor(
    private readonly dbCreateResetPasswordStub: ICreateResetPassword
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email } = httpRequest.body

      const resetPassword = await this.dbCreateResetPasswordStub.createResetPassword(
        email
      )

      if (resetPassword.error) return badRequest(resetPassword.error)

      return created(resetPassword)
    } catch (err) {
      return serverError(err)
    }
  }
}
