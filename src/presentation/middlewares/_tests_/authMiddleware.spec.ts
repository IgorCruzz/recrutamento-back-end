import { IAuthorization } from '@/domain/usecases/authorization/authorization.interface'
import { serverError, unauthorized } from '@/presentation/http/http-helper'
import { DbAuthorizationStub } from '@/presentation/mocks/Authorization.mock'
import { IHttpRequest, IMiddleware } from '../../protocols'
import { AuthMiddleware } from '../auth.middleware'

let authData: IAuthorization
let authController: IMiddleware

describe('Auth Middleware', () => {
  beforeEach(() => {
    authData = new DbAuthorizationStub()
    authController = new AuthMiddleware(authData)
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  it('should be return 401 if token has no provided', async () => {
    const req: IHttpRequest = {
      headers: {
        authorization: '',
      },
    }

    const res = await authController.handle(req)

    expect(res).toEqual(unauthorized('Insira o token.'))
  })

  it('should be return if token doesnt belongs to any user', async () => {
    jest
      .spyOn(authData, 'auth')
      .mockResolvedValue({ error: 'Este token não pertence a nenhum usuário.' })
    const req: IHttpRequest = {
      headers: {
        authorization: 'Bearer token',
      },
    }

    const res = await authController.handle(req)

    expect(res).toEqual(
      unauthorized('Este token não pertence a nenhum usuário.')
    )
  })

  it('should be to call authData with success', async () => {
    const res = jest.spyOn(authData, 'auth')

    const req: IHttpRequest = {
      headers: {
        authorization: 'Bearer token',
      },
    }

    await authController.handle(req)

    expect(res).toHaveBeenCalledWith('token')
  })

  it('should return status 500 if authData throws', async () => {
    jest.spyOn(authData, 'auth').mockRejectedValue(new Error())

    const req: IHttpRequest = {
      headers: {
        authorization: 'Bearer token',
      },
    }

    const res = await authController.handle(req)

    expect(res).toEqual(serverError(new Error()))
  })
})
