import { ICreateResetPassword } from '@/domain/usecases/resetPassword/CreatePassword.domain'
import {
  badRequest,
  created,
  serverError,
} from '../../../../presentation/http/http-helper'
import { DbCreateResetPasswordStub } from '@/presentation/mocks/ResetPassword.mock'
import { IController, IHttpRequest } from '@/presentation/protocols'
import { ResetPasswordController } from '../CreateResetPassword.controller'

let resetPasswordController: IController
let dbCreateResetPassword: ICreateResetPassword

describe('CreateResetPassword ( Controller )', () => {
  beforeEach(() => {
    dbCreateResetPassword = new DbCreateResetPasswordStub()
    resetPasswordController = new ResetPasswordController(dbCreateResetPassword)
  })

  it('should be defined', () => {
    expect(resetPasswordController).toBeDefined()
  })

  it('should return 201 if resetPasswordController return an session data', async () => {
    const req: IHttpRequest = {
      body: {
        email: 'user@mail.com',
      },
    }

    const res = await resetPasswordController.handle(req)

    expect(res).toEqual(created({ resetToken: 'token' }))
  })

  it('should return 400 if dbCreateResetPassword return an error message', async () => {
    const req: IHttpRequest = {
      body: {
        email: 'user@mail.com',
      },
    }

    jest.spyOn(dbCreateResetPassword, 'createResetPassword').mockResolvedValue({
      error: 'Não existe um usuário com este e-mail.',
    })

    const res = await resetPasswordController.handle(req)

    expect(res).toEqual(badRequest('Não existe um usuário com este e-mail.'))
  })

  it('should return 500 if dbCreateResetPassword throws', async () => {
    const req: IHttpRequest = {
      body: {
        email: 'user@mail.com',
      },
    }

    jest
      .spyOn(dbCreateResetPassword, 'createResetPassword')
      .mockImplementation(() => {
        throw new Error()
      })

    const res = await resetPasswordController.handle(req)

    expect(res).toEqual(serverError(new Error()))
  })
})
