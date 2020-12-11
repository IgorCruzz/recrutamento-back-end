import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@/presentation/protocols'

export class SignInController implements IController {
  constructor() {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await null
  }
}
